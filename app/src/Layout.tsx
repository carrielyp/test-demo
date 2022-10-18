import * as React from "react";
import { Outlet } from "@remix-run/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      hello
      <Outlet />
    </div>
  );
}
