import type {
  BreadcrumbProps as AntdBreadcrumbProps,
  BreadcrumbItemProps as AntdBreadcrumbItemProps
} from "antd/lib/breadcrumb";
import AntdBreadcrumb from "antd/lib/breadcrumb";
import type { ReactNode } from "react";
import { Icon } from "..";

export type BreadcrumbProps = Omit<AntdBreadcrumbProps, "separator">;

export type BreadcrumbItemProps = AntdBreadcrumbItemProps & {
  children: ReactNode;
};

export const Breadcrumb = (props: BreadcrumbProps) => (
  <AntdBreadcrumb
    {...props}
    separator={<Icon.ArrowRight size={12} className="mb-0.5" />}
  />
);

export const BreadcrumbItem = AntdBreadcrumb.Item;
