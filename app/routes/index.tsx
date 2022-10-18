import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      index page /template
      <Outlet />
    </div>
  );
}
