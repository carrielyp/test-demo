import AntdTable, {
  ColumnGroupType,
  ColumnType,
  TableProps as AntdTableProps,
  TablePaginationConfig as AntdTablePaginationConfig
} from "antd/lib/table";
import {
  ColumnsType,
  SorterResult as AntSorterResult,
  TableCurrentDataSource as AntdTableCurrentDataSource,
  FilterValue as AntdFilterValue
} from "antd/lib/table/interface";
import React, { Key, ReactNode } from "react";

export enum SortOrder {
  ASCEND = "ascend",
  DESCEND = "descend"
}

export type SortCol<T extends string> = [T, SortOrder];

export type FilterValue = AntdFilterValue;

export type RecordType = Record<string, any>;

export type TablePaginationConfig = AntdTablePaginationConfig;

export type TableOnChangeExtraProps<T = any> = AntdTableCurrentDataSource<T>;

export type SorterResult<T = any> = AntSorterResult<T>;

export type TableOnChange<T = any> = (
  pagination: TablePaginationConfig,
  filters: Record<string, (Key | boolean)[] | null>,
  sorter: SorterResult<T> | SorterResult<T>[]
) => void;

export type Column<T extends RecordType> = (
  | Omit<ColumnType<T>, "dataIndex" | "render">
  | Omit<ColumnGroupType<T>, "dataIndex" | "render">
) & {
  render?: (record: T, index: number) => ReactNode;
};

export type Columns<T extends RecordType> = Column<T>[];

export interface TableProps<T extends RecordType>
  extends Omit<AntdTableProps<T>, "columns" | "showSorterTooltip"> {
  columns: Columns<T>;
  onRowClick?: (data: T, index?: number) => void;
  striped?: boolean;
}

export const Table = <T extends RecordType>(props: TableProps<T>) => {
  const {
    rowClassName,
    columns,
    pagination,
    onRow,
    onRowClick,
    striped,
    ...restProps
  } = props;

  const antdColumns: ColumnsType<T> = columns.map((column) => ({
    ...column,
    className: `text-sm ${column.className || ""}`,
    render: column.render
      ? (_, record: T, index: number) => column.render?.(record, index)
      : undefined
  }));

  const hoverClassName = rowClassName?.toString().includes("hover:")
    ? ""
    : "hover:bg-neutral-10";
  const cursorClassName = onRowClick ? "cursor-pointer" : "";

  const getStripClassName = (index: number) =>
    index % 2 === 0 ? "hover:bg-blue-10" : "bg-neutral-10 hover:bg-blue-10";

  let rowCn: TableProps<T>["rowClassName"] | undefined;

  if (typeof rowClassName === "function") {
    if (striped) {
      rowCn = (row, index, indent) =>
        `${rowClassName(row, index, indent)} ${getStripClassName(
          index
        )} ${cursorClassName}`;
    } else {
      rowCn = (row, index, indent) =>
        `${rowClassName(row, index, indent)} ${cursorClassName}`;
    }
  } else if (striped) {
    rowCn = (_, index) =>
      `${getStripClassName(index)} ${cursorClassName} ${rowClassName || ""}`;
  } else {
    rowCn = `${hoverClassName} ${cursorClassName} ${rowClassName || ""}`;
  }

  return (
    <AntdTable
      {...restProps}
      data-testid="tableComponent"
      rowClassName={rowCn}
      columns={antdColumns}
      pagination={
        pagination ? { showSizeChanger: false, ...pagination } : false
      }
      onRow={
        onRow
          ? onRow
          : onRowClick
          ? (data, index) => {
              return {
                onClick: (event) => {
                  if (window.getSelection()?.toString().length === 0) {
                    // Make first column (selection) unclickable
                    const target = event.target as Element;

                    if (
                      !target.className.includes("ant-table-selection-column")
                    ) {
                      onRowClick(data, index);
                    }
                  }
                }
              };
            }
          : undefined
      }
      showSorterTooltip={false}
      scroll={{ x: props?.scroll?.x || true }}
    />
  );
};

Table.defaultProps = {
  striped: false
};

// Util functions

export const sorterColumnProps = (defaultSortOrder?: SortOrder) => ({
  sorter: true,
  sortDirections: [SortOrder.ASCEND, SortOrder.DESCEND, SortOrder.ASCEND],
  defaultSortOrder
});
