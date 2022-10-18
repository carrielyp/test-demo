import type { ColSize } from "antd/lib/grid";
import { Col, Row } from "antd/lib/grid";
import type { ReactNode } from "react";
import { useMemo } from "react";

interface ColItem {
  id?: string;
  className?: string;
  content?: string | ReactNode;
  colSpan?: {
    xs?: number | ColSize;
    sm?: number | ColSize;
    md?: number | ColSize;
    lg?: number | ColSize;
  };
}

interface Props {
  colItems: ColItem[];
}

const defaultColSpan = {
  xs: 24, // 1 in each row  <576
  sm: 12, // 2 in each row  >=576
  md: 12, // 2 in each row >=768
  lg: 8 // 3 in each row >=992
};

export const FormRowDisplay = ({ colItems }: Props) => {
  const finalCols = useMemo(() => {
    const result = [...colItems];

    result.forEach((col) => {
      const { colSpan } = col;

      if (!colSpan) {
        col["colSpan"] = {
          ...defaultColSpan
        };
      }
    });

    return result;
  }, [colItems]);

  return (
    <Row gutter={{ sm: 16, md: 24 }} justify="start">
      {finalCols.map((col, i) => {
        const { colSpan, content, className, id } = col;

        return (
          <Col key={i} className={className} {...colSpan}>
            <div id={id} className={content ? "pt-4" : ""}>
              {content}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
