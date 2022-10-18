/* eslint-disable no-unused-vars  */

// Types used in FE
export enum IDType {
  SINGAPORE_PINK_IDENTIFICATION_CARD = "SINGAPORE_PINK_IC",
  SINGAPORE_BLUE_IDENTIFICATION_CARD = "SINGAPORE_BLUE_IC",
  SINGAPORE_CITIZENSHIP_CERTIFICATE = "SINGAPORE_CITIZENSHIP_CERTIFICATE",
  SINGAPORE_BIRTH_CERTIFICATE = "SINGAPORE_BIRTH_CERTIFICATE",
  FOREIGN_IDENTITY_DOCUMENT = "FOREIGN_IDENTITY_DOCUMENT",
  UNKNOWN = ""
}

export interface DropdownOption {
  value: string;
  label: string;
}

export enum ViewTypes {
  DATE = "date",
  DATE_YEARS_MONTHS = "dateYearsMonths",
  DATE_TIME = "dateTime",
  TEXT = "text",
  TEXT_WITH_MESSAGE = "textWithMessage",
  TEXTAREA = "textarea",
  SELECT_FROM_OPTIONS = "selectFromOptions",
  PERSON_TAG = "personTag",
  PILL = "pill",
  RICH_TEXT = "richText",
  MASKED_ID = "maskedId"
}

export enum FormTypes {
  DATEPICKER = "datepicker",
  DATE_TIME_PICKER = "dateTimePicker",
  SELECT = "select",
  INPUT = "input",
  TEXTAREA = "textarea",
  RADIO = "radio",
  CHECKBOXGROUP = "checkboxgroup",
  CHIP_TOGGLE = "chipToggle",
  RICH_TEXT = "richText",
  SLIDER = "slider"
}
