import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully", {
      onClose: () => {
        navigate("/");
        window.location.reload();
      },
    });
  };

  return (
    <div
      className={` absolute z-20 h-screen sidebar p-6 transition-all duration-1000 ease-in-out bg-[#CCD0CF] w-[300px] flex flex-col justify-between ${
        isOpen ? "translate-x-[-300px]" : "translate-x-0"
      } xl:translate-x-0`}
    >
      <div className="sidebar-header">
        <h1 className="text-center font-bold text-[#11212D] text-2xl mt-4">
          BARCODE
        </h1>
      </div>
      <div className="sidebar-body flex flex-col gap-4 ">
        <button
          onClick={() => {
            navigate("/admin");
            window.location.reload();
          }}
          className="p-2 font-semibold text-[#4A5C6A]"
        >
          DashBoard
        </button>
        <button
          onClick={() => {
            navigate("/admin/users");
            window.location.reload();
          }}
          className="p-2 font-semibold text-[#4A5C6A]"
        >
          Customers
        </button>
        <button
          onClick={() => {
            navigate("/admin/products");
            window.location.reload();
          }}
          className="p-2 font-semibold text-[#4A5C6A]"
        >
          Products
        </button>
        <button
          onClick={() => {
            navigate("/admin/orders");
            window.location.reload();
          }}
          className="p-2 font-semibold text-[#4A5C6A]"
        >
          Orders
        </button>
      </div>
      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="w-full bg-[#11212D] text-[#CCD0CF] p-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;