import { CaseFormKeys, ProfileFormKeys } from "./formKeys";

export const userOptionKeys = {
  CPS_CASE_OFFICER: CaseFormKeys.INTAKE_OFFICER,
  CPS_CASE_SUPERVISOR: CaseFormKeys.INTAKE_SUPERVISOR
};

export const CaseOptionKeys = {
  ENQUIRY_NATURE: CaseFormKeys.ENQUIRY_NATURE,
  ENQUIRY_SOURCE: CaseFormKeys.ENQUIRY_SOURCE,
  ENQUIRY_AGENCY: CaseFormKeys.ENQUIRY_AGENCY,
  ENQUIRER_ID_TYPE: CaseFormKeys.ENQUIRER_ID_TYPE,
  CPS_OTHER_AGENCY_INVOLVED: CaseFormKeys.AGENCIES_INVOLVED,
  CPS_HARM_TYPE: CaseFormKeys.HARM_TYPE
};

export const CaseOfficerMappingKeys = {
  [CaseFormKeys.INTAKE_OFFICER]: { value: "id", label: "name" },
  [CaseFormKeys.INTAKE_SUPERVISOR]: { value: "id", label: "name" }
};

export const ProfileOptionKeys = {
  PERSON_GENDER: ProfileFormKeys.SEX,
  PERSON_SPOKEN_LANGUAGE: ProfileFormKeys.SPOKEN_LANGUAGES,
  PERSON_ID_TYPE: ProfileFormKeys.IDENTITY_TYPE
};
