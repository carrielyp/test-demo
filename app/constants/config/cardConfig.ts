import {
  CONTACT_NUMBER_MAX_LENGTH,
  INPUT_GENERAL_MAX_LENGTH,
  NRIC_FIN_MAX_LENGTH,
  TEXTAREA_GENERAL_MAX_LENGTH
} from "../maxLength";
import * as CaseLabels from "../displayLabels";
import type { CaseFormSchema } from "../keys";
import { CaseFormKeys, ViewCaseKeys } from "../keys";
import { DateFormat } from "../dateFormat";
import { FormTypes, ViewTypes } from "../interface/formTypes";
import { isOthersSelected, shouldValidateIdNo } from "../../utils/generalUtil";

export enum CaseCardsID {
  INTAKE_CASE = "intake_case",
  ENQUIRY_DETAILS = "enquiry_details",
  ENQUIRER_DETAILS = "enquirer_details"
}

export enum CaseCardCaseDetailsID {
  ASSESSMENT_CAPF = "assessment_capf"
}

export const caseEnquirerDetailsCardConfig = [
  [
    {
      key: CaseFormKeys.ENQUIRER_NAME,
      label: CaseLabels.ENQUIRER_NAME,
      field: FormTypes.INPUT,
      fieldProps: {
        maxLength: INPUT_GENERAL_MAX_LENGTH
      }
    },
    {
      colSpan: {
        xs: 0,
        sm: 12,
        md: 12,
        lg: 0
      }
    },
    {
      key: CaseFormKeys.ENQUIRER_ID_TYPE,
      label: CaseLabels.ENQUIRER_ID_TYPE,
      field: FormTypes.SELECT,
      fieldProps: {
        showSearch: true,
        allowClear: true,
        optional: true
      },
      onChange: (key: CaseFormKeys, value?: string) => {
        return {
          values: {
            [key]: value,
            [CaseFormKeys.ENQUIRER_ID_NO]: ""
          },
          errors: {
            [CaseFormKeys.ENQUIRER_ID_NO]: ""
          }
        };
      }
    },
    {
      key: CaseFormKeys.ENQUIRER_ID_NO,
      label: CaseLabels.ENQUIRER_ID_NO,
      field: FormTypes.INPUT,
      fieldProps: (formValues: CaseFormSchema) => {
        const idType = formValues.enquirerIDType;
        const needValidation = shouldValidateIdNo(idType);

        return {
          maxLength: needValidation
            ? NRIC_FIN_MAX_LENGTH
            : INPUT_GENERAL_MAX_LENGTH,
          optional: true
        };
      }
    }
  ],
  [
    {
      key: CaseFormKeys.ENQUIRER_CONTACT_NO,
      label: CaseLabels.ENQUIRER_CONTACT_NO,
      field: FormTypes.INPUT,
      fieldProps: {
        maxLength: CONTACT_NUMBER_MAX_LENGTH,
        optional: true
      }
    },
    {
      key: CaseFormKeys.ENQUIRER_EMAIL,
      label: CaseLabels.ENQUIRER_EMAIL,
      field: FormTypes.INPUT,
      fieldProps: {
        maxLength: INPUT_GENERAL_MAX_LENGTH,
        optional: true
      }
    }
  ]
];

export const caseIntakeCardConfig = [
  [
    {
      key: CaseFormKeys.INTAKE_OFFICER,
      label: CaseLabels.INTAKE_OFFICER,
      field: FormTypes.SELECT,
      fieldProps: {
        mode: "multiple",
        showSearch: true,
        allowClear: true
      }
    },
    {
      key: CaseFormKeys.INTAKE_SUPERVISOR,
      label: CaseLabels.INTAKE_SUPERVISOR,
      field: FormTypes.SELECT,
      fieldProps: {
        mode: "multiple",
        showSearch: true,
        allowClear: true
      }
    }
  ]
];

export const caseEnquiryDetailsCardConfig = [
  [
    {
      key: CaseFormKeys.ENQUIRY_NATURE,
      label: CaseLabels.ENQUIRY_NATURE,
      field: FormTypes.CHIP_TOGGLE
    }
  ],
  [
    {
      key: CaseFormKeys.ENQUIRY_DATE,
      label: CaseLabels.ENQUIRY_DATE,
      field: FormTypes.DATEPICKER,
      fieldProps: {
        stringFormat: DateFormat.ISO_STRING,
        placeholder: "DD/MM/YYYY HH:MMam",
        format: DateFormat.PICKER_DATETIME,
        showTime: { format: "hh:mma", use12Hours: true },
        allowClear: true,
        maxDate: new Date()
      }
    },
    {
      colSpan: {
        xs: 0,
        sm: 12,
        md: 12,
        lg: 0
      }
    },
    {
      key: CaseFormKeys.ENQUIRY_SOURCE,
      label: CaseLabels.ENQUIRY_SOURCE,
      field: FormTypes.SELECT,
      fieldProps: {
        showSearch: true,
        allowClear: true
      },
      onChange: (key: CaseFormKeys, value?: string) => {
        return {
          values: {
            [key]: value,
            [CaseFormKeys.ENQUIRY_AGENCY]: ""
          },
          errors: {
            [CaseFormKeys.ENQUIRY_AGENCY]: ""
          }
        };
      }
    },
    {
      key: CaseFormKeys.ENQUIRY_AGENCY,
      label: CaseLabels.ENQUIRY_AGENCY,
      field: (formValues: CaseFormSchema) => {
        if (formValues && isOthersSelected(formValues.enquirySource)) {
          return FormTypes.INPUT;
        }

        return FormTypes.SELECT;
      },
      fieldProps: (formValues: CaseFormSchema) => {
        const { enquirySource } = formValues;

        if (isOthersSelected(enquirySource)) {
          return {
            maxLength: INPUT_GENERAL_MAX_LENGTH
          };
        }

        return {
          showSearch: true,
          allowClear: true,
          disabled: enquirySource ? false : true
        };
      }
    }
  ]
];

