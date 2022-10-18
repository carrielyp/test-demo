import { ErrorCodes } from "../../constants/responseCodes";
import { CustomError } from "../custom-error";
import type { Rule, LengthRuleParams } from "./validate";
import { ValidatorMapper } from "./validate";

/**
 * @type RequiredKeys
 * @description Filter a type to get the required keys only
 * @ref https://stackoverflow.com/a/50830054
 */
type RequiredKeys<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k;
}[keyof T];

/**
 * @type OnlyKeysInRule
 * @description Can only specify the key in the Rule
 * @ref https://stackoverflow.com/a/60412829
 */
type OnlyKeysInRule<T extends Rule> = {
  [K in keyof Rule]: T[K];
} & {
  // eslint-disable-next-line no-unused-vars
  [K in Exclude<keyof T, keyof Rule>]: never;
};

/**
 * @type ValidateSchemaOrRule
 * @description To determine whether this field should be a Rule or ValidateSchema class, based on the value
 * @example RequestObject {
 *  nric: string,
 *  applicant: Applicant
 * }
 *
 * Should pass {
 *  nric: Rule,
 *  applicant: ValidateSchema<Applicant>
 * }
 *
 */
type ValidateSchemaOrRule<Value> = Value extends object
  ? Value extends (infer T)[] // If it's array, infer the array "type"
    ? T extends object // And the type is object
      ? ValidateSchema<T> // Pass the type to new object
      : Rule
    : ValidateSchema<Value>
  : Rule;

/**
 * @type ObjectValidationSchema
 * @description The format of the object to validate mapped to the rules
 * @example Request = {
 *    nric: string,
 *    name: string
 * }
 *
 * ValidationSchema<Request> = {
 *  nric: {
 *    required: true,
 *    isValidNric
 *  }
 * }
 */
type ObjectValidationSchema<Schema extends object> = {
  // If the field is required, then it's normal
  [field in RequiredKeys<Schema>]: ValidateSchemaOrRule<Schema[field]>;
} & {
  // If the field is optional
  [field in Exclude<keyof Schema, RequiredKeys<Schema>>]: ValidateSchemaOrRule<
    Schema[field]
  > extends Rule // And it's a rule
    ? Omit<Rule, "required"> // Then shouldn't have "required" in the rule
    : ValidateSchemaOrRule<Schema[field]>;
};

export type ValidationSchema<Schema extends object> = Schema extends Array<
  infer ArrayData
>
  ? ValidateSchemaOrRule<ArrayData>
  : ObjectValidationSchema<Schema>;

/**
 * @type ValidationResult
 * @description The failed validation object
 */
export type ValidationResult = {
  fieldName: string;
  rule: keyof Rule;
};

interface ArrayLengthOptions {
  min?: number;
  max?: number;
}
/**
 * @description Root means it's the root of the object, where it has no field
 * @example ApplicationSubmitResponse = {
 *  data: Applicant // fieldName = "root"
 * }
 *
 * For other cases, {
 * data: {
 *    applicant: Applicant // fieldName = "root"
 *   }
 * }
 */
const DEFAULT_FIELD = "root";

/**
 * @class ValidateSchema
 * @description Validate helper class that validate and transform into given type
 * @param schema The object mapped with its rules
 * @todo Validate that an array cannot have duplicated/identical value, e.g:
 *       Cannot have same NRIC among applicants
 * @todo nested fieldName in ValidationResult
 * @todo Validate Response, when validating response no aync is required,
 *       the class should accept one flag and it will do
 *       1. Return a promise for user, user shouldn't await it, because response validation
 *          should be done synchronously, it's for logging purpose only
 *       2. Log the ValidationResult instead of throwing them.
 */
export class ValidateSchema<Schema extends object> {
  /**
   * @description Indicate whether this schema is an array
   */
  protected shouldValidateArray = false;

  protected rootData: any;
  protected arrayLengthOptions: LengthRuleParams | undefined;

  /**
   * @description This class is required
   */
  protected required = true;

  /**
   * @description Indicate this ValidateSchema is belongs to which field
   *
   * @example {
   *  applicants: Applicant[]
   * }
   * // The ValidateApplicant should be then under "applicants"
   */
  protected fieldName = DEFAULT_FIELD;

  constructor(public validateSchema: ValidationSchema<Schema>) {}

  /**
   * @description Validate the given any data, and transform it to given Schema type
   * @param {object} data Any object or array to validate
   * @throws {ValidationError}
   */
  validate(data: any): Schema {
    this.setRootData(data);
    const results = this.getValidationResult(data);

    if (results.length > 0) {
      throw new CustomError(ErrorCodes.ValidationError, results);
    } else {
      // Since the data has passed the validation
      // Can safely type it to the given Schema type
      return data as Schema;
    }
  }

  protected cloneInstance(): ValidateSchema<Schema> {
    return Object.assign(Object.create(this), this);
  }

  /**
   * @function isArray
   * @description Indicate this schema is an array
   * @example // After creating this schema class instance,
   * const applicantValidation = new ValidateSchema<Applicant>(validationSchema)
   *
   * // An API that receives an array of Applicant object
   * const submitApplicationValidation = new ValidateSchema<SubmitApplicant>({
   *  applicants: applicantValidation.isArray(),
   * })
   */
  public isArray(options?: ArrayLengthOptions): ValidateSchema<Schema> {
    // Return new instance so that when other place use this object again, it remains "not array"
    const newInstance = this.cloneInstance();

    newInstance.shouldValidateArray = true;

    if (options) {
      this.arrayLengthOptions = options;
    }

    return newInstance;
  }

  /**
   * @description Indicate that this object is optional
   */
  public optional(): ValidateSchema<Schema> {
    const newInstance = this.cloneInstance();

    newInstance.required = false;

    return newInstance;
  }

