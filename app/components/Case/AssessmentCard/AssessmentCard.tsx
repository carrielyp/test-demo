import { useEffect, useMemo, useState } from "react";

import type { AssessmentButtonProps } from "../AssessmentButton";
import { AssessmentButtonGroupWithCollapsible } from "../AssessmentButton";
import { AssessmentView } from "../AssessmentView";
import { AssessmentEdit } from "../AssessmentEdit";
import {
  assessmentConfig,
  CaseCardCaseDetailsID
} from "../../../constants/config";
import { ASSESSMENT_CAPF_SECTION } from "../../../constants/displayMsgs";
import { CaseTitles } from "../../../constants/displayTitles";
import { DropdownOption } from "../../../constants/interface";
import {
  CaseFormSchema,
  CaseSectionKeys,
  FormKeys
} from "../../../constants/keys";
import { removeEmptyValueFromObject } from "../../../utils/generalUtil";
import { ModalSheet, Card, Divider, Button, Icon } from "../../common";

type Props = {
  data: {
    [key in CaseSectionKeys]: Partial<CaseFormSchema>;
  };
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  onSubmit: (cardId: string, values: any) => void;
};

export const AssessmentCard = ({ data, dropdownOptions, onSubmit }: Props) => {
  const [values, setValues] = useState({});
  const [sectionButtons, setSectionButtons] = useState<AssessmentButtonProps[]>(
    []
  );
  const [activeModalConfig, setActiveModalConfig] = useState<any>(null);
  const [isViewExpanded, setIsViewExpanded] = useState(false);

  const isSectionValueEmpty = (values: any) => {
    return !(
      values &&
      Object.keys(removeEmptyValueFromObject({ ...values })).length > 0
    );
  };

  const handleSectionEditClick = (sectionKey: string) => {
    setActiveModalConfig(
      assessmentConfig.find((item) => item.key === sectionKey) || null
    );
  };

  useEffect(() => {
    const newSectionButtons: any[] = [];
    const newValues = {};

    assessmentConfig.forEach((section) => {
      const { key, title } = section;
      const currValue = (data as any)[key];

      if (isSectionValueEmpty(currValue)) {
        newSectionButtons.push({
          id: `${key}Button`,
          title,
          onClick: () => handleSectionEditClick(key)
        });
      } else {
        (newValues as any)[key] = currValue;
      }
    });

    setValues(newValues);

    setSectionButtons(newSectionButtons);

    if (newSectionButtons.length === 0) {
      setIsViewExpanded(true);
    }
  }, [data]);

  const isShowAllSectionButtons = useMemo(() => {
    return sectionButtons.length === assessmentConfig.length;
  }, [sectionButtons]);

  const handleExpansionClick = () => {
    setIsViewExpanded(!isViewExpanded);
  };

  const handleModalClose = () => {
    setActiveModalConfig(null);
  };

  const handleSubmit = (sectionKey: string, values: any) => {
    onSubmit(sectionKey, values);
    handleModalClose();
  };

  return (
    <Card
      id={CaseCardCaseDetailsID.ASSESSMENT_CAPF}
      title={CaseTitles.ASSESSMENT_CAPF}
    >
      {sectionButtons.length > 0 && (
        <>
          <p className="mb-0">{ASSESSMENT_CAPF_SECTION}</p>
          <AssessmentButtonGroupWithCollapsible
            buttons={sectionButtons}
            isExpanded={isViewExpanded}
            isShowAll={isShowAllSectionButtons}
          />
          {!isShowAllSectionButtons && (
            <Divider plain noPadding>
              <Button
                size="small"
                icon={isViewExpanded ? <Icon.CaretsUp /> : <Icon.CaretsDown />}
                onClick={handleExpansionClick}
              ></Button>
            </Divider>
          )}
        </>
      )}

      <AssessmentView
        values={values}
        onClick={handleSectionEditClick}
        dropdownOptions={dropdownOptions}
      />

      <ModalSheet
        visible={!!activeModalConfig}
        closable
        onClose={handleModalClose}
        title={activeModalConfig && activeModalConfig.title}
      >
        {!!activeModalConfig && (
          <AssessmentEdit
            sectionConfig={activeModalConfig}
            initialData={(values as any)[activeModalConfig.key]}
            dropdownOptions={dropdownOptions}
            onCancel={handleModalClose}
            onSubmit={handleSubmit}
          />
        )}
      </ModalSheet>
    </Card>
  );
};
