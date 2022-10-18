import { Col, Row } from "antd/lib/grid";
import type { ReactNode } from "react";
import { useState } from "react";
import { assessmentConfig } from "../../../constants/config";
import { ResponsiveSize } from "../../../constants/design-system";
import { DropdownOption } from "../../../constants/interface";
import { FormKeys } from "../../../constants/keys";
import { useWindowSize } from "../../../hooks/getWindowSize";
import { useLayoutEffect } from "../../../hooks/useLayoutEffect";
import { AssessmentViewItem } from "./AssessmentViewItem";

type AssessmentViewProps = {
  values: { [key: string]: { [key: string]: any } };
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  onClick: (sectionKey: string) => void;
};

export const AssessmentView = ({
  values,
  dropdownOptions,
  onClick
}: AssessmentViewProps) => {
  const { responsiveSize } = useWindowSize();
  const [isDoubleRow, setIsDoubleRow] = useState(true);

  useLayoutEffect(() => {
    if (responsiveSize === undefined || responsiveSize < ResponsiveSize.LG) {
      setIsDoubleRow(false);
    } else {
      setIsDoubleRow(true);
    }
  }, [responsiveSize]);

  const renderCols = () => {
    const leftCol: ReactNode[] = [];
    const rightCol: ReactNode[] = [];

    assessmentConfig.forEach((currentSection, index) => {
      const { key, ...restProps } = currentSection;
      const currValues = values[key];

      if (currValues && Object.keys(currValues).length > 0) {
        if ((index + 1) % 2 === 0 && isDoubleRow) {
          rightCol.push(
            <AssessmentViewItem
              {...restProps}
              key={index}
              id={key}
              values={currValues}
              onClick={onClick}
              dropdownOptions={dropdownOptions}
            />
          );
        } else {
          leftCol.push(
            <AssessmentViewItem
              {...restProps}
              key={index}
              id={key}
              values={currValues}
              onClick={onClick}
              dropdownOptions={dropdownOptions}
            />
          );
        }
      }
    });

    return (
      <>
        {leftCol.length > 0 && (
          <Col xs={24} sm={24} md={24} lg={12}>
            <div className="space-y-4">{leftCol}</div>
          </Col>
        )}
        {rightCol.length > 0 && (
          <Col xs={24} sm={24} md={24} lg={12}>
            <div className="space-y-4">{rightCol}</div>
          </Col>
        )}
      </>
    );
  };

  return <Row gutter={8}>{renderCols()}</Row>;
};
