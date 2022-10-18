import Typography from "antd/lib/typography";
import { useEffect, useState } from "react";
import { AddClientTablePageSize } from "../../../constants";
import {
  Button,
  Icon,
  sorterColumnProps,
  Table,
  SortOrder,
  TablePaginationConfig,
  TableOnChangeExtraProps,
  SorterResult,
  RecordType,
  FilterValue
} from "../../common";
import {
  ACTION,
  ADDRESS,
  COMMON_ADD,
  CONTACT_NO,
  DATE_OF_BIRTH,
  ID_NO,
  NAME,
  SEX
} from "../../../constants/displayLabels";
import { DropdownOption, ViewTypes } from "../../../constants/interface";
import { DisplayValue } from "../../DisplayValue";
import { Color } from "../../../constants/design-system";
import { ProfileFormKeys } from "../../../constants/keys";
import { MaskIdentityNumber } from "../../common/MaskIdentityNumber";

export type AddClientTableData = {
  id: string;
  [ProfileFormKeys.NAME]: string;
  [ProfileFormKeys.IDENTITY_NUMBER]: string;
  [ProfileFormKeys.DATE_OF_BIRTH]: string;
  [ProfileFormKeys.SEX]: string;
  [ProfileFormKeys.CONTACT_NO]: string;
  [ProfileFormKeys.ADDRESS]: string;
};

type AddClientTableCurrentData = AddClientTableData & {
  key: string;
};

export type AddClientTableActionParams = {
  sortBy: ProfileFormKeys;
  sortOrder: SortOrder;
  pageNo: number;
  pageSize: number;
};

export type AddClientTableMetaData = AddClientTableActionParams & {
  total: number;
};

export type AddClientTableProps = {
  dataSource: AddClientTableData[];
  metaData?: AddClientTableMetaData;
  dropdownOptions?: { [key: string]: DropdownOption[] };
  onAddClient: (id: string) => void;
  onTableAction: (params: AddClientTableActionParams) => void;
};

export const AddClientTable = ({
  dataSource,
  metaData,
  dropdownOptions,
  onAddClient,
  onTableAction
}: AddClientTableProps) => {
  const [sortedInfo, setSortedInfo] = useState<
    Omit<SorterResult<RecordType>, "field" | "column">
  >({
    order: SortOrder.ASCEND,
    columnKey: ProfileFormKeys.NAME
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRecords, setNumberOfRecords] = useState(1);

  const columnWidthWithLongText = "234px";
  const columnWidthWithShortText = "150px";

  const nameColumnClassname = "add-client-table-column-name";

  useEffect(() => {
    if (metaData) {
      // scroll to name column when table changes
      document
        .querySelector(`.${nameColumnClassname}`)
        ?.scrollIntoView({ block: "nearest", inline: "center" });

      const { sortBy, sortOrder, pageNo, total } = metaData;

      setSortedInfo({
        order: sortOrder,
        columnKey: sortBy
      });
      setCurrentPage(pageNo + 1);
      setNumberOfRecords(total);
    }
  }, [metaData, dataSource]);

  const handleAddClientClicked = (record: AddClientTableCurrentData) => {
    onAddClient(record.id);
  };

  const handleTableOnChange = function <T>(
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<any>[],
    extra: TableOnChangeExtraProps<T>
  ) {
    const newPage = pagination.current || 1;
    const newSort = Array.isArray(sorter) ? sorter[0] : sorter;
    const { action } = extra;

    onTableAction({
      sortBy: (newSort.columnKey || ProfileFormKeys.NAME) as ProfileFormKeys,
      sortOrder: (newSort.order || SortOrder.ASCEND) as SortOrder,
      pageNo: action === "sort" ? 0 : newPage - 1, // BE page starts from 0
      pageSize: AddClientTablePageSize
    });
  };

  const getSortOrder = (currentKey: ProfileFormKeys) => {
    return sortedInfo.columnKey === currentKey ? sortedInfo.order : null;
  };

  const renderElipsisData = (value: string) => {
    return (
      <Typography.Paragraph
        className="max-w-[234px] break-words"
        ellipsis={{
          rows: 2,
          tooltip: {
            title: (
              <div className="px-3 py-2 text-sm text-neutral-60">{value}</div>
            ),
            color: Color.WHITE,
            getPopupContainer: () =>
              document.querySelector(".react-modal-sheet-content") ||
              document.body
          }
        }}
      >
        <DisplayValue field={ViewTypes.TEXT} value={value} />
      </Typography.Paragraph>
    );
  };

  return (
    <Table
      className="add-client-table"
      size="small"
      dataSource={dataSource.map((data) => ({ ...data, key: data.id }))}
      pagination={{
        current: currentPage,
        total: numberOfRecords,
        defaultPageSize: AddClientTablePageSize,
        size: "default"
      }}
      columns={[
        {
          title: NAME,
          key: ProfileFormKeys.NAME,
          className: nameColumnClassname,
          width: columnWidthWithLongText,
          render: ({ name }) => renderElipsisData(name),
          ...sorterColumnProps(),
          sortOrder: getSortOrder(ProfileFormKeys.NAME)
        },
        {
          title: ID_NO,
          key: ProfileFormKeys.IDENTITY_NUMBER,
          width: columnWidthWithLongText,
          render: ({ identityNumber }) => (
            <MaskIdentityNumber
              identificationNum={identityNumber}
              renderUnmasked={renderElipsisData}
            />
          ),
          ...sorterColumnProps(),
          sortOrder: getSortOrder(ProfileFormKeys.IDENTITY_NUMBER)
        },
        {
          title: DATE_OF_BIRTH,
          key: ProfileFormKeys.DATE_OF_BIRTH,
          width: columnWidthWithShortText,
          render: ({ dateOfBirth }) => (
            <DisplayValue field={ViewTypes.DATE} value={dateOfBirth} />
          ),
          ...sorterColumnProps(),
          sortOrder: getSortOrder(ProfileFormKeys.DATE_OF_BIRTH)
        },
        {
          title: SEX,
          key: ProfileFormKeys.SEX,
          width: columnWidthWithShortText,
          render: ({ gender }) => (
            <DisplayValue
              field={ViewTypes.SELECT_FROM_OPTIONS}
              value={gender}
              dropdownOption={(dropdownOptions && dropdownOptions.gender) || []}
            />
          ),
          ...sorterColumnProps(),
          sortOrder: getSortOrder(ProfileFormKeys.SEX)
        },
        {
          title: CONTACT_NO,
          key: ProfileFormKeys.CONTACT_NO,
          width: columnWidthWithLongText,
          render: ({ contactNumber }) => renderElipsisData(contactNumber)
        },
        {
          title: ADDRESS,
          key: ProfileFormKeys.ADDRESS,
          width: columnWidthWithLongText,
          render: ({ address }) => renderElipsisData(address)
        },
        {
          title: ACTION,
          key: "action",
          width: "105px",
          className: "actionColumn",
          render: (record: AddClientTableCurrentData) => {
            return (
              <Button
                size="small"
                icon={<Icon.Plus />}
                onClick={() => handleAddClientClicked(record)}
              >
                {COMMON_ADD}
              </Button>
            );
          }
        }
      ]}
      onChange={handleTableOnChange}
    />
  );
};
