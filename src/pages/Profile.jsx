import { faBoxOpen, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useCart } from "../hooks/useCart";

const Profile = () => {
  const [userdata, setUserdata] = useState({});
  const [orders, setOrders] = useState([]);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
    setUserdata(storedUser);
  }, []);

  useEffect(() => {
    if (userdata) {
      api
        .get(`/orders`)
        .then((response) => {
          const userOrders = response.data.filter(
            (order) => Number(order.userId) === Number(userdata.id)
          );
          setOrders(userOrders);
        })
        .catch((error) => console.log("Failed to fetch orders:", error));
    }
  }, [userdata]);

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
    <div className="xl:grid xl:grid-cols-3 flex flex-col gap-4 p-6 bg-slate-200/65 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Welcome {userdata.name} !</h1>
            <p className="text-[12px] text-gray-500">{userdata.role}</p>
            <p className="text-[14px] font-light text-gray-600">
              Email: {userdata.email}
            </p>
            <p className="text-[14px] font-light text-gray-600">
              Password: {userdata.password}
            </p>
          </div>
          <PencilSquareIcon className="h-6 text-gray-600" />
        </div>
        <div className="flex xl:flex-1 justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">address</h1>
            <p className="text-[15px] font-light text-gray-600">
              update your address
            </p>
          </div>
          <PencilSquareIcon className="h-5 text-gray-600" />
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="text-white bg-black w-full p-3 rounded-lg"
          >
            logout
          </button>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md xl:h-[80vh] xl:overflow-y-scroll">
        <div className="flex justify-between items-center border-b-2 p-2">
          <h1>Your Orders</h1>
          <FontAwesomeIcon className="h-10" icon={faBoxOpen} />
        </div>
        <table className="min-w-full font-Poppins mt-4 ">
          <tr>
            <th className=""></th>
            <th className="text-center">Product</th>
            <th className="text-center">Status</th>
            <th className="text-center">qty</th>
            <th className="text-center">price</th>
          </tr>
          {orders.map((order) =>
            order.items.map((item) => (
              <tr key={item.id}>
                <td className="">
                  <img className="h-10" src={item.imageURL} alt="" />
                </td>
                <td className="text-[12px] text-gray-700 p-2 text-center">
                  {item.name}
                </td>
                <td
                  className={`text-[12px] ${
                    order.Status === "Pending"
                      ? "text-blue-500"
                      : order.Status === "Shipped"
                      ? "text-yellow-500"
                      : order.Status === "Delivered"
                      ? "text-green-500"
                      : ""
                  } p-2 text-center`}
                >
                  {order.Status}
                </td>
                <td className="text-[12px] text-gray-700 p-2 text-center">
                  {item.quantity}
                </td>
                <td className="text-[12px] text-gray-700 p-2 text-center">
                  ₹ {item.price}
                </td>
              </tr>
            ))
          )}
        </table>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md xl:h-[80vh] xl:overflow-y-scroll">
        <div className="flex justify-between items-center border-b-2 p-2">
          <h1>Your Cart</h1>
          <FontAwesomeIcon icon={faCartShopping} className="h-10" />
        </div>
        <table className="min-w-full font-Poppins mt-4">
          <tr>
            <th className=""></th>
            <th className="text-center">Product</th>
            <th className="text-center">Qty</th>
          </tr>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img className="h-10" src={item.imageURL} alt="" />
              </td>
              <td className="text-[12px] text-gray-700 p-2 text-center">
                {item.name}
              </td>
              <td className="text-[12px] text-gray-700 p-2 text-center">
                {item.quantity}
              </td>
            </tr>
          ))}
        </table>
      </div>
      {/* <div className="flex justify-between p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">address</h1>
          <p className="text-[15px] font-light text-gray-600">
            update your address
          </p>
        </div>
        <PencilSquareIcon className="h-5 text-gray-600" />
      </div> */}
      {/* <div>
        <button
          onClick={handleLogout}
          className="text-white bg-black w-full p-3 rounded-lg"
        >
          logout
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
