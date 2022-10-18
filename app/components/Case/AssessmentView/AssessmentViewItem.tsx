import { Col, Row } from "antd/lib/grid";
import { Button, Icon } from "../../../components/common";
import {
  AssessmenSubSectionConfig,
  ValueConfig
} from "../../../constants/config";
import { DropdownOption } from "../../../constants/interface";
import { FormKeys } from "../../../constants/keys";
import { DisplayValue } from "../../DisplayValue";

type AssessmentViewItemProps = {
  id: string;
  title: string;
  config?: AssessmenSubSectionConfig[];
  values: { [key: string]: any };
  dropdownOptions?: Partial<Record<FormKeys, DropdownOption[]>>;
  onClick: (sectionKey: string) => void;
};

export const AssessmentViewItem = ({
  id,
  title,
  config,
  values,
  dropdownOptions,
  onClick
}: AssessmentViewItemProps) => {
  const defaultColSpan = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24
  };

  const handleClick = () => {
    onClick(id);
  };

  const renderValue = (
    config: ValueConfig,
    value: any,
    sectionLabel?: string
  ) => {
    const { label, viewConfig, key } = config;
    const { field, colSpan, options } = viewConfig;

    return (
      <Col key={key} className="mt-4" {...(colSpan || defaultColSpan)}>
        <div id={`${key}Label`} className="mb-2 text-xs uppercase">
          {label || sectionLabel}
        </div>
        <div className="ml-2 mr-2">
          <DisplayValue
            field={field}
            value={value}
            dropdownOption={dropdownOptions && (dropdownOptions as any)[key]}
            options={options}
          />
        </div>
      </Col>
    );
  };

  const renderSection = (section: AssessmenSubSectionConfig) => {
    const { label, key, valueConfig } = section;
    const needSectionLabel = valueConfig.length > 1;

    return (
      <div key={key}>
        {label && needSectionLabel && (
          <div className="mb-4 text-sm font-extrabold leading-5 text-neutral-60">
            {label}
          </div>
        )}
        <div className="mt-[-1rem]">
          <Row gutter={16}>
            {valueConfig.map((item) => {
              const value = values[item.key];

              return renderValue(item, value, label);
            })}
          </Row>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="font-extrabold leading-6">{title}</div>
        <Button
          className="w-9"
          type="text"
          size="small"
          icon={<Icon.Edit className="text-neutral-50" size={16} />}
          onClick={handleClick}
        ></Button>
      </div>
      <div className="space-y-6 border border-solid border-neutral-30 p-2">
        {config && config.map((section) => renderSection(section))}
      </div>
    </div>
  );
};
