import { Row, Col } from "antd";
import { useState } from "react";
import { ResponsiveSize } from "../../../constants/design-system";
import { COMMON_ADD } from "../../../constants/displayLabels";
import { useWindowSize } from "../../../hooks/getWindowSize";
import { useLayoutEffect } from "../../../hooks/useLayoutEffect";
import { Collapsible, Card, Icon } from "../../common";

export type AssessmentButtonProps = {
  id: string;
  title: string;
  onClick?: () => void;
};

export type AssessmentButtonGroupProps = {
  buttons: AssessmentButtonProps[];
};

export type AssessmentButtonGroupWithCollapsibleProps = {
  buttons: AssessmentButtonProps[];
  isExpanded: boolean;
  isShowAll: boolean;
};

export const AssessmentButtonGroupWithCollapsible = ({
  buttons,
  isExpanded,
  isShowAll
}: AssessmentButtonGroupWithCollapsibleProps) => {
  const { responsiveSize } = useWindowSize();
  const [firstRowCount, setFirstRowCount] = useState(buttons.length);

  useLayoutEffect(() => {
    if (isShowAll) {
      setFirstRowCount(buttons.length);

      return;
    }

    if (responsiveSize === undefined || responsiveSize <= ResponsiveSize.SM) {
      setFirstRowCount(2);
    } else if (responsiveSize <= ResponsiveSize.MD) {
      setFirstRowCount(3);
    } else {
      setFirstRowCount(4);
    }
  }, [responsiveSize, isShowAll, buttons]);

  return (
    <>
      <AssessmentButtonGroup buttons={buttons.slice(0, firstRowCount)} />
      <Collapsible expanded={isExpanded}>
        <AssessmentButtonGroup buttons={buttons.slice(firstRowCount)} />
      </Collapsible>
    </>
  );
};

export const AssessmentButtonGroup = ({
  buttons
}: AssessmentButtonGroupProps) => {
  return (
    <Row gutter={16}>
      {buttons.map((props, i) => {
        return (
          <Col key={i} xs={12} sm={12} md={8} lg={6} className="mt-4">
            <AssessmentButton {...props} />
          </Col>
        );
      })}
    </Row>
  );
};

export const AssessmentButton = (props: AssessmentButtonProps) => {
  const { id, title, onClick } = props;

  return (
    <Card id={id} className="flex h-20 items-center p-4" onClick={onClick}>
      <h4 className="mb-0 text-sm">{title}</h4>

      <div className="ml-auto flex items-center text-blue-40">
        <div className="order-start mx-2 flex justify-center text-sm">
          <Icon.Plus />
        </div>
        <span className="font-bold">{COMMON_ADD}</span>
      </div>
    </Card>
  );
};
