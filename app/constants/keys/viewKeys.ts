/* eslint-disable no-unused-vars  */

import type { FormKeys, ProfileFormKeys } from "./formKeys";

export enum ViewCaseKeys {
  INTAKE_CASE_NO = "referenceNumber",
  OPENED_ON = "registrationDate"
}

export type ViewKeys = ViewCaseKeys | FormKeys | ProfileFormKeys;