export const caseAgenciesInvolvedCardConfig = [
  [
    {
      key: CaseFormKeys.AGENCIES_INVOLVED,
      label: CaseLabels.AGENCIES_INVOLVED,
      field: FormTypes.SELECT,
      fieldProps: {
        mode: "multiple",
        showSearch: true,
        allowClear: true
      },
      colSpan: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 12
      }
    }
  ],
  [
    {
      key: CaseFormKeys.AGENCIES_INVOLVED_ADVICE_GIVEN,
      label: CaseLabels.AGENCIES_INVOLVED_ADVICE_GIVEN,
      field: FormTypes.TEXTAREA,
      fieldProps: {
        maxLength: TEXTAREA_GENERAL_MAX_LENGTH
      },
      colSpan: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24
      }
    }
  ]
];

/***  View ***/
export const caseViewIntakeDetailsCardConfig = {
  leftColItems: [
    {
      key: ViewCaseKeys.INTAKE_CASE_NO,
      label: CaseLabels.CASE_NO
    },
    {
      key: ViewCaseKeys.OPENED_ON,
      label: CaseLabels.OPENED_ON,
      field: ViewTypes.DATE
    },
    {
      key: CaseFormKeys.INTAKE_OFFICER,
      label: CaseLabels.INTAKE_OFFICER,
      field: ViewTypes.PERSON_TAG
    },
    {
      key: CaseFormKeys.INTAKE_SUPERVISOR,
      label: CaseLabels.INTAKE_SUPERVISOR,
      field: ViewTypes.PERSON_TAG
    }
  ]
};

export const caseViewEnquiryDetailsCardConfig = {
  leftColItems: [
    {
      key: CaseFormKeys.ENQUIRY_NATURE,
      label: CaseLabels.ENQUIRY_NATURE,
      field: ViewTypes.SELECT_FROM_OPTIONS
    },
    {
      key: CaseFormKeys.ENQUIRY_DATE,
      label: CaseLabels.ENQUIRY_DATE,
      field: ViewTypes.DATE_TIME
    }
  ],
  rightColItems: [
    {
      key: CaseFormKeys.ENQUIRY_SOURCE,
      label: CaseLabels.ENQUIRY_SOURCE,
      field: ViewTypes.SELECT_FROM_OPTIONS
    },
    {
      key: CaseFormKeys.ENQUIRY_AGENCY,
      label: CaseLabels.ENQUIRY_AGENCY,
      field: (values: CaseFormSchema) => {
        if (isOthersSelected(values.enquirySource)) {
          return ViewTypes.TEXT;
        }

        return ViewTypes.SELECT_FROM_OPTIONS;
      }
    }
  ]
};

export const caseViewEnquirerDetailsCardConfig = {
  leftColItems: [
    {
      key: CaseFormKeys.ENQUIRER_NAME,
      label: CaseLabels.ENQUIRER_NAME,
      field: ViewTypes.TEXT
    },
    {
      key: CaseFormKeys.ENQUIRER_ID_TYPE,
      label: CaseLabels.ENQUIRER_ID_TYPE,
      field: ViewTypes.SELECT_FROM_OPTIONS
    },
    {
      key: CaseFormKeys.ENQUIRER_ID_NO,
      label: CaseLabels.ENQUIRER_ID_NO,
      field: ViewTypes.TEXT
    }
  ],
  rightColItems: [
    {
      key: CaseFormKeys.ENQUIRER_CONTACT_NO,
      label: CaseLabels.ENQUIRER_CONTACT_NO,
      field: ViewTypes.TEXT
    },
    {
      key: CaseFormKeys.ENQUIRER_EMAIL,
      label: CaseLabels.ENQUIRER_EMAIL,
      field: ViewTypes.TEXT
    }
  ]
};

export const caseViewAgenciesInvolvedCardConfig = {
  leftColItems: [
    {
      key: CaseFormKeys.AGENCIES_INVOLVED,
      label: CaseLabels.AGENCIES_INVOLVED,
      field: ViewTypes.PILL
    },
    {
      key: CaseFormKeys.AGENCIES_INVOLVED_ADVICE_GIVEN,
      label: CaseLabels.AGENCIES_INVOLVED_ADVICE_GIVEN,
      field: ViewTypes.TEXTAREA
    }
  ]
};
