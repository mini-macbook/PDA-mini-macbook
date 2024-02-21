import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Common/Header";
import { useLocation } from "react-router-dom";
import { Navbar } from "flowbite-react";

export default function Layout() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
