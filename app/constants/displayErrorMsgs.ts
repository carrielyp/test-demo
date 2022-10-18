export const GENERAL_ERROR = "An error has occurred.";
export const ADD_CLIENT_SEARCH_MIN_LENGTH_ERROR =
  "Enter 2 or more characters before searching.";
export const ADD_CLIENT_ERROR_TITLE = "Unable to add client.";
export const ADD_CLIENT_ERROR_CLIENT_ALREADY_ADDED =
  "We are unable to add the profile as it has already been added.";
export const ADD_CLIENT_ERROR =
  "We are unable to add the client. Try again later.";
export const ADD_CLIENT_SEARCH_ERROR =
  "We are unable to retrieve the records. Try again later.";
export const CREATE_CASE_ERROR =
  "We are unable to create the case. Try again later.";

/**
 * Returns a custom error message.
 * @param msgKey Indicates which ErrorMessageTypes template to use.
 * @param placeholderStrings Object where key is the placeholder in template to be replaced, and value is the text to replace the placeholder in template with.
 */
export const makeErrorMessage = (
  msgKey: keyof ErrorMessageTypes,
  placeholderStrings: ErrorMessagePlaceholders
): string => {
  let text = ErrorMessageWithPlaceholders[msgKey] as string;

  Object.entries(placeholderStrings).forEach(([key, value]) => {
    text = text.replace(`<${key}>`, value);
  });

  return text;
};

/**
 * @interface ErrorMessageTypes
 * @description type of the placeholder message and to be used first parameter of utils - makeErrorMessage()
 */
export interface ErrorMessageTypes {
  Required: string;
  Name: string;
  AnEmpty: string;
  Empty: string;
  Character: string;
  RequiredSelect: string;
  AnRequiredSelect: string;
  MinLength: string;
  MaxLength: string;
  TypeToSearch: string;
  PastDate: string;
}

/**
 * @interface ErrorMessagePlaceholders
 * @description is to form the placeholder message and to be used as second parameter for utils - makeErrorMessage()
 * For Example: {fieldName: " mobile number", character: "number"}
 */
export interface ErrorMessagePlaceholders {
  fieldName?: string;
  character?: string;
  min?: number;
  max?: number;
}

/**
 * ErrorMessageWithPlaceholders - can be used when we want to display custom error message against each field
 * <placeholder> will be replaced by custom message in utils- makeErrorMessage()
 */
export const ErrorMessageWithPlaceholders: {
  [key in keyof ErrorMessageTypes]: ErrorMessageTypes[key];
} = {
  Required: "Enter a valid <fieldName>.",
  Name: "<fieldName> must only contain letters and the following characters: . , ' - /",
  AnEmpty: "Enter an <fieldName>.",
  Empty: "Enter a <fieldName>.",
  Character: "Only <character> are allowed for <fieldName>.",
  RequiredSelect: "Select a <fieldName>.",
  AnRequiredSelect: "Select an <fieldName>.",
  MinLength: "A minimum of <min> characters is required for <fieldName>.",
  MaxLength: "A maximum of <max> characters is required for <fieldName>.",
  TypeToSearch: "Type to search for a <fieldName>.",
  PastDate: "<fieldName> must be in the past."
};
