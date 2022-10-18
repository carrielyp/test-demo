import { Pill, InitialsAvatar, Icon, Email } from "../common";

export type PersonProps = {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  unitFull: string;
  unitShort: string;
  designation: string;
};

export interface PersonTagGroupProps {
  personIds: string[];
  personInfo: PersonProps[];
}

export interface PersonTagProps {
  person: PersonProps;
}

export const PersonTagGroup = ({
  personIds,
  personInfo
}: PersonTagGroupProps) => {
  if (
    !personIds ||
    personIds.length === 0 ||
    !personInfo ||
    personInfo.length === 0
  ) {
    return <>—</>;
  }

  // TODO: to remove once person info is saved in BE
  const personExtraInfo = {
    email: "louie_lui@msf.gov.sg",
    contactNumber: "94161918",
    unitFull: "Child Protection Unit",
    unitShort: "CPS",
    designation: "Child Protection Officer"
  };

  const selectedPersons = personInfo
    .filter((info) => {
      return info.id && personIds.find((id) => id === info.id);
    })
    // TODO: to remove once person info is saved in BE
    .map((info) => ({
      ...personExtraInfo,
      ...info
    }));

  return (
    <div className="flex flex-wrap gap-2">
      {selectedPersons.map((person, i) => (
        <PersonTag person={person as any} key={i} />
      ))}
    </div>
  );
};

export const PersonTag = ({ person }: PersonTagProps) => {
  if (!person) return null;

  const {
    unitShort,
    designation,
    unitFull,
    name,
    email,
    contactNumber: initialContactNumber
  } = person;

  const renderTooltip = () => {
    const contactNumber =
      initialContactNumber.substring(0, 4) +
      " " +
      initialContactNumber.substring(4);

    return (
      <div className="space-y-2 p-4 text-neutral-60">
        <div className="flex items-center">
          <InitialsAvatar name={name} />
          <div className="ml-2 text-left text-base">
            <p className="m-0 font-extrabold">{name}</p>
            <p className="m-0 font-bold">{designation}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Icon.Agency size={14} />
          <span>{unitFull}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <Icon.Mail size={14} />
          <Email clickable>{email}</Email>
        </div>
        <div className="flex items-center gap-x-3">
          <Icon.Phone size={14} />
          <span>{contactNumber}</span>
        </div>
      </div>
    );
  };

  return (
    <Pill
      color="custom"
      className="border-blue-10 bg-blue-10 pr-4"
      tooltip={{
        title: renderTooltip(),
        placement: "bottomLeft",
        arrowless: true,
        overlayClassName: ""
      }}
    >
      <div className="flex items-center">
        <InitialsAvatar name={name} />
        <div className="ml-2 text-left text-neutral-60">
          <p className="m-0">{name}</p>
          <p className="m-0 font-normal">
            {unitShort} - {designation}
          </p>
        </div>
      </div>
    </Pill>
  );
};
