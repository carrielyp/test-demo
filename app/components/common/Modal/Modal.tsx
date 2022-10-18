import type { ModalProps as AntdModalProps } from "antd/lib/modal";
import AntdModal from "antd/lib/modal";
import type { ReactNode } from "react";
import { useResponsiveContext } from "../../../hooks/useResponsiveContext";
import { Button } from "../Button";
import { H1 } from "../Heading";
import { Mask } from "../Mask";

export type ModalProps = AntdModalProps & {
  largeTitle?: boolean;
  okLoading?: boolean;
  okDisabled?: boolean;
  cancelDisabled?: boolean;
  okButton?: ReactNode;
  cancelButton?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
};

export const Modal = (props: ModalProps) => {
  const {
    className,
    cancelButton,
    cancelText,
    cancelDisabled,
    onCancel,
    okButton,
    okText,
    okLoading,
    okDisabled,
    onOk,
    largeTitle,
    width,
    footer,
    disabled,
    closable,
    keyboard,
    maskClosable,
    children
  } = props;
  let { title } = props;

  const { sm } = useResponsiveContext();

  const customFooter = (
    <div className="-mt-4 -ml-4 flex flex-wrap items-center justify-end">
      {(!!cancelButton || !!cancelText) && (
        <div className="mt-4 ml-4">
          {cancelButton ||
            (cancelText && (
              <Button
                type="secondary"
                disabled={cancelDisabled}
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            ))}
        </div>
      )}
      {(!!okButton || !!okText) && (
        <div className="mt-4 ml-4">
          {okButton ||
            (okText && (
              <Button loading={okLoading} disabled={okDisabled} onClick={onOk}>
                {okText}
              </Button>
            ))}
        </div>
      )}
    </div>
  );

  const mobileCustomFooter = (
    <div className="flex items-center space-x-4">
      {cancelButton ||
        (cancelText && (
          <Button
            className="flex-1"
            type="secondary"
            disabled={cancelDisabled}
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        ))}
      {okButton ||
        (okText && (
          <Button
            className="flex-1"
            loading={okLoading}
            disabled={okDisabled}
            onClick={onOk}
          >
            {okText}
          </Button>
        ))}
    </div>
  );

  if (largeTitle) {
    title = <H1>{title}</H1>;
  }

  return (
    <AntdModal
      {...props}
      className={`modal ${sm ? "sm" : ""} ${className || ""}`}
      closable={closable && !disabled}
      keyboard={keyboard !== null ? keyboard : closable && !disabled}
      maskClosable={maskClosable && !disabled}
      title={title}
      width={width ? width : 600}
      onCancel={onCancel}
      footer={
        <Mask enabled={!!disabled}>
          {footer ?? (sm ? mobileCustomFooter : customFooter)}
        </Mask>
      }
    >
      <Mask enabled={!!disabled}>{children}</Mask>
      {(largeTitle || sm) && !!children && <div className="mb-4" />}
    </AntdModal>
  );
};

Modal.defaultProps = {
  centered: true,
  maskClosable: false,
  closable: true
};
