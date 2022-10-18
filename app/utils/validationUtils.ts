import { DateFormat } from "../constants/dateFormat";
import {
  CaseFormSchema,
  CaseFormKeys,
  FormSchema,
  FormKeys
} from "../constants/keys";
import { CONTACT_NUMBER_MAX_LENGTH } from "../constants/maxLength";
import {
  ADD_CLIENT_SEARCH_MIN_LENGTH_ERROR,
  makeErrorMessage
} from "../constants/displayErrorMsgs";
import { validator } from "./validate/form-validator";
import { isOthersSelected, shouldValidateIdNo } from "./generalUtil";

export type FormValidator = Partial<
  Record<FormKeys, (value: any, formValues?: FormSchema) => string>
>;

export const caseEnquirerDetailsValidation: FormValidator = {
  [CaseFormKeys.ENQUIRER_NAME]: validator({
    required: {
      message: makeErrorMessage("Empty", {
        fieldName: "name"
      })
    }
  }),
  [CaseFormKeys.ENQUIRER_ID_NO]: (
    value: string,
    formValues?: CaseFormSchema
  ) => {
    if (formValues && shouldValidateIdNo(formValues.enquirerIDType)) {
      return validator({
        isValidNric: {
          message: makeErrorMessage("Required", {
            fieldName: "ID no"
          })
        }
      })(value);
    }

    return "";
  },
  [CaseFormKeys.ENQUIRER_CONTACT_NO]: validator({
    length: {
      max: CONTACT_NUMBER_MAX_LENGTH
    },
    internationalNumber: {
      message: makeErrorMessage("Required", {
        fieldName: "contact no"
      })
    }
  }),
  [CaseFormKeys.ENQUIRER_EMAIL]: validator({
    email: {
      message: makeErrorMessage("Required", {
        fieldName: "email"
      })
    }
  })
};

export const caseIntakeValidation: FormValidator = {
  [CaseFormKeys.INTAKE_OFFICER]: validator({
    required: {
      message: makeErrorMessage("AnRequiredSelect", {
        fieldName: "officer"
      })
    }
  }),
  [CaseFormKeys.INTAKE_SUPERVISOR]: validator({
    required: {
      message: makeErrorMessage("RequiredSelect", {
        fieldName: "supervisor"
      })
    }
  })
};

export const caseEnquiryDetailsValidation: FormValidator = {
  [CaseFormKeys.ENQUIRY_NATURE]: validator({
    required: {
      message: makeErrorMessage("RequiredSelect", {
        fieldName: "nature of enquiry"
      })
    }
  }),
  [CaseFormKeys.ENQUIRY_DATE]: validator({
    required: {
      message: makeErrorMessage("RequiredSelect", {
        fieldName: "date of enquiry"
      })
    },
    date: {
      message: makeErrorMessage("Required", {
        fieldName: "date and time (DD/MM/YYYY HH:MMam)."
      }),
      format: DateFormat.ISO_STRING
    },
    lessThanOrEqualCurrentDate: {
      message: makeErrorMessage("PastDate", {
        fieldName: "Date of enquiry"
      }),
      format: DateFormat.ISO_STRING
    }
  }),
  [CaseFormKeys.ENQUIRY_SOURCE]: validator({
    required: {
      message: makeErrorMessage("RequiredSelect", {
        fieldName: "source of enquiry"
      })
    }
  }),
  [CaseFormKeys.ENQUIRY_AGENCY]: (
    value: string,
    formValues?: CaseFormSchema
  ) => {
    if (!(formValues && formValues.enquirySource)) return "";

    return validator({
      required: {
        message: makeErrorMessage(
          isOthersSelected(formValues.enquirySource)
            ? "AnEmpty"
            : "AnRequiredSelect",
          {
            fieldName: "agency"
          }
        )
      }
    })(value);
  }
};

export const addClientSearchValidator = (value: string) => {
  return validator({
    required: {
      message: ADD_CLIENT_SEARCH_MIN_LENGTH_ERROR
    },
    length: {
      min: 2,
      message: ADD_CLIENT_SEARCH_MIN_LENGTH_ERROR
    }
  })(value);
};
