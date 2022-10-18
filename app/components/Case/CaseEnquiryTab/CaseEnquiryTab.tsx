import { useState, useMemo, useEffect } from "react";
import { Card } from "../../common";
import {
  CaseCardsID,
  caseViewEnquirerDetailsCardConfig,
  caseViewEnquiryDetailsCardConfig
} from "../../../constants/config";
import { CaseTitles } from "../../../constants/displayTitles";
import { FormKeys, CaseFormKeys, ViewCaseKeys } from "../../../constants/keys";
import {
  COMMON_EDIT,
  COMMON_EXPORT,
  VIEW_CARD_OPTIONS_CHANGE_LOG,
  lastUpdatedBy
} from "../../../constants/displayLabels";
import { CaseOptionKeys } from "../../../constants/keys/optionKeys";
import { getOptions } from "../../../utils/generalUtil";
import { DoubleRowDisplay } from "../../DoubleRowDisplay";
import type { CaseDetails, DropdownOption } from "~/constants/interface";

export interface CaseEnquiryTabProps {
  data: CaseDetails;
  dropdownOptions?: Partial<
    Record<FormKeys, DropdownOption[] | Record<string, DropdownOption[]>>
  >;
}

export const CaseEnquiryTab = ({
  data,
  dropdownOptions: staticOptions
}: CaseEnquiryTabProps) => {
  if (!data || !data?.enquiry) return null;

  const [dropdownOptions, setDropdownOptions] = useState({});

  const { enquiry } = data;

  const initialOptions = useMemo(() => {
    const massagedOptions = getOptions(
      {
        ...staticOptions
      },
      CaseOptionKeys
    );

    setDropdownOptions({
      ...massagedOptions,
      [CaseFormKeys.ENQUIRY_AGENCY]: []
    });

    return massagedOptions;
  }, [staticOptions]);

  useEffect(() => {
    if (enquiry.enquirySource) {
      const enquirySource = enquiry.enquirySource;

      setDropdownOptions((prevDropdownOptions) => ({
        ...prevDropdownOptions,
        [CaseFormKeys.ENQUIRY_AGENCY]:
          initialOptions[CaseFormKeys.ENQUIRY_AGENCY][enquirySource]
      }));
    }
  }, [enquiry.enquirySource, initialOptions]);

  // TODO: to be updated when we do edit for enquiry details
  const cardActions = [
    { title: COMMON_EDIT },
    { title: COMMON_EXPORT },
    { title: VIEW_CARD_OPTIONS_CHANGE_LOG }
  ];

  // TODO: to be replaced with once the values received from backend
  const intakeLastUpdated = lastUpdatedBy(
    data[ViewCaseKeys.OPENED_ON],
    "Chin Mee Chin (CPS)"
  );

  return (
    <>
      <Card
        id={CaseCardsID.ENQUIRY_DETAILS}
        title={CaseTitles.CARD_ENQUIRY_DETAILS}
        dropdownOptions={cardActions}
        className="mb-6"
      >
        <DoubleRowDisplay
          values={enquiry}
          cols={caseViewEnquiryDetailsCardConfig}
          dropdownOptions={dropdownOptions}
        />
      </Card>

      <Card
        id={CaseCardsID.ENQUIRER_DETAILS}
        title={CaseTitles.CARD_ENQUIRER_DETAILS}
        dropdownOptions={cardActions}
        className="mb-6"
      >
        <DoubleRowDisplay
          values={enquiry}
          cols={caseViewEnquirerDetailsCardConfig}
          dropdownOptions={dropdownOptions}
        />
      </Card>

      <div className="lastUpdated">{intakeLastUpdated}</div>
    </>
  );
};
