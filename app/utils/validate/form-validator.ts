import { ValidatorMapper, Rule } from "./validate";

export type FieldValidationRules = {
  [key in keyof Rule]: Rule[key];
};

export const DefaultMessages: { [key in keyof Rule]: string } = {
  required: "Value can not be empty",
  email: "Enter a valid email",
  isValidNric: "Enter a valid NRIC",
  localMobileNumber: "Enter a valid local mobile number",
  internationalNumber: "Enter a valid international number",
  number: "Only numbers are allowed",
  equalsTo: "Invalid value",
  length: "Invalid length of the value",
  yyyymmdd: "Enter a valid date",
  passportNum: "Enter a valid passport number",
  allowedValues: "Invalid value",
  alphaNumeric: "Only alphabets or numbers allowed ",
  name: "Enter a valid name",
  base64Image: "Invalid base64",
  date: "Invalid date",
  description:
    "Description must only contain letters, numbers and the following characters: . , ( ) : ; - /"
};

/**
 * Wrapper function for redux-form-validation
 * @param validators - set of rules which are needs to be validated
 * @returns error message if validation fails, null otherwise
 */
export const validator = (
  validators: FieldValidationRules,
  options?: {
    either?: boolean;
  }
) => {
  return (value: any) => {
    let error = null;
    const validatorKeys = Object.keys(
      validators
    ) as (keyof typeof validators)[];

    if (!validators.required && (value?.trim() === "" || value === undefined)) {
      return null;
    }

    for (let i = 0; i < validatorKeys.length; i++) {
      const rule = validatorKeys[i];
      const ruleOptions: any = validators[rule];
      const validatePass = ValidatorMapper[rule](value, ruleOptions);

      if (validatePass && options?.either === true) {
        error = null;
        break;
      }

      if (!validatePass) {
        error = ruleOptions.message
          ? ruleOptions.message
          : DefaultMessages[rule as keyof Rule];

        if (options?.either === true) {
          continue;
        }

        return error;
      }
    }

    return error;
  };
};
