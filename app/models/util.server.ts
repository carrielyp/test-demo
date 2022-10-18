// Main Menu
export interface HeaderMenu {
  key: string;
  title: string;
  route?: string;
  count?: number;
}

export const MenuList: HeaderMenu[] = [
  {
    key: "home",
    title: "Home",
    route: "/",
  },
  {
    key: "case",
    title: "Cases",
    route: "/case",
  },
  { key: "client", title: "Clients", route: "/client" },
  // { key: "programme", title: "Programmes", route: "/programme" },
  // { key: "report", title: "Reports", route: "/case" },
];

export async function getMenu() {
  return MenuList;
}

// Brand display
export interface BrandDisplay {
  logo: {
    visible: boolean;
    value: string;
  };
  divisionName: {
    visible: boolean;
    value: string;
  };
}

export const Brand: BrandDisplay = {
  logo: { visible: false, value: "cps" },
  divisionName: { visible: false, value: "Division Name" },
};

export async function getBrand() {
  return Brand;
}
