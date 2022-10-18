import type { ChangeEvent, FC } from "react";

import { FormRowDisplay } from "../FormRowDisplay";
import { DisplayPlaceholders } from "../../constants/displayPlaceholders";
import {
  DateTimePicker,
  TextInput,
  TextArea,
  SelectOption,
  RichTextEditor,
  ChipToggleGroup,
  ChipToggle,
  DatePicker,
  Select,
  Slider
} from "../common";
import { DropdownOption, FormTypes } from "../../constants/interface";
import type { FormKeys, FormSchema, FormErrors } from "../../constants/keys";
import { FormValidator } from "../../utils/validationUtils";

export type colItemOnChange = (
  key: FormKeys,
  value?: any,
  formValues?: FormSchema
) => {
  values: Partial<FormSchema>;
  errors: Partial<FormErrors>;
};

export interface ColItem {
  key?: FormKeys;
  label?: string;
  field?: FormTypes | ((values: FormSchema) => FormTypes);
  fieldProps?: any;
  colSpan?: {
    sm: number;
    md: number;
    lg: number;
  };
  className?: string;
  onChange?: colItemOnChange;
}

interface Props {
  formValues: FormSchema;
  formErrors?: Partial<FormErrors>;
  formValidator?: FormValidator;
  isViewMode?: boolean;
  rows: ColItem[][];
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  onFormValueChange: (
    values: Partial<FormSchema>,
    errors?: Partial<FormErrors>
  ) => void;
  onFormErrorChange: (errors: Partial<FormErrors>) => void;
}

