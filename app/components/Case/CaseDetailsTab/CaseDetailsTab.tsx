import { EditCard } from "../../EditCard";
import { AssessmentCard } from "../AssessmentCard";
import {
  caseViewAgenciesInvolvedCardConfig,
  caseAgenciesInvolvedCardConfig
} from "../../../constants/config";
import { CaseTitles } from "../../../constants/displayTitles";
import {
  FormKeys,
  CaseSectionKeys,
  CaseFormSchema
} from "../../../constants/keys";
import type { DropdownOption } from "~/constants/interface";

interface Props {
  data: {
    [key in CaseSectionKeys]: Partial<CaseFormSchema>;
  };
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  onSubmit: (cardId: string, values: any) => void;
}

export const CaseDetailsTab = ({ data, dropdownOptions, onSubmit }: Props) => {
  return (
    <>
      <EditCard
        id={CaseSectionKeys.OTHER_AGENCIES_INVOLVED}
        cardTitle={CaseTitles.CARD_AGENCIES_INVOLVED}
        viewConfig={caseViewAgenciesInvolvedCardConfig}
        editConfig={caseAgenciesInvolvedCardConfig}
        initialData={data[CaseSectionKeys.OTHER_AGENCIES_INVOLVED] || {}}
        dropdownOptions={dropdownOptions}
        onSubmit={onSubmit}
      />
      <AssessmentCard
        data={data}
        dropdownOptions={dropdownOptions}
        onSubmit={onSubmit}
      />
    </>
  );
};
