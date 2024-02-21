import { createBrowserRouter } from "react-router-dom";
import First from "../Home/First";
import Login from "../Home/Login";
import Signup from "../Home/Signup";
import Main from "../Main/Main";
import Product from "../Product/Main";
import Layout from "../Components/Layout";
import Default from "../Components/Default";
export const mainRoutes = [
  {
    path: "",
    element: <Default />,
    children: [
      {
        path: "/",
        index: true,
        element: <First />,
      },
      {
        path: "/login",
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        index: true,
        element: <Signup />,
      },
      {
        path: "/main",
        index: true,
        element: <Main />,
      },
      {
        path: "/product",
        index: true,
        element: <Product />,
      },
    ],
    path: "",
    element: <Default />,
    children: [
      {
        path: "/main",
        index: true,
        element: <Main />,
      },
      {
        path: "/product",
        index: true,
        element: <Product />,
      },
    ],
  },
];
const router = createBrowserRouter(mainRoutes);

export default router;
