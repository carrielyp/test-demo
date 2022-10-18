/* eslint-disable no-unused-vars  */
import { CaseTitles } from "./displayTitles";

export enum CaseMenuItems {
  ENQUIRY = "enquiry",
  CASE_DETAILS = "case-details",
  CLIENT = "client",
  CASE_NOTES = "case_notes",
  ASSESSMENT = "assessment",
  COURT_MATTERS = "court_matters",
  REVIEW = "review",
  PERSONNEL = "personnel",
  ACTIVITY = "activity",
  DOCUMENTS = "documents"
}

export const caseMenuItems = [
  { key: CaseMenuItems.ENQUIRY, label: CaseTitles.MENU_ENQUIRY },
  {
    key: CaseMenuItems.CASE_DETAILS,
    label: CaseTitles.MENU_CASE_DETAILS
  },
  { key: CaseMenuItems.CLIENT, label: CaseTitles.MENU_CLIENT },
  { key: CaseMenuItems.CASE_NOTES, label: CaseTitles.MENU_CASE_NOTES },
  {
    key: CaseMenuItems.ASSESSMENT,
    label: CaseTitles.MENU_ASSESSMENT
  },
  {
    key: CaseMenuItems.COURT_MATTERS,
    label: CaseTitles.MENU_COURT_MATTERS
  },
  { key: CaseMenuItems.REVIEW, label: CaseTitles.MENU_REVIEW },
  { key: CaseMenuItems.PERSONNEL, label: CaseTitles.MENU_PERSONNEL },
  { key: CaseMenuItems.ACTIVITY, label: CaseTitles.MENU_ACTIVITY },
  { key: CaseMenuItems.DOCUMENTS, label: CaseTitles.MENU_DOCUMENTS }
];
