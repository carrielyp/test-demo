import { useState } from "react";
import {
  AssessmentSectionConfig,
  AssessmenSubSectionConfig
} from "../../../constants/config";
import { COMMON_DONE, COMMON_CANCEL } from "../../../constants/displayLabels";
import { DropdownOption } from "../../../constants/interface";
import {
  CaseFormSchema,
  FormKeys,
  CaseFormErrors
} from "../../../constants/keys";
import {
  generateInitialFormErrors,
  checkErrors
} from "../../../utils/generalUtil";
import { FormValidator } from "../../../utils/validationUtils";
import { ModalSheetFooter } from "../../common";
import { ModalSheetGrayContainer } from "../../common/ModalSheet/ModalSheetGrayContainer";
import type { ColItem } from "../../Form";
import { Form } from "../../Form";

type Props = {
  sectionConfig: AssessmentSectionConfig;
  initialData: Partial<CaseFormSchema>;
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  formValidator?: FormValidator;
  onSubmit: (sectionKey: string, values: any) => void;
  onCancel: () => void;
};

export const AssessmentEdit = ({
  sectionConfig,
  initialData,
  dropdownOptions,
  formValidator,
  onSubmit,
  onCancel
}: Props) => {
  const { config, key } = sectionConfig;
  const [internalValues, setInternalValues] = useState(
    { ...initialData } || {}
  );

  const [formErrors, setFormErrors] = useState<Partial<CaseFormErrors>>(
    generateInitialFormErrors(initialData)
  );

  const updateFormValues = (
    values: Partial<CaseFormSchema>,
    errors?: Partial<CaseFormErrors>
  ) => {
    setInternalValues((currInternalValues) => ({
      ...currInternalValues,
      ...values
    }));

    errors && updateFormErrors(errors || {});
  };

  const updateFormErrors = (errors: Partial<CaseFormErrors>) => {
    setFormErrors((currFormErrors) => ({
      ...currFormErrors,
      ...errors
    }));
  };

  const handleDoneClick = () => {
    const errors = checkErrors(internalValues, formValidator);

    if (Object.keys(errors).length > 0) {
      updateFormErrors(errors);

      return;
    }

    onSubmit(key, internalValues);
  };

  const renderSection = (section: AssessmenSubSectionConfig) => {
    const { label, key, valueConfig, message } = section;
    const sectionLabel = label || valueConfig[0].label;
    const editConfigRow = valueConfig.map((item) => {
      const { key, label, editConfig } = item;

      return {
        key,
        label,
        ...editConfig
      };
    });

    return (
      <ModalSheetGrayContainer key={key}>
        {sectionLabel && (
          <div className="text-lg font-extrabold leading-5 text-neutral-60">
            {sectionLabel}
          </div>
        )}
        {message && <p className="mt-2 text-sm text-neutral-60">{message}</p>}
        <div className="mt-4">
          <Form
            formValues={internalValues}
            formErrors={formErrors}
            formValidator={formValidator}
            rows={[editConfigRow] as ColItem[][]}
            dropdownOptions={dropdownOptions}
            onFormValueChange={updateFormValues}
            onFormErrorChange={updateFormErrors}
          />
        </div>
      </ModalSheetGrayContainer>
    );
  };

  return (
    <>
      <div className="space-y-6">
        {config && config.map((section) => renderSection(section))}
      </div>
      <ModalSheetFooter
        okText={COMMON_DONE}
        onOk={handleDoneClick}
        cancelText={COMMON_CANCEL}
        onCancel={onCancel}
      />
    </>
  );
};
