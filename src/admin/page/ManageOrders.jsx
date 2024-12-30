import { CogIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../services/api";

const ManageOrders = () => {
  const [settings, setSettings] = useState(false);
  const [orders, setOrders] = useState([]);

  const length = orders.map((order) => {
    return order.items.length;
  });
  const total = length.reduce((a, b) => a + b, 0);

  useEffect(() => {
    api
      .get(`/orders`)
      .then((response) => setOrders(response.data))
      .catch((error) => console.log("Failed to fetch orders:", error));
  }, []);

  const handleSettings = (id) => {
    [setSettings((prev) => (prev === id ? null : id))];
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await api.patch(`/orders/${id}`, {
        Status: status,
      });
      console.log("Order updated:", response.data);
      toast.success(" Order status updated successfully", {
        onClose: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="">
      <div>
        <div className="px-2 py-4">
          <h1 className="text-lg font-semibold xl:text-2xl">Manage Orders</h1>
          <p className="text-sm text-gray-600">Total {total} Orders!</p>
        </div>

        <div>
          <table className="table-auto w-full ">
            <thead>
              <tr>
                <th className=" px-2 py-2 text-center hidden xl:block">‎ </th>
                <th className="px-2 py-2 text-center">Name</th>
                <th className="px-2 py-2 text-center">UserId</th>
                <th className="px-2 py-2 text-center">Qnty</th>
                <th className="px-2 py-2 text-center">Totel</th>
                <th className="px-2 py-2 text-center">Status</th>
                <th className="px-2 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.items.map((item) => (
                  <tr key={item.id}>
                    <td className=" px-2 py-2 text-center hidden xl:block">
                      <img
                        className="h-10 xl:h-20"
                        src={item.imageURL}
                        alt=""
                      />
                    </td>
                    <td className="px-2 py-2 text-center">{item.name}</td>
                    <td className="px-2 py-2 text-center">{order.userId}</td>
                    <td className="px-2 py-2 text-center">{item.quantity}</td>
                    <td className="px-2 py-2 text-center">
                      ₹{item.quantity * item.price}.0
                    </td>
                    <td className={`px-2 py-2 text-center text-[8px] xl:text-[10px]`}>
                      <p
                        className={`font-semibold text-white p-1 ${
                          order.Status === "Pending"
                            ? "bg-blue-500"
                            : order.Status === "Shipped"
                            ? "bg-yellow-500"
                            : order.Status === "Delivered"
                            ? "bg-green-500"
                            : ""
                        } rounded-lg `}
                      >
                        {order.Status}
                      </p>
                    </td>
                    <td className=" justify-center px-2 py-2 text-center">
                      <CogIcon
                        className="h-5 w-full"
                        onClick={() => handleSettings(order.id)}
                      />
                      {settings === order.id && (
                        <div className="flex flex-col gap-1 justify-center">
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, "Pending")
                            }
                            className="text-[8px] font-semibold text-black rounded-lg p-1 border-2 border-blue-500"
                          >
                            pending
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, "Shipped")
                            }
                            className="text-[8px] font-semibold text-black rounded-lg p-1 border-2 border-yellow-500"
                          >
                            shipped
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, "Delivered")
                            }
                            className="text-[8px] font-semibold text-black rounded-lg p-1 border-2 border-green-500"
                          >
                            delivered
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
