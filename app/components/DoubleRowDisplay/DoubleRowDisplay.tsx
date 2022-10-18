import { Col, Row } from "antd/lib/grid";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { PersonProps } from "../PersonTag";
import { DisplayValue } from "../DisplayValue";
import type { ViewTypes, DropdownOption } from "~/constants/interface";
import type { FormKeys } from "~/constants/keys/formKeys";
import type { ViewKeys } from "~/constants/keys/viewKeys";

interface ColItem {
  key: ViewKeys;
  label: string | ReactNode;
  field?: ViewTypes | ((values: any) => ViewTypes);
}

export interface ViewCols {
  leftColItems: ColItem[];
  rightColItems?: ColItem[];
}

interface Props {
  values: { [x: string]: any };
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  cols: ViewCols;
  userInfo?: { [x: string]: PersonProps[] };
}

export const DoubleRowDisplay = ({
  values,
  cols,
  dropdownOptions,
  userInfo
}: Props) => {
  const { leftColItems, rightColItems } = cols;

  const colSpan: { outerCol: number } = useMemo(() => {
    if (rightColItems && rightColItems.length > 0) {
      return {
        outerCol: 12
      };
    }

    return {
      outerCol: 24
    };
  }, [rightColItems]);

  const renderCol = (colItems: ColItem[]) => {
    return colItems.map((colItem: ColItem, index: number) => {
      const { label, key, field } = colItem;

      return (
        <Row
          key={index}
          id={`${key}Container`}
          gutter={{ xs: 0, sm: 24 }}
          wrap={false}
        >
          <Col flex="184px" className="mt-4 flex items-center">
            <div id={`${key}Label`} className="pt-[0.3rem] text-xs uppercase">
              {label}
            </div>
          </Col>

          <Col flex="auto" className="mt-4">
            <div id={key} className="text-base text-neutral-60">
              <DisplayValue
                field={field}
                value={values[key]}
                values={values}
                dropdownOption={
                  dropdownOptions && (dropdownOptions as any)[key]
                }
                userInfo={userInfo ? userInfo[key] : []}
              />
            </div>
          </Col>
        </Row>
      );
    });
  };

  return (
    <Row className="mt-[-1rem]" gutter={{ xs: 0, sm: 24 }}>
      <Col xs={24} sm={24} lg={colSpan.outerCol}>
        {renderCol(leftColItems)}
      </Col>

      {rightColItems && (
        <Col xs={24} sm={24} lg={12}>
          {renderCol(rightColItems)}
        </Col>
      )}
    </Row>
  );
};