  protected field(fieldName: string): this {
    this.fieldName = fieldName;

    return this;
  }

  protected setRootData(rootData: any): this {
    this.rootData = rootData;

    return this;
  }

  /**
   * @function getValidationResult
   * @description Get failed validation results
   * @param {*} data Data to validate
   * @returns {ValidationResult[]} An array of failed validation results
   */
  protected getValidationResult(data: any): ValidationResult[] {
    // Because undefined doesn't mean it's not true
    // It might be optional
    const dataToValidate = data === undefined ? {} : data;

    if (this.required && !ValidatorMapper.required(data, true)) {
      return [{ fieldName: this.fieldName, rule: "required" }];
    }

    // If this field should be validating an array
    if (this.shouldValidateArray) {
      if (
        this.arrayLengthOptions &&
        !ValidatorMapper.length(data, this.arrayLengthOptions)
      ) {
        return [{ fieldName: this.fieldName, rule: "length" }];
      }

      return this.validateArrayField(dataToValidate);
    }

    const { validateSchema } = this;
    /**
     * @description This schema object's first level fields
     */
    const schemaKeys = Object.keys(validateSchema);

    // If the validating data has some fieldName that is not recognized by the schema
    const notExistKey = Object.keys(data).find(
      (key: string) => !schemaKeys.includes(key)
    );

    if (notExistKey) {
      return [{ fieldName: notExistKey, rule: "allowedValues" }];
    }

    /**
     * @description Loop through all the fields and validate them, add to results if fail
     */
    const results = (
      schemaKeys as Extract<keyof typeof validateSchema, string>[]
    ).reduce<ValidationResult[]>((array, field) => {
      const failedResults: ValidationResult[] = [];

      const validationRule = validateSchema[field] as Rule;

      if (validationRule.either) {
        // If have either rule, run all the rules
        const eitherFailedResults = this.validateField(
          dataToValidate[field],
          validationRule.either,
          field
        );

        // If all rules failed, fail the either validation
        if (
          eitherFailedResults.length !== 0 &&
          eitherFailedResults.length ===
            Object.keys(validationRule.either).length
        ) {
          failedResults.push({
            fieldName: field,
            rule: "either"
          });
        }
      }

      failedResults.push(
        ...this.validateField(
          dataToValidate[field],
          validateSchema[field],
          field
        )
      );

      return array.concat(failedResults);
    }, []);

    return results;
  }

  protected validateField(
    fieldValue: any,
    schemaField: ValidateSchema<object> | Rule,
    field = DEFAULT_FIELD
  ): ValidationResult[] {
    // If it's optional and the value is empty then no need validate
    if (!ValidatorMapper.required(fieldValue, true)) {
      const requiredRule = (schemaField as Rule).required;

      if (
        !requiredRule ||
        (typeof requiredRule === "object" &&
          requiredRule.if?.(this.rootData) === false)
      ) {
        return [];
      } else {
        return [{ fieldName: field, rule: "required" }];
      }
    }

    // If the field value is another ValidateSchema, use their schema to validate
    if (schemaField instanceof ValidateSchema) {
      // If this field is not validating an array,
      // then call getValidationResult again in that class
      const validationResult = schemaField
        .field(field)
        .setRootData(this.rootData)
        .getValidationResult(fieldValue);

      return validationResult;
    }

    // The schemaField is a rule

    // Format the failed Rules that belong to this field
    return this.validateFieldValue(fieldValue, schemaField).map(
      (failedRule) => ({
        fieldName: field,
        rule: failedRule
      })
    );
  }

  /**
   * @function validateArray
   * @description Validate an array of data, only called when this should be validating an array
   * @param data The data to validate
   * @param field The field of data which should be an array, used to return result
   */
  protected validateArrayField(data: any): ValidationResult[] {
    let results: ValidationResult[];

    // Turn off the isArray flag, so that when using this instance to
    // validate the data inside array, it's no longer expecting an array
    this.shouldValidateArray = false;

    // If the data is array
    if (Array.isArray(data)) {
      // Validate all data and combine all the results
      results = data.reduce((results: ValidationResult[], arrayData: any) => {
        return results.concat(this.getValidationResult(arrayData));
      }, []);
    } else {
      results = [
        {
          fieldName: this.fieldName,
          rule: "array"
        }
      ];
    }

    // Turn back the isArray flag in case it's used again
    this.shouldValidateArray = true;

    return results;
  }

  /**
   * @description Get all the failed rules of this field
   * @param fieldData The data to validate
   * @param fieldRules The rule object of the field
   */
  protected validateFieldValue(
    fieldData: any,
    { array, ...fieldRules }: Rule
  ): (keyof Rule)[] {
    // If rule has isArray
    if (array) {
      // If data is array
      if (Array.isArray(fieldData) && ValidatorMapper.array(fieldData, array)) {
        // check the all data with the rules
        return fieldData.reduce((rules, arrayData) => {
          return rules.concat(this.validateFieldValue(arrayData, fieldRules));
        }, []);
      } else {
        return ["array"];
      }
    }

    return this.getFieldFailedRules(fieldData, fieldRules);
  }

  protected getFieldFailedRules<R extends Rule>(
    data: any,
    fieldRules: OnlyKeysInRule<R>
  ): (keyof Rule)[] {
    return (
      Object.keys(fieldRules) as (keyof typeof fieldRules &
        keyof typeof ValidatorMapper)[]
    ).reduce<(keyof Rule)[]>((failedRules, ruleName) => {
      // Validate the data against the rule, if failed then add to the array
      const rule = fieldRules[ruleName];

      if (!ValidatorMapper[ruleName](data, rule)) {
        return failedRules.concat(ruleName);
      }

      return failedRules;
    }, []);
  }
}
