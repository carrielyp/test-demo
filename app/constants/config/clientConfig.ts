import {
  ENQUIRER_ID_TYPE,
  ID_NO,
  GENDER,
  DATE_OF_BIRTH,
  ENTRY_AGE,
  SPOKEN_LANGUAGE,
  CONTACT_NO,
  ENQUIRER_EMAIL,
  ADDRESS
} from "../displayLabels";
import { ViewTypes } from "../interface";
import { ProfileFormKeys } from "../keys";

export const caseViewClientDetailsCardConfig = {
  leftColItems: [
    {
      key: ProfileFormKeys.IDENTITY_TYPE,
      label: ENQUIRER_ID_TYPE,
      field: ViewTypes.SELECT_FROM_OPTIONS
    },
    {
      key: ProfileFormKeys.IDENTITY_NUMBER,
      label: ID_NO,
      field: ViewTypes.MASKED_ID
    },
    {
      key: ProfileFormKeys.SEX,
      label: GENDER,
      field: ViewTypes.SELECT_FROM_OPTIONS
    },
    {
      key: ProfileFormKeys.DATE_OF_BIRTH,
      label: DATE_OF_BIRTH,
      field: ViewTypes.DATE_YEARS_MONTHS
    },
    {
      key: ProfileFormKeys.ENTRY_AGE,
      label: ENTRY_AGE,
      field: ViewTypes.TEXT
    }
  ],
  rightColItems: [
    {
      key: ProfileFormKeys.SPOKEN_LANGUAGES,
      label: SPOKEN_LANGUAGE,
      field: ViewTypes.PILL
    },
    {
      key: ProfileFormKeys.CONTACT_NO,
      label: CONTACT_NO,
      field: ViewTypes.TEXT
    },
    {
      key: ProfileFormKeys.EMAIL,
      label: ENQUIRER_EMAIL,
      field: ViewTypes.TEXT
    },
    {
      key: ProfileFormKeys.ADDRESS,
      label: ADDRESS,
      field: ViewTypes.TEXT
    }
  ]
};