export const Form: FC<Props> = ({
  formValues,
  formErrors = {},
  formValidator,
  rows,
  dropdownOptions,
  onFormValueChange,
  onFormErrorChange
}) => {
  const validateError = (key: FormKeys, value?: any): string => {
    if (formValidator) {
      const validator = formValidator[key];

      return validator ? validator(value, formValues) : "";
    }

    return "";
  };

  const handleBlur = (key: FormKeys) => {
    onFormErrorChange({ [key]: validateError(key, formValues[key]) });
  };

  const handleValueChange = (
    key: FormKeys,
    value?: string | string[] | Date,
    onChange?: colItemOnChange,
    errors?: Partial<FormErrors>
  ) => {
    const ownErrors = errors ? errors : { [key]: validateError(key, value) };

    if (onChange) {
      const customOnChangeValues = onChange(key, value, formValues);
      const { values, errors } = customOnChangeValues;

      onFormValueChange(values, {
        ...ownErrors,
        ...errors
      });

      return;
    }

    onFormValueChange({ [key]: value }, ownErrors);
  };

  const handleInputChange = (
    key: FormKeys,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    onChange?: colItemOnChange
  ) => {
    const value = event.target.value;
    let errors = { [key]: formErrors[key] };

    if (formErrors[key]) {
      errors = { [key]: validateError(key, value) };
    }

    handleValueChange(key, value, onChange, errors);
  };

  const handleInputBlur = (key: FormKeys) => {
    const value = formValues[key] ? (formValues[key] as string).trim() : "";

    onFormValueChange({ [key]: value });
    handleBlur(key);
  };

  // const handleRadioChange = (key: FormKeys, event: RadioChangeEvent) => {
  //   const value = event.target.value;
  //   onFormValueChange(key, value);
  // };

  // const handleCheckboxChange = (key: FormKeys, values: CheckboxValueType[]) => {
  //   onFormValueChange(key, values);
  // };

  const getColContent = ({
    key,
    label,
    field: initialField,
    fieldProps: initialFieldProps,
    onChange
  }: {
    key: FormKeys;
    label?: string;
    field?: FormTypes | ((values: FormSchema) => FormTypes);
    fieldProps?: any;
    onChange?: colItemOnChange;
  }) => {
    const fieldProps =
      typeof initialFieldProps === "function"
        ? initialFieldProps(formValues)
        : initialFieldProps;
    const field =
      typeof initialField === "function"
        ? initialField(formValues)
        : initialField;

    switch (field) {
      case FormTypes.DATEPICKER:
        return (
          <DatePicker
            id={key}
            label={label}
            value={formValues[key]}
            valueType="string"
            error={formErrors[key] || ""}
            onChange={(date?: Date) => handleValueChange(key, date, onChange)}
            onBlur={() => handleBlur(key)}
            {...fieldProps}
          />
        );

      case FormTypes.DATE_TIME_PICKER:
        return (
          <DateTimePicker
            id={key}
            value={formValues[key]}
            valueType="date"
            error={formErrors[key] || ""}
            onChange={(date?: Date) => handleValueChange(key, date, onChange)}
            {...fieldProps}
          />
        );

      case FormTypes.INPUT:
        return (
          <TextInput
            id={key}
            label={label}
            value={formValues[key]}
            error={formErrors[key] || ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(key, event, onChange)
            }
            onBlur={() => handleInputBlur(key)}
            {...fieldProps}
          />
        );
      case FormTypes.TEXTAREA:
        return (
          <TextArea
            id={key}
            label={label}
            value={formValues[key]}
            error={formErrors[key] || ""}
            placeholder={DisplayPlaceholders.TYPE_SOMETHING}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(key, event)
            }
            onBlur={() => handleInputBlur(key)}
            {...fieldProps}
          />
        );

      // case FormTypes.RADIO: {
      //   return (
      //     <RadioGroup
      //       value={formValues[key]}
      //       onChange={(event: RadioChangeEvent) =>
      //         handleRadioChange(key, event)
      //       }
      //       {...fieldProps}
      //     >
      //       {(dropdownOptions as any)[key].map((btn: any) => (
      //         <RadioButton key={btn.value} value={btn.value}>
      //           {btn.label}
      //         </RadioButton>
      //       ))}
      //     </RadioGroup>
      //   );
      // }
      case FormTypes.SELECT: {
        let value = formValues[key];

        if (!value || (Array.isArray(value) && value.length === 0)) {
          value = undefined;
        }

        return (
          <Select
            id={key}
            label={label}
            value={value}
            placeholder={DisplayPlaceholders.SELECT}
            error={formErrors[key] || ""}
            onChange={(value: string[] | string) =>
              handleValueChange(key, value, onChange)
            }
            onBlur={() => handleBlur(key)}
            {...fieldProps}
          >
            {((dropdownOptions as any)[key] || []).map(
              (item: any, i: number) => (
                <SelectOption key={i} value={item.value} label={item.label}>
                  {item.label}
                </SelectOption>
              )
            )}
          </Select>
        );
      }

      case FormTypes.RICH_TEXT:
        return (
          <RichTextEditor
            label={label}
            value={formValues[key] as string}
            onChange={(value: string) =>
              handleValueChange(key, value, onChange)
            }
          />
        );

      case FormTypes.SLIDER:
        return (
          <Slider
            label={label}
            value={formValues[key] || 0}
            onChange={(value: string) =>
              handleValueChange(key, value, onChange)
            }
            {...fieldProps}
          />
        );

      // case FormTypes.CHECKBOXGROUP: {
      //   return (
      //     <CheckBoxGroup
      //       value={formValues[key]}
      //       onChange={(value: CheckboxValueType[]) =>
      //         handleCheckboxChange(key, value)
      //       }
      //       {...fieldProps}
      //     >
      //       {(dropdownOptions as any)[key].map((item: any, i: number) => (
      //         <CheckBox key={i} value={item.value}>
      //           {item.label}
      //         </CheckBox>
      //       ))}
      //     </CheckBoxGroup>
      //   );
      // }

      case FormTypes.CHIP_TOGGLE:
        return (
          <ChipToggleGroup
            id={key}
            label={label}
            value={formValues[key]}
            error={formErrors[key] || ""}
            onChange={(value: string) =>
              handleValueChange(key, value, onChange)
            }
            {...fieldProps}
          >
            {(dropdownOptions as any)[key].map((item: any, i: number) => (
              <ChipToggle
                key={i}
                value={item.value}
                error={formErrors[key] || ""}
              >
                {item.label}
              </ChipToggle>
            ))}
          </ChipToggleGroup>
        );

      default:
        return null;
    }
  };

  const massageColItem = (colItems: ColItem[]) => {
    return colItems.map((item) => {
      const { key, colSpan, className, ...restProps } = item;

      return {
        id: key ? `${key}Container` : undefined,
        content: key ? getColContent({ key, ...restProps }) : null,
        className,
        colSpan
      };
    });
  };

  return (
    <div className="mt-[-1rem]">
      {rows.map((row, i) => {
        return <FormRowDisplay key={i} colItems={massageColItem(row)} />;
      })}
    </div>
  );
};
