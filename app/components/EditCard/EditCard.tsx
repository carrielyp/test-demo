import { useEffect, useState } from "react";
import { Card, Button } from "../../components/common";
import {
  COMMON_EDIT,
  COMMON_DONE,
  COMMON_CANCEL
} from "../../constants/displayLabels";
import { DropdownOption } from "../../constants/interface";
import { CaseFormSchema, FormKeys, CaseFormErrors } from "../../constants/keys";
import {
  generateInitialFormErrors,
  checkErrors
} from "../../utils/generalUtil";
import { FormValidator } from "../../utils/validationUtils";
import type { ViewCols } from "../DoubleRowDisplay";
import { DoubleRowDisplay } from "../DoubleRowDisplay";
import type { ColItem } from "../Form";
import { Form } from "../Form";

interface Props {
  id: string;
  cardTitle: string;
  viewConfig: ViewCols;
  editConfig: ColItem[][];
  formValidator?: FormValidator;
  initialData: CaseFormSchema;
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  onSubmit: (cardId: string, values: any) => void;
}

export const EditCard = ({
  id,
  cardTitle,
  viewConfig,
  editConfig,
  formValidator,
  initialData,
  dropdownOptions,
  onSubmit
}: Props) => {
  const [isViewMode, setIsViewMode] = useState(true);
  const [internalValues, setInternalValues] = useState(
    { ...initialData } || {}
  );

  const [formErrors, setFormErrors] = useState<Partial<CaseFormErrors>>(
    generateInitialFormErrors(initialData)
  );

  const toggleViewMode = () => {
    setIsViewMode(!isViewMode);
  };

  const cardActions = [
    {
      title: COMMON_EDIT,
      onClick: toggleViewMode
    }
  ];

  useEffect(() => {
    setInternalValues({ ...initialData });
  }, [initialData]);

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

    toggleViewMode();
    onSubmit(id, internalValues);
  };

  const handleCancelClick = () => {
    setInternalValues({ ...initialData });
    setFormErrors(generateInitialFormErrors(initialData));
    toggleViewMode();
  };

  return (
    <Card
      id={id}
      title={cardTitle}
      dropdownOptions={isViewMode ? cardActions : undefined}
      className="mb-6"
      footer={
        !isViewMode && (
          <div className="flex h-20 items-center rounded-b-lg bg-neutral-20 p-4">
            <Button onClick={handleDoneClick}>{COMMON_DONE}</Button>
            <Button className="ml-2" type="text" onClick={handleCancelClick}>
              {COMMON_CANCEL}
            </Button>
          </div>
        )
      }
    >
      {isViewMode ? (
        <DoubleRowDisplay
          values={internalValues}
          cols={viewConfig}
          dropdownOptions={dropdownOptions}
        />
      ) : (
        <Form
          formValues={internalValues}
          formErrors={formErrors}
          formValidator={formValidator}
          rows={editConfig}
          dropdownOptions={dropdownOptions}
          onFormValueChange={updateFormValues}
          onFormErrorChange={updateFormErrors}
        />
      )}
    </Card>
  );
};
