import type { ReactNode } from "react";
import { Button } from "../Button";

export type ModalSheetFooterProps = {
  okText?: string;
  okButton?: ReactNode;
  okDisabled?: boolean;
  okLoading?: boolean;
  cancelText?: string;
  cancelButton?: ReactNode;
  cancelDisabled?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
};

export const ModalSheetFooter = ({
  cancelButton,
  cancelText,
  cancelDisabled,
  okButton,
  okText,
  okLoading,
  okDisabled,
  onCancel,
  onOk
}: ModalSheetFooterProps) => {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="-ml-12 -mr-12 border-0 border-t border-solid border-neutral-30 bg-white py-4 pl-12 pr-12 shadow-[2px_0_6px_rgba(0,0,0,0.2)]">
        <div className="flex items-center">
          {(okButton || okText) && (
            <div>
              {okButton ||
                (okText && (
                  <Button
                    size="small"
                    loading={okLoading}
                    disabled={okDisabled}
                    onClick={onOk}
                  >
                    {okText}
                  </Button>
                ))}
            </div>
          )}

          {(cancelButton || cancelText) && (
            <div>
              {cancelButton ||
                (cancelText && (
                  <Button
                    className="ml-2"
                    size="small"
                    type="text"
                    disabled={cancelDisabled}
                    onClick={onCancel}
                  >
                    {cancelText}
                  </Button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
