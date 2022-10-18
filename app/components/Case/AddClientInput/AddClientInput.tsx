import { useState } from "react";
import { COMMON_SEARCH } from "../../../constants/displayLabels";
import { INPUT_GENERAL_MAX_LENGTH } from "../../../constants/maxLength";
import { addClientSearchValidator } from "../../../utils/validationUtils";
import { InputWithButton, Icon } from "../../common";

export type AddClientInputProps = {
  loading: boolean;
  onSearch: (value: string) => void;
};

export const AddClientInput = ({ loading, onSearch }: AddClientInputProps) => {
  const [error, setError] = useState("");

  const handleInputChange = (value: string) => {
    if (error) {
      setError(addClientSearchValidator(value));
    }
  };

  const handleSearch = (value: string) => {
    const error = addClientSearchValidator(value);

    if (error) {
      setError(error);

      return;
    }

    onSearch(value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputWithButton
        textInputProps={{
          maxLength: INPUT_GENERAL_MAX_LENGTH,
          error,
          disabled: loading,
          prefix: (
            <Icon.Search
              className={`${loading ? "" : "text-primary"} -mt-0.5`}
              size={16}
            />
          )
        }}
        buttonProps={{ disabled: loading, htmlType: "submit" }}
        buttonText={COMMON_SEARCH}
        onChange={handleInputChange}
        onButtonClick={handleSearch}
      ></InputWithButton>
    </form>
  );
};
