import { Notification, NotificationProps } from "./Notification";

export type ModalNotificationProps = NotificationProps & {
  modalClassname?: string;
};

export const ModalNotification = {
  config: Notification.config,

  destroy: Notification.destroy,

  close: Notification.close,

  open: ({ modalClassname, ...restProps }: ModalNotificationProps) => {
    Notification.open({
      getContainer: () =>
        (modalClassname && document.querySelector(modalClassname)) ||
        document.querySelector(".react-modal-sheet-container") ||
        document.querySelector(".modal") ||
        document.body,
      ...restProps
    });
  }
};
