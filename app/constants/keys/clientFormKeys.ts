import { ProfileFormKeys } from "./formKeys";

export type ClientPersonSchema = {
  [ProfileFormKeys.NAME]: string;
  [ProfileFormKeys.IDENTITY_TYPE]: string;
  [ProfileFormKeys.IDENTITY_NUMBER]: string;
  [ProfileFormKeys.SEX]: string;
  [ProfileFormKeys.DATE_OF_BIRTH]: string;
  [ProfileFormKeys.ENTRY_AGE]: string;
  [ProfileFormKeys.SPOKEN_LANGUAGES]: string[];
  [ProfileFormKeys.CONTACT_NO]: string;
  [ProfileFormKeys.EMAIL]: string;
};

export type ClientSchema = {
  id: string;
  person: ClientPersonSchema;
};

export const caseClientInitialFormData: ClientPersonSchema = {
  [ProfileFormKeys.NAME]: "",
  [ProfileFormKeys.IDENTITY_TYPE]: "",
  [ProfileFormKeys.IDENTITY_NUMBER]: "",
  [ProfileFormKeys.SEX]: "",
  [ProfileFormKeys.DATE_OF_BIRTH]: "",
  [ProfileFormKeys.ENTRY_AGE]: "",
  [ProfileFormKeys.SPOKEN_LANGUAGES]: [],
  [ProfileFormKeys.CONTACT_NO]: "",
  [ProfileFormKeys.EMAIL]: ""
};
