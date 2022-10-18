import type { ChangeEventHandler } from "react";
import { useState } from "react";

import { Button, ButtonProps } from "../Button";
import { TextInput, TextInputProps } from "../TextInput";

export type InputWithButtonProps = {
  textInputProps?: Omit<TextInputProps, "onChange">;
  buttonProps?: Omit<ButtonProps, "onClick">;
  buttonText: string;
  onButtonClick: (value: string) => void;
  onChange?: (value: string) => void;
};

export const InputWithButton = ({
  textInputProps,
  buttonProps,
  buttonText,
  onButtonClick,
  onChange
}: InputWithButtonProps) => {
  const [value, setValue] = useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    setValue(value);
    onChange && onChange(value);
  };

  const handleButtonClick = () => {
    onButtonClick(value);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <TextInput
          className="rounded-none rounded-l-lg"
          {...textInputProps}
          onChange={handleInputChange}
        />
      </div>

      <Button
        className="h-12 rounded-none rounded-r-lg"
        onClick={handleButtonClick}
        {...buttonProps}
      >
        {buttonText}
      </Button>
    </div>
  );
};
