import { caseViewClientDetailsCardConfig } from "../../../constants/config/clientConfig";
import {
  ADD_PLACEMENT,
  BASIC_INFORMATION,
  REMOVE_FROM_CASE,
  VIEW_FULL_PROFILE
} from "../../../constants/displayLabels";
import { DropdownOption } from "../../../constants/interface";
import { ClientSchema } from "../../../constants/keys";
import {
  Collapse,
  CollapsePanel,
  Dropdown,
  H3,
  Icon,
  MaskIdentityNumber,
  SimpleMenu
} from "../../common";
import { DoubleRowDisplay } from "../../DoubleRowDisplay";

export interface ClientViewListProps {
  clientData: ClientSchema[];
  dropdownOptions: { [key: string]: DropdownOption[] };
  newClientId?: string;
}

export const ClientViewList = ({
  clientData,
  dropdownOptions,
  newClientId
}: ClientViewListProps) => {
  const menuActions = [
    {
      title: VIEW_FULL_PROFILE
    },
    {
      title: ADD_PLACEMENT
    },
    {
      title: REMOVE_FROM_CASE,
      labelClassName: "text-red-50"
    }
  ];

  return (
    <Collapse
      accordion={false}
      className="client-view-list-collapsible"
      expandIcon={({ isActive }) => (
        <>
          {isActive ? (
            <Icon.CaretsUp className="mr-4 cursor-pointer" />
          ) : (
            <Icon.CaretsDown className="mr-4 cursor-pointer" />
          )}
        </>
      )}
    >
      {clientData.map((client: ClientSchema) => {
        const { id, person } = client;

        return (
          <CollapsePanel
            key={id}
            className={`hover:bg-neutral-10 ${
              id === newClientId ? "bg-green-10" : "bg-blue-10"
            }`}
            collapsible="header"
            header={
              <div>
                <div className="font-extrabold">{person.name}</div>
                <MaskIdentityNumber
                  masked
                  identificationNum={person.identityNumber}
                />
              </div>
            }
            extra={
              <Dropdown
                overlay={
                  <SimpleMenu className="min-w-[190px]" menu={menuActions} />
                }
                placement="bottomRight"
                trigger={["click"]}
              >
                <div className="flex h-9 w-9 cursor-pointer items-center justify-center">
                  <Icon.EllipsisV
                    size={20}
                    className="cursor-pointer text-neutral-50"
                  />
                </div>
              </Dropdown>
            }
          >
            <H3 className="mb-4">{BASIC_INFORMATION}</H3>
            <DoubleRowDisplay
              values={person}
              cols={caseViewClientDetailsCardConfig}
              dropdownOptions={dropdownOptions}
            />
          </CollapsePanel>
        );
      })}
    </Collapse>
  );
};
