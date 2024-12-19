import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  const noFooterPages = ["/cart", "/checkout", "/view/:id", "/products/All"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 md:px-6 content mt-[60px] ">
        <Outlet />
      </main>
      {!noFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
