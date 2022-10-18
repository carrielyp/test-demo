import type {
  CaseEnquirySchema,
  CaseHarmSchema,
  CaseIntakeSchema,
  CaseOtherAgencyInvolvedSchema,
  CaseSafetyScaleSchema,
  CaseSectionKeys
} from "../keys";

export type CaseDetails = {
  id: string;
  version: number;
  referenceNumber: string;
  updatedDate?: string; // date string in ISO
  registrationDate: string;
  dateOfReferral?: string;
  closureDate?: string;
  closureReason?: string;
  status?: string;
  [CaseSectionKeys.ENQUIRY]?: CaseEnquirySchema;
  [CaseSectionKeys.OTHER_AGENCIES_INVOLVED]?: CaseOtherAgencyInvolvedSchema;
  [CaseSectionKeys.HARM]?: CaseHarmSchema;
  [CaseSectionKeys.SAFETY_SCALE]?: CaseSafetyScaleSchema;

  /* Below values are for future sprints
  casePersons: any[];
  caseOutcomes: any[];
  clientOutcomes: any[];
  abuseTypes: any[];
  assessments: any[];
  caseAssignments: any[];
  relatedPersons: any[];
  clients: any[];
  */
} & CaseIntakeSchema;
