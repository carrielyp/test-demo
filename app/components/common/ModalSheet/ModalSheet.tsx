import type { HTMLAttributes, ReactNode, RefAttributes } from "react";
import { useEffect } from "react";
import Sheet from "react-modal-sheet";
import { FocusScope } from "@react-aria/focus";

import { Icon, Mask } from "..";
import { Color } from "../../../constants/design-system";
import { ModalSheetFooter } from "./ModalSheetFooter";

export type ModalSheetProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> &
  RefAttributes<any> & {
    children: ReactNode;
    visible: boolean;
    closeButton?: boolean;
    snapPoints?: number[];
    initialSnap?: number;
    title?: ReactNode;
    okText?: string;
    okButton?: ReactNode;
    okDisabled?: boolean;
    okLoading?: boolean;
    cancelText?: string;
    cancelButton?: ReactNode;
    cancelDisabled?: boolean;
    footer?: ReactNode;
    pushFooterToBottom?: boolean;
    disabled?: boolean;
    closable?: boolean;
    autoFocus?: boolean;
    onCancel?: () => void;
    onClose?: () => void;
    onOpenStart?: () => void;
    onOpenEnd?: () => void;
    onCloseStart?: () => void;
    onCloseEnd?: () => void;
    onOk?: () => void;
    onSnap?: (index: number) => void;
  };

export const ModalSheet = ({
  children,
  visible,
  title,
  cancelButton,
  cancelText,
  cancelDisabled,
  okButton,
  okText,
  okLoading,
  okDisabled,
  disabled,
  closable,
  footer,
  pushFooterToBottom,
  autoFocus,
  onClose,
  onCancel,
  onOk,
  ...props
}: ModalSheetProps) => {
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    document.body.style.pointerEvents = visible ? "none" : "";

    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [visible]);

  const customfooter = (
    <ModalSheetFooter
      cancelButton={cancelButton}
      cancelText={cancelText}
      cancelDisabled={cancelDisabled}
      okButton={okButton}
      okText={okText}
      okLoading={okLoading}
      okDisabled={okDisabled}
      onCancel={onCancel}
      onOk={onOk}
    />
  );

  return (
    <Sheet
      className="react-modal-sheet"
      disableDrag
      isOpen={visible}
      onClose={onClose as any}
      {...props}
    >
      <FocusScope contain restoreFocus autoFocus={autoFocus}>
        <Sheet.Backdrop style={{ backgroundColor: Color.BLACK_NEUTRAL_60 }} />

        <Sheet.Container>
          {closable && !disabled && (
            <Sheet.Header>
              <div className="relative -top-[36px] float-right mr-2 flex w-6 cursor-pointer items-center">
                <Icon.CrossCircle size={24} fill="white" onClick={onClose} />
              </div>
            </Sheet.Header>
          )}

          <Sheet.Content>
            <Mask enabled={!!disabled} containerClassName="h-full">
              <div
                className="flex h-full flex-col px-12 pb-6"
                style={{ paddingTop: closable && !disabled ? 0 : 34 }}
              >
                <div
                  className={pushFooterToBottom ? "flex flex-1 flex-col" : ""}
                >
                  <h1 className="mb-6 mt-12 text-2xl font-extrabold">
                    {title}
                  </h1>
                  <div
                    className={`mb-24 max-w-modal-max ${
                      pushFooterToBottom ? "flex flex-1 flex-col" : ""
                    }`}
                  >
                    {children}
                  </div>
                </div>
                {footer
                  ? footer
                  : (cancelButton || cancelText || okButton || okText) &&
                    customfooter}
              </div>
            </Mask>
          </Sheet.Content>
        </Sheet.Container>
      </FocusScope>
    </Sheet>
  );
};

ModalSheet.defaultProps = {
  snapPoints: [-64]
};
