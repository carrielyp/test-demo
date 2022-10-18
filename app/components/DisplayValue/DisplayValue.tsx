import { ViewTypes, DropdownOption } from "../../constants/interface";
import { displayViewContent } from "../../utils/generalUtil";
import { RichTextView, Pill, MaskIdentityNumber } from "../common";
import type { PersonProps } from "../PersonTag";
import { PersonTagGroup } from "../PersonTag";

interface Props {
  field?: ViewTypes | ((values: any) => ViewTypes);
  value: any;
  values?: { [x: string]: any };
  dropdownOption?: DropdownOption[];
  options?: {
    message?: string;
  };
  userInfo?: PersonProps[];
}

export const DisplayValue = ({
  field,
  value,
  values,
  dropdownOption,
  options,
  userInfo
}: Props) => {
  if (field === ViewTypes.PERSON_TAG) {
    return (
      <PersonTagGroup
        personIds={value}
        personInfo={(userInfo || []) as PersonProps[]}
      />
    );
  }

  if (field === ViewTypes.RICH_TEXT && value) {
    return <RichTextView value={value} />;
  }

  if (field === ViewTypes.MASKED_ID && value) {
    return <MaskIdentityNumber identificationNum={value} />;
  }

  const displayValue = displayViewContent(
    value,
    values,
    field,
    dropdownOption,
    options
  );

  if (field === ViewTypes.PILL && Array.isArray(displayValue)) {
    return (
      <div className="flex flex-wrap gap-x-1 gap-y-1">
        {displayValue.map((val: string, i: number) => (
          <Pill
            key={i}
            className="h-9 border-blue-10 bg-blue-10 py-0 text-neutral-60"
          >
            {val}
          </Pill>
        ))}
      </div>
    );
  }

  return <div className="whitespace-pre-line break-words">{displayValue}</div>;
};
