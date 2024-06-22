import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Common/Header";
import ComponentFooter from "./Common/ComponentFooter";

export default function SandwichLayout() {
  return (
    <>
      <Header />
      <Outlet/>
    </>
  );
}
