/* eslint-disable no-unused-vars  */
import { IDType } from "../interface/formTypes";

export enum CaseSectionKeys {
  ENQUIRY = "enquiry",
  OTHER_AGENCIES_INVOLVED = "otherAgencyInvolved",
  HARM = "harm",
  SAFETY_SCALE = "safetyScale"
}

export enum CaseFormKeys {
  INTAKE_OFFICER = "caseOfficers",
  INTAKE_SUPERVISOR = "caseSupervisors",
  ENQUIRY_NATURE = "enquiryNature",
  ENQUIRY_DATE = "enquiryDate",
  ENQUIRY_SOURCE = "enquirySource",
  ENQUIRY_AGENCY = "enquirerAgency",
  ENQUIRER_NAME = "enquirerName",
  ENQUIRER_ID_NO = "enquirerIdentityNumber",
  ENQUIRER_ID_TYPE = "enquirerIDType",
  ENQUIRER_CONTACT_NO = "enquirerContactNumber",
  ENQUIRER_EMAIL = "enquirerEmail",
  AGENCIES_INVOLVED = "agencyInvolved",
  AGENCIES_INVOLVED_ADVICE_GIVEN = "adviceGiven",
  HARM_TYPE = "harmTypes",
  HARM_STATEMENT = "statement",
  HARM_POLICE_CLASSIFICATION = "policeInvestigationClassification",
  HARM_POLICE_IO = "policeInvestigationDivision",
  HARM_MEDICAL_CLASSIFICATION = "medicalInvestigationClassification",
  HARM_MEDICAL_MO = "medicalInvestigationHospital",
  SAFETY_SCALE_RATING = "scale"
}

export type CaseIntakeSchema = {
  [CaseFormKeys.INTAKE_OFFICER]?: string[];
  [CaseFormKeys.INTAKE_SUPERVISOR]?: string[];
};

export type CaseEnquirySchema = {
  [CaseFormKeys.ENQUIRY_NATURE]?: string;
  [CaseFormKeys.ENQUIRY_DATE]?: string;
  [CaseFormKeys.ENQUIRY_SOURCE]?: string;
  [CaseFormKeys.ENQUIRY_AGENCY]?: string;
  [CaseFormKeys.ENQUIRER_NAME]?: string;
  [CaseFormKeys.ENQUIRER_ID_NO]?: string;
  [CaseFormKeys.ENQUIRER_ID_TYPE]?: IDType;
  [CaseFormKeys.ENQUIRER_CONTACT_NO]?: string;
  [CaseFormKeys.ENQUIRER_EMAIL]?: string;
};

export type CaseOtherAgencyInvolvedSchema = {
  [CaseFormKeys.AGENCIES_INVOLVED]?: string[];
  [CaseFormKeys.AGENCIES_INVOLVED_ADVICE_GIVEN]?: string;
};

export type CaseHarmSchema = {
  [CaseFormKeys.HARM_TYPE]?: string[];
  [CaseFormKeys.HARM_STATEMENT]?: string;
  [CaseFormKeys.HARM_POLICE_CLASSIFICATION]?: string;
  [CaseFormKeys.HARM_POLICE_IO]?: string;
  [CaseFormKeys.HARM_MEDICAL_CLASSIFICATION]?: string;
  [CaseFormKeys.HARM_MEDICAL_MO]?: string;
};

export type CaseSafetyScaleSchema = {
  [CaseFormKeys.SAFETY_SCALE_RATING]?: number;
};

export type CaseCreateSchema = CaseIntakeSchema & CaseEnquirySchema;

export type CaseFormSchema = CaseIntakeSchema &
  CaseEnquirySchema &
  CaseOtherAgencyInvolvedSchema &
  CaseHarmSchema &
  CaseSafetyScaleSchema;

export const caseCreateInitialFormData: CaseCreateSchema = {
  [CaseFormKeys.INTAKE_OFFICER]: [],
  [CaseFormKeys.INTAKE_SUPERVISOR]: [],
  [CaseFormKeys.ENQUIRY_NATURE]: "",
  [CaseFormKeys.ENQUIRY_DATE]: "",
  [CaseFormKeys.ENQUIRY_SOURCE]: "",
  [CaseFormKeys.ENQUIRY_AGENCY]: "",
  [CaseFormKeys.ENQUIRER_NAME]: "",
  [CaseFormKeys.ENQUIRER_ID_NO]: "",
  [CaseFormKeys.ENQUIRER_ID_TYPE]: IDType.UNKNOWN,
  [CaseFormKeys.ENQUIRER_CONTACT_NO]: "",
  [CaseFormKeys.ENQUIRER_EMAIL]: ""
};

export type CaseFormErrors = Record<keyof CaseFormSchema, string>;

export type FormKeys = CaseFormKeys;
export type FormErrors = CaseFormErrors;
export type FormSchema = CaseFormSchema;

export enum ProfileFormKeys {
  NAME = "name",
  IDENTITY_NUMBER = "identityNumber",
  DATE_OF_BIRTH = "dateOfBirth",
  SEX = "gender",
  CONTACT_NO = "contactNumber",
  ADDRESS = "address",
  SPOKEN_LANGUAGES = "spokenLanguages",
  ENTRY_AGE = "entryAge",
  IDENTITY_TYPE = "identityType",
  EMAIL = "email"
}
