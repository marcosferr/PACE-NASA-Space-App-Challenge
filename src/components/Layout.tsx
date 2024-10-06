import TourComponent from "./Tour";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <TourComponent />
      <Outlet />
    </>
  );
}

export default Layout;
