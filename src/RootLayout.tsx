import { Outlet } from "react-router-dom";
import { Navbar } from "./Navigation/NavBar";

export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
