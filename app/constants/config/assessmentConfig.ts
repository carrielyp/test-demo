import type { ColSize } from "antd/lib/grid";
import {
  HARM_SECTION,
  HARM_TYPE,
  ASSESSMENT_STATEMENT,
  HARM_POLICE_INVESTIGATION,
  HARM_POLICE_CLASSIFICATION,
  HARM_POLICE_IO,
  HARM_MEDICAL_INVESTIGATION,
  HARM_MEDICAL_CLASSIFICATION,
  HARM_MEDICAL_MO,
  SAFETY_SCALE_RATING
} from "../displayLabels";
import {
  SAFETY_SCALE_EDIT_MSG,
  SAFETY_SCALE_VIEW_RATING
} from "../displayMsgs";
import { CaseTitles } from "../displayTitles";
import { FormTypes, ViewTypes } from "../interface/formTypes";
import { CaseFormKeys, CaseSectionKeys } from "../keys";
import { INPUT_GENERAL_MAX_LENGTH } from "../maxLength";

export type ValueConfig = {
  key: string;
  label: string;
  editConfig: {
    field: FormTypes;
    fieldProps?: { [key: string]: any };
    colSpan?: {
      xs?: number | ColSize;
      sm?: number | ColSize;
      md?: number | ColSize;
      lg?: number | ColSize;
    };
  };
  viewConfig: {
    field: ViewTypes;
    options?: {
      message?: string;
    };
    colSpan?: {
      xs?: number | ColSize;
      sm?: number | ColSize;
      md?: number | ColSize;
      lg?: number | ColSize;
    };
  };
};

export type AssessmenSubSectionConfig = {
  key: string;
  label: string;
  message?: string;
  valueConfig: ValueConfig[];
};

export type AssessmentSectionConfig = {
  key: string;
  title: string;
  config?: AssessmenSubSectionConfig[];
};

export const assessmentConfig: AssessmentSectionConfig[] = [
  {
    key: "TBD - genogram", // TODO: add actual key when entity is added in BE
    title: CaseTitles.ASSESSMENT_GENOGRAM
  },
  {
    key: "TBD - cc",
    title: CaseTitles.ASSESSMENT_CULTURAL_CONSIDERATIONS
  },
  {
    key: CaseSectionKeys.HARM,
    title: CaseTitles.ASSESSMENT_HARM,
    config: [
      {
        key: "harm1",
        label: HARM_SECTION,
        valueConfig: [
          {
            key: CaseFormKeys.HARM_TYPE,
            label: HARM_TYPE,
            editConfig: {
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
                lg: 20
              }
            },
            viewConfig: {
              field: ViewTypes.PILL
            }
          },
          {
            key: CaseFormKeys.HARM_STATEMENT,
            label: ASSESSMENT_STATEMENT,
            editConfig: {
              field: FormTypes.RICH_TEXT,
              colSpan: {
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24
              }
            },
            viewConfig: {
              field: ViewTypes.RICH_TEXT
            }
          }
        ]
      },
      {
        key: "harmPolice",
        label: HARM_POLICE_INVESTIGATION,
        valueConfig: [
          {
            key: CaseFormKeys.HARM_POLICE_CLASSIFICATION,
            label: HARM_POLICE_CLASSIFICATION,
            editConfig: {
              field: FormTypes.INPUT,
              fieldProps: {
                maxLength: INPUT_GENERAL_MAX_LENGTH
              },
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 10
              }
            },
            viewConfig: {
              field: ViewTypes.TEXT,
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12
              }
            }
          },
          {
            key: CaseFormKeys.HARM_POLICE_IO,
            label: HARM_POLICE_IO,
            editConfig: {
              field: FormTypes.INPUT,
              fieldProps: {
                maxLength: INPUT_GENERAL_MAX_LENGTH
              },
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 10
              }
            },
            viewConfig: {
              field: ViewTypes.TEXT,
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12
              }
            }
          }
        ]
      },
      {
        key: "harmMedical",
        label: HARM_MEDICAL_INVESTIGATION,
        valueConfig: [
          {
            key: CaseFormKeys.HARM_MEDICAL_CLASSIFICATION,
            label: HARM_MEDICAL_CLASSIFICATION,
            editConfig: {
              field: FormTypes.INPUT,
              fieldProps: {
                maxLength: INPUT_GENERAL_MAX_LENGTH
              },
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 10
              }
            },
            viewConfig: {
              field: ViewTypes.TEXT,
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12
              }
            }
          },
          {
            key: CaseFormKeys.HARM_MEDICAL_MO,
            label: HARM_MEDICAL_MO,
            editConfig: {
              field: FormTypes.INPUT,
              fieldProps: {
                maxLength: INPUT_GENERAL_MAX_LENGTH
              },
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 10
              }
            },
            viewConfig: {
              field: ViewTypes.TEXT,
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12
              }
            }
          }
        ]
      }
    ]
  },
  {
    key: "TBD - pab",
    title: CaseTitles.ASSESSMENT_PROTECTION_AND_BELONGING
  },
  {
    key: "TBD - cf",
    title: CaseTitles.ASSESSMENT_COMPLICATING_FACTORS
  },
  {
    key: "TBD-sar",
    title: CaseTitles.ASSESSMENT_STRENGTHS_AND_RESOURCES
  },
  {
    key: CaseSectionKeys.SAFETY_SCALE,
    title: CaseTitles.ASSESSMENT_SAFETY_SCALE,
    config: [
      {
        key: "safe1",
        label: SAFETY_SCALE_RATING,
        message: SAFETY_SCALE_EDIT_MSG,
        valueConfig: [
          {
            key: CaseFormKeys.SAFETY_SCALE_RATING,
            label: "",
            editConfig: {
              field: FormTypes.SLIDER,
              fieldProps: {
                min: 0,
                max: 10
              },
              colSpan: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12
              }
            },
            viewConfig: {
              field: ViewTypes.TEXT_WITH_MESSAGE,
              options: {
                message: SAFETY_SCALE_VIEW_RATING
              }
            }
          }
        ]
      }
    ]
  },
  {
    key: "TBD-ws",
    title: CaseTitles.ASSESSMENT_WORRY_STATEMENTS
  },
  {
    key: "TBD-gs",
    title: CaseTitles.ASSESSMENT_GOAL_STATEMENTS
  },
  {
    key: "TBD-sp",
    title: CaseTitles.ASSESSMENT_SAFETY_PLAN
  },
  {
    key: "TBD-ns",
    title: CaseTitles.ASSESSMENT_NEXT_STEPS
  }
];
