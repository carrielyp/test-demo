import { scroller } from "react-scroll";
import { IDType, ViewTypes, DropdownOption } from "../constants/interface";
import {
  FormSchema,
  FormKeys,
  FormErrors,
  CaseFormSchema,
  CaseFormErrors
} from "../constants/keys";
import { DateUtil, getAgeInYearsMonths } from "./DateUtil";

/**
 * checks for empty value such as such as empty string, undefined or null
 * @param value
 * @returns boolean
 */
export const isEmptyValue = (value: any) => {
  return (
    value === "" ||
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0)
  );
};

/**
 * Remove empty value from an object, such as empty string, undefined or null
 * @param obj
 */
export const removeEmptyValueFromObject = (obj: any) => {
  for (const propName in obj) {
    if (isEmptyValue(obj[propName])) {
      delete obj[propName];
    }
  }

  return obj;
};

export const shouldValidateIdNo = (idType?: IDType) => {
  // TODO: future sprints to check other IDType validations
  return (
    idType &&
    [
      IDType.SINGAPORE_PINK_IDENTIFICATION_CARD
      // IDType.SINGAPORE_BLUE_IDENTIFICATION_CARD,
      // IDType.SINGAPORE_CITIZENSHIP_CERTIFICATE,
      // IDType.SINGAPORE_BIRTH_CERTIFICATE
    ].includes(idType)
  );
};

export const getSelectOptionLabel = <T>(
  value: T,
  options: { label: string; value: T }[]
): string => {
  const selectedOption = options.find((obj) => {
    return obj.value === value;
  });

  return selectedOption ? selectedOption.label : "";
};

export const displayViewContent = (
  value: any,
  values: any,
  initialField?: ViewTypes | ((values: { [x: string]: any }) => ViewTypes),
  dropdownOption?: DropdownOption[],
  options?: {
    message?: string;
  }
) => {
  const field =
    typeof initialField === "function" ? initialField(values) : initialField;
  let displayValue;

  switch (field) {
    default:
    case ViewTypes.TEXT:
    case ViewTypes.TEXTAREA:
      displayValue = value;
      break;

    case ViewTypes.TEXT_WITH_MESSAGE:
      displayValue = !isEmptyValue(value)
        ? options?.message?.replace(/<value>/g, value)
        : "";
      break;

    case ViewTypes.DATE:
      displayValue = DateUtil.toDisplayDate(value);
      break;

    case ViewTypes.DATE_YEARS_MONTHS:
      displayValue = `${DateUtil.toDisplayDate(value)} (${getAgeInYearsMonths(
        value
      )})`;
      break;

    case ViewTypes.DATE_TIME:
      displayValue = DateUtil.toDisplayDateTime(value);
      break;

    case ViewTypes.SELECT_FROM_OPTIONS:

    case ViewTypes.PILL: {
      if (!dropdownOption) break;

      if (Array.isArray(value) && value.length > 0) {
        displayValue = value.map((val) => {
          return getSelectOptionLabel(val, dropdownOption);
        });
      } else if (value) {
        displayValue = getSelectOptionLabel(value, dropdownOption);
      }

      break;
    }
  }

  return isEmptyValue(displayValue) ? "—" : displayValue;
};

export const checkErrors = (
  formValues: Partial<FormSchema>,
  validators?: Partial<
    Record<FormKeys, (value: any, formValues?: CaseFormSchema) => string | null>
  >
) => {
  if (!validators) return {};

  const allErrors: Partial<FormErrors> = {};

  for (const key in validators) {
    const formKeys = key as keyof FormSchema;

    if (validators[formKeys]) {
      const error =
        (validators[formKeys] as any)(formValues[formKeys], formValues) || "";

      if (error) {
        allErrors[formKeys] = error;
      }
    }
  }

  return allErrors;
};

export const isOthersSelected = (value?: string) => {
  return value === "SELECT_OTHER";
};

