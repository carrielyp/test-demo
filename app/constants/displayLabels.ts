/* eslint-disable no-unused-vars  */

import { DateUtil } from "../utils/DateUtil";

export const BREADCRUMB_CASES = "Cases";
export const BREADCRUMB_CREATE_CASE = "Create new case";
export const INTAKE_OFFICER = "Case officer";
export const INTAKE_SUPERVISOR = "Supervisor";
export const ENQUIRY_NATURE = "Nature of enquiry";
export const ENQUIRY_DATE = "Date of enquiry";
export const ENQUIRY_SOURCE = "Source of enquiry";
export const ENQUIRY_AGENCY = "Agency";
export const ENQUIRER_NAME = "Name";
export const ENQUIRER_ID_NO = "ID no.";
export const ENQUIRER_ID_TYPE = "ID type";
export const ENQUIRER_CONTACT_NO = "Contact no.";
export const ENQUIRER_EMAIL = "Email";
export const AGENCIES_INVOLVED = "Agency involved";
export const AGENCIES_INVOLVED_ADVICE_GIVEN = "Advice given";
export const HARM_SECTION = "Past and current, indicating impact on client";
export const HARM_TYPE = "Type of harm";
export const ASSESSMENT_STATEMENT = "Statement";
export const HARM_POLICE_INVESTIGATION = "Police investigation";
export const HARM_POLICE_CLASSIFICATION = "Classification";
export const HARM_POLICE_IO = "IO and Division";
export const HARM_MEDICAL_INVESTIGATION = "Medical investigation";
export const HARM_MEDICAL_CLASSIFICATION = "Classification";
export const HARM_MEDICAL_MO = "MO and Hospital";
export const SAFETY_SCALE_RATING =
  "How safe is it for the client to live at home?";
export const NAME = "Name";
export const ID_NO = "ID no.";
export const CONTACT_NO = "Contact no.";
export const DATE_OF_BIRTH = "Date of birth";
export const SEX = "Sex";
export const ADDRESS = "Address";
export const ACTION = "Action";
export const ENTRY_AGE = "ENTRY AGE";
export const SPOKEN_LANGUAGE = "Language Spoken";
export const GENDER = "Gender";

export const OPENED_ON = "Opened on";
export const VIEW_CARD_OPTIONS_CHANGE_LOG = "View change log";
export const MORE_ACTIONS = "More actions";
export const CASE_NO = "Case no.";
export const ADD_OUTCOME = "Add outcome";
export const COMMON_CANCEL = "Cancel";
export const COMMON_CREATE = "Create";
export const COMMON_SAVE = "Save";
export const COMMON_YES = "Yes";
export const COMMON_NO = "No";
export const COMMON_EDIT = "Edit";
export const COMMON_DONE = "Done";
export const COMMON_EXPORT = "Export";
export const COMMON_OPEN = "Open";
export const COMMON_ADD = "Add";
export const ADD_CLIENT = "Add Client";
export const ADD_RELATED_PERSON = "Add related person";
export const VIEW_RELATIONSHIP_TABLE = "View relationship table";
export const VIEW_FULL_PROFILE = "View full profile";
export const ADD_PLACEMENT = "Add placement";
export const REMOVE_FROM_CASE = "Remove from case";
export const COMMON_SEARCH = "Search";
export const COMMON_RESULTS = "Results";
export const BASIC_INFORMATION = "Basic Information";

export const lastUpdatedBy = (date: Date | string, user: string) =>
  `Last updated ${DateUtil.toDisplayDate(date)} by ${user}`;
