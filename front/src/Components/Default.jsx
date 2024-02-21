import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <Outlet />
    </>
  );
}