export const scrollToFirstError = (validationErrors: {
  [key: string]: string;
}): void => {
  let distanceFromTop = 20000;
  let highestField = "";

  for (const field in validationErrors) {
    if (!validationErrors[field]) continue;

    // some fields cannot append id to input field. eg: Select
    // hence created custom id for wrapper containing field and label
    const id = field + "Container";

    const element = document.getElementById(id);

    if (element) {
      const top = element.getBoundingClientRect().top;

      if (top < distanceFromTop) {
        distanceFromTop = top;
        highestField = id;
      }
    }
  }

  if (highestField === "") return;

  scroller.scrollTo(highestField, {
    offset: -100,
    smooth: true
  });
};

/**
 * To massage BE options list for FE use.
 * standardise all dropdown option to use DropdownOption[]
 * @param options - options from BE
 * @param fieldMappingKeys - BE keys to be mapped to FormKeys
 * @param optionMappingKeys - special mapping of option key. eg: userName to map to value
 * @returns
 * {
 *  enquiryNature: DropdownOption[],
 *  enquiryAgency: {
 *    "SCHOOL": DropdownOption[]
 * }
 */
export const getOptions = (
  options: { [x: string]: any[] | { [x: string]: any[] } },
  fieldMappingKeys: { [x: string]: string },
  optionMappingKeys?: { [x: string]: { value: string; label: string } }
) => {
  const finalOptions: any = {};

  Object.keys(options).forEach((optionKey) => {
    const currOption = options[optionKey];
    const formKey = (fieldMappingKeys as any)[optionKey] || optionKey;

    if (Array.isArray(currOption)) {
      let massagedOptions = currOption;

      if (optionMappingKeys && optionMappingKeys[formKey]) {
        const valueKey = optionMappingKeys[formKey].value || "value";
        const labelKey = optionMappingKeys[formKey].label || "label";

        massagedOptions = currOption.map((option) => {
          return { value: option[valueKey], label: option[labelKey] };
        });
      }

      finalOptions[formKey] = massagedOptions;
    } else {
      finalOptions[formKey] = getOptions(
        currOption,
        fieldMappingKeys,
        optionMappingKeys
      );
    }
  });

  return finalOptions;
};

export const generateInitialFormErrors = (initialData: CaseFormSchema) => {
  if (!initialData) return {};

  return Object.keys(initialData).reduce((acc, curr) => {
    (acc as any)[curr] = "";

    return acc;
  }, {}) as CaseFormErrors;
};

export const generateUrlParams = (values: {
  [key: string]: string | number;
}) => {
  let urlParams = "?";

  Object.keys(values).forEach((key, index) => {
    if (index !== 0) {
      urlParams += "&";
    }

    const value = values[key];

    urlParams += key + "=" + encodeURIComponent(value);
  });

  return urlParams;
};

export const maskIdentityNumber = (uin: string, maskedChar = "•") => {
  if (uin.length <= 2) {
    return uin;
  } else if (uin.length <= 5) {
    return `${uin.substring(0, 1)}${maskedChar.repeat(
      uin.length - 2
    )}${uin.substring(uin.length - 1)}`;
  } else if (uin.length >= 6 && uin.length <= 11) {
    return `${uin.substring(0, 1)}${maskedChar.repeat(
      uin.length - 5
    )}${uin.substring(uin.length - 4)}`;
  } else {
    return `${uin.substring(0, 1)}${maskedChar.repeat(6)}${uin.substring(
      uin.length - 4
    )}`;
  }
};

/**
 * Use this for substituting values into a URL template, to form URLs which contain variables in the path.
 * E.g.
 * ```
 * substitute("/api/dept/{1}/{2}/data", ["123", "456"]);
 * ```
 * returns `"/api/dept/123/456/data"`
 * @param template URL template
 * @param values array of string values to substitute into template
 */
export const substitute = (template: string, values: string[]): string => {
  if (values && values.length > 0) {
    for (let i = 0; i < values.length; i++) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const rx = new RegExp(`\\{${i + 1}\\}`, "g");

      template = template.replace(rx, values[i]);
    }

    return template;
  } else {
    return template;
  }
};
