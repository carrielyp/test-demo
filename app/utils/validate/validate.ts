/**
 * [PRIVATE FN] compute checksum used in NRIC/FIN validators
 * @param s digits in NRIC/FIN
 */
const checkSum = (s: string): number => {
  const weights = [2, 7, 6, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 1; i < 8; i++) {
    sum += parseInt(s[i]) * weights[i - 1];
  }

  if (s.startsWith("T") || s.startsWith("G")) {
    sum += 4;
  } else if (s.startsWith("M")) {
    sum += 3;
  }

  return sum;
};

/**
 * [PRIVATE FN] get the NRIC/FIN check letter for given NRIC/FIN
 * @param s NRIC/FIN
 */
const checkLetter = (s: string): string => {
  const cs = checkSum(s);

  const nricLettersST = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
  const finLettersFG = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];
  const finLettersM = ["X", "W", "U", "T", "R", "Q", "P", "N", "J", "L", "K"];

  if (s.startsWith("S") || s.startsWith("T")) {
    return nricLettersST[cs % 11];
  } else if (s.startsWith("F") || s.startsWith("G")) {
    return finLettersFG[cs % 11];
  } else {
    return finLettersM[cs % 11];
  }
};

/**
 * Validates NRIC, including format & check letter
 * @param nric nric to validate
 */
export const isValidNric = (nric: any): boolean => {
  if (typeof nric !== "string") {
    return false;
  }

  if (!/^[ST]\d{7}[ABCDEFGHIZJ]$/.test(nric)) {
    return false;
  }

  const cl = checkLetter(nric);

  return cl === nric[8];
};

/**
 * Validates FIN, including format & check letter
 * @param fin FIN to validate
 */
export const isValidFin = (fin: any): boolean => {
  if (typeof fin !== "string") {
    return false;
  }

  if (!/^([FG]\d{7}[KLMNPQRTUWX]|[M]\d{7}[KLJNPQRTUWX])$/.test(fin)) {
    return false;
  }

  const cl = checkLetter(fin);

  return cl === fin[8];
};

/**
 * Validates given value is a foriegn passport number
 * A valid foriegn passport number is alphanumeric with special chars .-()/
 * @param value string to be validated
 */
const foreignPassportNumber = (value: string): boolean => {
  return /^[0-9a-zA-Z\s\(\)\-\.\/]+$/.test(value.replace("‘", "'"));
};

/**
 * Validates passport number
 * @param {string} passportNum contains passport Number
 * @returns {boolean} true or false for empty / invalid passport Number
 * @TODO Implement proper passport number validation
 * Clear validation requirements are yet to receive from Product Owners
 */
const passportNum = (passportNum: string): boolean => {
  if (!/^[A-Z]{1}\d{7}[A-Z]{1}$/.test(passportNum)) {
    return false;
  }

  return true;
};

/**
 * Validates given value is a description
 * A valid description is alphanumeric with some special chars
 * @param value string to be validated
 */
const description = (value: string): boolean => {
  return /^[0-9a-zA-Z\s\(\)\-\;\:\'\,\.\/\?\$\%]+$/.test(
    value.replace("‘", "'")
  );
};

/**
 * Validates given value has only address special characters [ 0-9A-Z,'.()/-# ]
 * @param value string to be validated
 */
