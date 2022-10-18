import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import { HeaderMenuProps, HeaderBrand, Layout } from "../components/common";
import { getBrand, getMenu, HeaderMenu } from "../models/util.server";

export const loader: LoaderFunction = async () => {
  const menu: HeaderMenuProps[] = await getMenu();
  const brand: HeaderBrand = await getBrand();

  return { menu, brand };
};

export default function CreateCase() {
  const { menu, brand } = useLoaderData();
  const navigate = useNavigate();

  const massagedMenu = useMemo(() => {
    return menu.map((item: HeaderMenu) => {
      const { route, ...rest } = item;

      return {
        ...rest,
        onClick: () => {
          route && navigate(route);
        },
      };
    });
  }, [menu, navigate]);

  return (
    <Layout activeMenu="client" mainMenu={massagedMenu} brand={brand}>
      <Outlet />
    </Layout>
  );
}
