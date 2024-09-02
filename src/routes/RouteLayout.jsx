import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";

function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet /> {/* PLace holders for child elements to render */}
    </>
  );
}

export default RootLayout;
