import AntdLayout from "antd/lib/layout";
import { Content as AntdContent } from "antd/lib/layout/layout";
import type { FC, ReactNode } from "react";
import type { HeaderBrand, HeaderMenuProps } from "..";
import { Spin, Footer, Header, SgdsMasthead } from "..";
import {
  FOOTER_REPORT_VULNERABILITY,
  FOOTER_PRIVACY_POLICY,
  FOOTER_TERMS_OF_USE,
  FOOTER_SUPPORT
} from "../../../constants/displayMsgs";
import {
  msfReportVulnerability,
  msfPrivacyPolicy,
  msfTermsOfUse
} from "../../../constants/routes/external-routes";
import { usePagePadding } from "../../../hooks/usePagePadding";
import { SSNETCPSLogo } from "./images/SSNETCPSLogo";

interface Props {
  headerId?: string;
  activeMenu?: string;
  mainMenu?: HeaderMenuProps[];
  brand?: HeaderBrand;
  loading?: boolean;
  children?: ReactNode;
}

const header: HeaderMenuProps[] = [
  { key: "home", title: "Home" },
  { key: "case", title: "Cases" },
  { key: "client", title: "Clients" },
  { key: "programme", title: "Programmes" },
  { key: "report", title: "Reports" }
];

const settingsMenu: HeaderMenuProps[] = [{ key: "settins", title: "settings" }];

const user = {
  name: "officer name"
};

export const branding: any = {
  logo: { visible: true, value: "cps" },
  divisionName: { visible: false, value: "Division Name" }
};

export const Layout: FC<Props> = ({
  headerId = "sgdsMastHeader",
  activeMenu = "home",
  mainMenu = header,
  brand = branding,
  children,
  loading
}) => {
  const { px, pt, pb } = usePagePadding();

  const getBrand = (brand: HeaderBrand) => {
    const { logo } = brand;

    let brandlogo;

    switch (logo?.value) {
      case "cps":
        brandlogo = <SSNETCPSLogo />;
    }

    return {
      ...brand,
      logo: {
        ...logo,
        value: brandlogo
      }
    };
  };

  return (
    <AntdLayout className="min-h-full bg-neutral-25">
      <div id={headerId} className="sticky top-0 z-50">
        {/* <SgdsMasthead /> */}
        <Header
          brand={getBrand(brand)}
          mainMenu={mainMenu}
          activeMenu={activeMenu}
          settingsMenu={settingsMenu}
          user={user}
        />
      </div>

      <AntdContent
        className="pb-46 my-0 mx-auto mb-auto w-full max-w-[1200px]"
        style={{
          paddingLeft: px,
          paddingRight: px,
          paddingTop: pt,
          paddingBottom: pb
        }}
      >
        {loading && <Spin size="large" center />}
        <div className={loading ? "hidden" : ""}>{children}</div>
      </AntdContent>

      <Footer
        left={[
          {
            title: FOOTER_REPORT_VULNERABILITY,
            href: msfReportVulnerability,
            newTab: true
          },
          {
            title: FOOTER_PRIVACY_POLICY,
            href: msfPrivacyPolicy,
            newTab: true
          },
          {
            title: FOOTER_TERMS_OF_USE,
            href: msfTermsOfUse,
            newTab: true
          }
        ]}
        right={[{ title: FOOTER_SUPPORT, href: "", newTab: true }]}
      />
    </AntdLayout>
  );
};