const address = (value: string): boolean => {
  return /^[0-9a-zA-Z\s\(\)\-\'\,\.\/\#]+$/.test(value);
};

/**
 * Validates given value is nonempty.
 * Returns false for null, undefined and empty string only
 * @param value string to be validated
 */
const nonEmpty = (value: string | number | undefined): boolean => {
  if (
    typeof value === "boolean" ||
    value === 0 ||
    Number.isNaN(value as number)
  ) {
    return true;
  }

  return value && !/^\s*$/.test(value as string) ? true : false;
};

/**
 * Validates that value is of specified type
 * @param value string to be validated
 * @param desiredType type desired
 */
const type = (
  value: any,
  desiredType:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
    | "array"
): boolean => {
  if (desiredType === "array") return Array.isArray(value);

  return typeof value === desiredType;
};

const startsOrEndsWithFunctionGenerator =
  (testValue: string) => (conditionValue: string) =>
    testValue.startsWith(conditionValue) || testValue.endsWith(conditionValue);

/**
 * Validates given value is email
 * @param value string to be validated
 */
const email = (value: string): boolean => {
  if (typeof value !== "string") return false;

  value = value.toLowerCase();

  const specialChars = "-_!@#$%^&*();";
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  const emailRegex =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  // eslint-disable-next-line security/detect-non-literal-regexp
  const doubleCharRegex = new RegExp(`([${specialChars}])\\1`);
  const splitValue = value.split("@");
  const noDomainEmail = splitValue[0];
  const emailDomain = splitValue[1];
  const specialCharsArray = specialChars.split("");

  if (!emailRegex.test(value)) return false;

  if (value.match(doubleCharRegex)) return false;

  if (splitValue.length !== 2) return false;

  const noDomainEmailStartsOrEndWithSpecialChar = specialCharsArray
    .slice(2)
    .some(startsOrEndsWithFunctionGenerator(noDomainEmail));

  if (noDomainEmailStartsOrEndWithSpecialChar) return false;

  // to test if sections begin with special char
  // ie _asdg.com asdg_.com asdg._com asdg.com _
  // should all return false
  const domainSectionStartsOrEndWithSpecialChar = emailDomain
    .split(".")
    .some((domainSection) => {
      return specialCharsArray.some(
        startsOrEndsWithFunctionGenerator(domainSection)
      );
    });

  if (domainSectionStartsOrEndWithSpecialChar) return false;

  return true;
};

/**
 * Check whether given string is a valid 8-digit local (SG) mobile number
 * @param value string to validate
 */
const localMobileNumber = (value: string): boolean => {
  const regex1 = /^8[1-8][0-9]{6}$/;
  const regex2 = /^9[0-8][0-9]{6}$/;
  const regex3 = /^\+65[36][0-9]{7}$/;

  return regex1.test(value) || regex2.test(value) || regex3.test(value);
};

/**
 * Check whether given string is a valid 8-digit local (SG) mobile number with +65 country code
 * @param value string to validate
 */
const localMobileNumberWithCC = (value: string): boolean => {
  const regex = /^\+65[89][0-9]{7}$/;
  const emergencyRegex = /^\+6599.*$/;

  return regex.test(value) && !emergencyRegex.test(value);
};

/**
 * Check whether given string is a valid 8-digit local (SG) contact number with +65 country code
 * @param value string to validate
 */
const localContactNumberWithCC = (value: string): boolean => {
  const regex = /^\+65[3689][0-9]{7}$/;
  const emergencyRegex = /^\+6599.*$/;

  return regex.test(value) && !emergencyRegex.test(value);
};

/**
 * Check if value looks like a international number
 * allows only characters + ( ) - 1234567890 and space
 * @param value string to validate
 */
const internationalNumber = (value: string): boolean => {
  const length = value.length;

  if (length > 30) {
    return false;
  }

  const regex = /^[0-9+()\- ]*$/;

  return regex.test(value);
};

/**
 * Validates value length using given limits
 * @param value string to be validated
 * @param min minimum length limit
 * @param max maximum length limit
 */
const validLength = (value: any, length: LengthRuleParams = {}) => {
  const min = length.min;
  const max = length.max;

  if (min && value.length < min) {
    return false;
  } else if (max && value.length > max) {
    return false;
  }

  return true;
};

/**
 * Validate value and it's type with given value
 * @param value value to be validated
 * @param valueToMatch value to compare
 */
const equals = (value: any, valueToMatch: any): boolean => {
  return value === valueToMatch;
};

/**
 * Validate value or array values exists in the given array
 * @param values value(s) to be validated
 * @param allowedValues array to match
 */
const includes = (
  values: string | number | (string | number)[],
  allowedValues: (string | number)[]
): boolean => {
  if (Array.isArray(values)) {
    return values.every((element) => allowedValues.includes(element));
  } else {
    return allowedValues.includes(values);
  }
};

/**
 * checks given value contains alphanumeric
 * @param value string to validate
 */
const alphaNumeric = (value: string): boolean => {
  const regex = /^[0-9a-zA-Z ]*$/;

  return regex.test(value);
};

/**
 * checks given value is a valid name
 * @param value string to validate
 */
const name = (value: string): boolean => {
  const regex = /^[a-zA-Z \-/,'’.]*$/;

  return regex.test(value);
};

/**
 * checks given value is a base64 image
 * @param value string to validate
 */
const base64Image = (value: string): boolean => {
  const regex =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^\s*data:(image+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+,;=\-._~:@/?%\s]*\s*$/i;

  return regex.test(value);
};

/**
 * Utility - to validate the date is acceptable
 * but acceptable means:
 * - Accept date string in "YYYY" OR "YYYY, MM" OR "YYYY, MM, DD"format
 * - Accept DOB without day or day/month
 * @param yyyy - year of the date
 * @param mm (optional) - month of the date
 * @param dd (optional) - date
 * @param maxYear (optional) - default to 2100. Any date after max year is considered invalid
 */
const isAcceptableDate = (
  yyyy: number,
  mm?: number,
  dd?: number,
  maxYear = 2100
): boolean => {
  // parseInt() might pass in NaN
  if (!yyyy) {
    return false;
  }

  if (yyyy < 1900 || yyyy > maxYear) {
    return false;
  }

  if (mm && (mm < 1 || mm > 12)) {
    return false;
  }

  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (mm && dd && (dd < 1 || dd > days[mm - 1])) {
    return false;
  }

  return true;
};

/**
 * Validates date string in "YYYYMMDD" format
 * @param date date string to be validated
 */
const yyyymmddDate = (date: any): boolean => {
  if (typeof date !== "string") {
    return false;
  }

  if (!/^\d{8}$/.test(date)) {
    return false;
  }

  const yyyy = parseInt(date.substr(0, 4));
  const mm = parseInt(date.substr(4, 2));
  const dd = parseInt(date.substr(6, 2));

  if (!yyyy || !mm || !dd) {
    return false;
  }

  return isAcceptableDate(yyyy, mm, dd);
};

export type DateRule = {
  format: "YYYYMMDD" | "DDMMYYYY" | "isoString";
  message?: string;
};

/**
 * Validate the date and format
 * @param date - date value to check
 * @param options - format of the date
 */
const date = (date: string, options: DateRule): boolean => {
  if (options.format === "isoString") {
    const toDate = new Date(date);

    return toDate instanceof Date && !isNaN(toDate);
  } else {
    const dateArr = date.split(/[:\/ -]/);
    const finalDateArray =
      options.format === "YYYYMMDD" ? dateArr.reverse() : dateArr;

    return isAcceptableDate(
      parseInt(finalDateArray[2]),
      parseInt(finalDateArray[1]),
      parseInt(finalDateArray[0])
    );
  }
};

/**
 * Validates given date is less than or equals to today's date
 * @param date - date value to check
 * @param options - format of the date
 */

const lessThanOrEqualCurrentDate = (
  date: string,
  options: DateRule
): boolean => {
  const { format } = options;
  const todayDate = new Date();
  let givenDate;

  if (format === "isoString") {
    givenDate = new Date(date);
  } else {
    const trimmedDate = date.replace(/[:\/ -]/g, "");

    let yyyy: number, mm: number, dd: number;

    if (format === "YYYYMMDD") {
      yyyy = parseInt(trimmedDate.substring(0, 4));
      mm = parseInt(trimmedDate.substring(4, 2));
      dd = parseInt(trimmedDate.substring(6, 2));
    } else {
      yyyy = parseInt(trimmedDate.substring(4, 4));
      mm = parseInt(trimmedDate.substring(2, 2));
      dd = parseInt(trimmedDate.substring(0, 2));
    }

    givenDate = new Date(yyyy, mm - 1, dd);
  }

  return givenDate <= todayDate;
};

/**
 * checks given value is a valid timestamp(milliseconds) and respective date is between 1/1/1900 and 31/12/2100
 * @param value timestamp to validate
 */
const timestamp = (value: number): boolean => {
  const dateFormat = new Date(value);

  if (dateFormat.toString() === "Invalid Date") {
    return false;
  }

  return isAcceptableDate(
    parseInt(dateFormat.getFullYear().toString()),
    parseInt((dateFormat.getMonth() + 1).toString()),
    parseInt(dateFormat.getDate().toString())
  );
};

export interface CompareValues {
  values: (string | number)[];
  message?: string;
}

/**
 * Utility to validate value or array values exists in the given array
 * @param values value(s) to be validated
 * @param allowedValues array to match
 */
const allowedValues = (
  values: string | number | (string | number)[],
  options: CompareValues
): boolean => {
  return includes(values, options.values);
};

/**
 * Check whether the value is numeric
 * e.g: "123", 123 are numeric, "123a" is not
 * @param value value to be validated
 */
const numeric = (value: string | number): boolean => {
  return !Number.isNaN(Number(value));
};

/**
 * Whether given value conforms to UUID format
 * @param value value to be validated
 */
const uuid = (value: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  );
};

interface MaskedNricOptions {
  maskedChar?: string;
}

/**
 * Validates format of masked NRIC
 * Default masked character will be '*'
 * @param value masked nric to validate
 * @param options object used to store the mask char
 */
const maskedNric = (value: string, options?: MaskedNricOptions): boolean => {
  let optionsToUse: MaskedNricOptions = {};

  if (options === undefined) {
    optionsToUse.maskedChar = "*";
  } else {
    optionsToUse = options;
  }

  // eslint-disable-next-line security/detect-non-literal-regexp
  const maskedNricRegEx = new RegExp(
    `^[ST]\\${optionsToUse.maskedChar}{4}\\d{3}[ABCDEFGHIZJ]$`
  );

  return maskedNricRegEx.test(value);
};

export interface LengthRuleParams {
  min?: number;
  max?: number;
  message?: string;
}

export interface ValidationMessage {
  message?: string;
}

export type TrueORMessage = true | ValidationMessage;

export type IfCondition = {
  if?: (data: any) => boolean;
};

export interface Rule {
  required?: TrueORMessage & IfCondition;
  email?: TrueORMessage;
  localMobileNumber?: TrueORMessage;
  internationalNumber?: TrueORMessage;
  localMobileNumberWithCC?: TrueORMessage;
  localContactNumberWithCC?: TrueORMessage;
  number?: TrueORMessage;
  isValidNric?: TrueORMessage;
  isValidFin?: TrueORMessage;
  equalsTo?: CompareValues | string;
  allowedValues?: CompareValues | (string | number)[];
  length?: LengthRuleParams;
  array?: TrueORMessage;
  yyyymmdd?: TrueORMessage;
  alphaNumeric?: TrueORMessage;
  name?: TrueORMessage;
  base64Image?: TrueORMessage;
  date?: DateRule;
  numeric?: TrueORMessage;
  boolean?: TrueORMessage;
  string?: TrueORMessage;
  uuid?: TrueORMessage;
  timestamp?: TrueORMessage;
  either?: Rule;
  address?: TrueORMessage;
  maskedNric?: MaskedNricOptions;
  lessThanOrEqualCurrentDate?: DateRule;
  passportNum?: TrueORMessage;
  foreignPassportNumber?: TrueORMessage;
  description?: TrueORMessage;
}

export const ValidatorMapper: {
  [key in keyof Required<Rule>]: (
    value: any,
    options: Required<Rule>[key]
  ) => boolean;
} = {
  required: nonEmpty,
  description,
  email,
  isValidNric,
  isValidFin,
  localMobileNumber: localMobileNumber,
  internationalNumber,
  localMobileNumberWithCC,
  localContactNumberWithCC,
  number: (value: number) => type(value, "number"),
  equalsTo: equals,
  length: validLength,
  yyyymmdd: yyyymmddDate,
  allowedValues: (value, options) =>
    allowedValues(value, options as CompareValues),
  alphaNumeric,
  name,
  base64Image,
  date: (value, options?) => date(value, options as DateRule),
  array: (value) => type(value, "array"),
  numeric,
  boolean: (value: boolean) => type(value, "boolean"),
  string: (value: boolean) => type(value, "string"),
  uuid,
  timestamp,
  either: () => true,
  address,
  maskedNric,
  lessThanOrEqualCurrentDate,
  passportNum,
  foreignPassportNumber
};

export interface Schema {
  [fieldName: string]: Rule;
}
export interface ValidationError {
  fieldName: string;
  rule: keyof Rule;
}

/**
 * Validate an object using given schema
 * @param data object to be validated
 * @param schema object containing schema to use for validation
 */
const withSchema = (data: any, schema: Schema) => {
  const fieldNames = Object.keys(schema);
  const result: ValidationError[] = [];

  fieldNames.forEach((fieldName) => {
    const fieldValue: any = data[fieldName as string];

    const rules = schema[fieldName as string] || {};

    if (
      (rules.required === true || rules.required?.if?.(data)) &&
      !nonEmpty(fieldValue)
    ) {
      result.push({ fieldName, rule: "required" });
    }

    if (rules.email && fieldValue && !email(fieldValue)) {
      result.push({ fieldName, rule: "email" });
    }

    if (
      rules.localMobileNumber &&
      fieldValue &&
      !localMobileNumber(fieldValue)
    ) {
      result.push({ fieldName, rule: "localMobileNumber" });
    }

    if (
      rules.internationalNumber &&
      fieldValue &&
      !internationalNumber(fieldValue)
    ) {
      result.push({ fieldName, rule: "internationalNumber" });
    }

    if (rules.isValidNric && fieldValue && !isValidNric(fieldValue)) {
      result.push({ fieldName, rule: "isValidNric" });
    }

    if (rules.isValidFin && fieldValue && !isValidFin(fieldValue)) {
      result.push({ fieldName, rule: "isValidFin" });
    }

    if (rules.number && fieldValue && !type(fieldValue, "number")) {
      result.push({ fieldName, rule: "number" });
    }

    if (rules.equalsTo && fieldValue && !equals(fieldValue, rules.equalsTo)) {
      result.push({ fieldName, rule: "equalsTo" });
    }

    if (rules.length && fieldValue && !validLength(fieldValue, rules.length)) {
      result.push({ fieldName, rule: "length" });
    }

    if (rules.yyyymmdd && fieldValue && !yyyymmddDate(fieldValue)) {
      result.push({ fieldName, rule: "yyyymmdd" });
    }

    if (
      rules.allowedValues &&
      fieldValue &&
      !includes(fieldValue, rules.allowedValues as (string | number)[])
    ) {
      result.push({ fieldName, rule: "allowedValues" });
    }

    if (rules.boolean && fieldValue && !type(fieldValue, "boolean")) {
      result.push({ fieldName, rule: "boolean" });
    }
  });

  return result;
};

export default {
  description,
  isValidNric,
  isValidFin,
  yyyymmddDate,
  nonEmpty,
  type,
  email,
  localMobileNumber,
  internationalNumber,
  localMobileNumberWithCC,
  localContactNumberWithCC,
  validLength,
  equals,
  includes,
  withSchema,
  alphaNumeric,
  name,
  base64Image,
  date,
  numeric,
  uuid,
  timestamp,
  address,
  maskedNric,
  lessThanOrEqualCurrentDate,
  passportNum,
  foreignPassportNumber
};
