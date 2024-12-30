import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <div className="relative flex h-screen">
        <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden z-30">
          {isOpen ? (
            <MenuIcon className="absolute top-2 left-2 z-10 bg-[#06141B] text-[#9BA8AB] h-8 w-8 p-1 rounded-md" />
          ) : (
            <XIcon className="absolute top-2 left-2 z-10 bg-[#06141B] text-[#9BA8AB] h-8 w-8 p-1 rounded-md" />
          )}
        </button>
        <AdminSidebar isOpen={isOpen} />
        <div className={` flex-1 h-screen overflow-y-auto xl:ml-[300px]`}>
          <AdminNavbar isOpen={isOpen}/>
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
