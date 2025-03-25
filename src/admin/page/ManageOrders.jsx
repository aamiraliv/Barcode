import { CogIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllOrders,
  updateDeliveryStatus,
} from "../../state/orderSlice/orderSlice";

const ManageOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [settings, setSettings] = useState(false);

  const length = orders.map((order) => {
    return order.orderItems.length;
  });
  const total = length.reduce((a, b) => a + b, 0);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleSettings = (id) => {
    [setSettings((prev) => (prev === id ? null : id))];
  };

  const handleStatusChange = async (ordrId, prodId, stus) => {
    try {
      dispatch(
        updateDeliveryStatus({
          orderId: ordrId,
          productId: prodId,
          status: stus,
        })
      );

      toast.success(" Order status updated successfully", {
        position: "top-center",
        style: {
          fontSize: "12px",
          padding: "6px 12px",
          background: "white",
          color: "green",
          border: "1px solid green",
        },
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
                order.orderItems.map((item) => (
                  <tr key={item.productId}>
                    <td className=" px-2 py-2 text-center hidden xl:block">
                      <img
                        className="h-10 xl:h-20"
                        src={item.productResponse.image_url}
                        alt=""
                      />
                    </td>
                    <td className="px-2 py-2 text-center">
                      {item.productResponse.name}
                    </td>
                    <td className="px-2 py-2 text-center">{order.userId}</td>
                    <td className="px-2 py-2 text-center">{item.quantity}</td>
                    <td className="px-2 py-2 text-center">
                      ₹{item.quantity * item.productResponse.price}.0
                    </td>
                    <td
                      className={`px-2 py-2 text-center text-[8px] xl:text-[10px]`}
                    >
                      <p
                        className={`font-semibold text-white p-1 ${
                          item.deliveryStatus === "Pending"
                            ? "bg-blue-500"
                            : item.deliveryStatus === "Shipped"
                            ? "bg-yellow-500"
                            : item.deliveryStatus === "Delivered"
                            ? "bg-green-500"
                            : ""
                        } rounded-lg `}
                      >
                        {item.deliveryStatus}
                      </p>
                    </td>
                    <td className=" justify-center px-2 py-2 text-center">
                      <CogIcon
                        className="h-5 w-full"
                        onClick={() => handleSettings(order.orderId)}
                      />
                      {settings === order.orderId && (
                        <div className="flex flex-col gap-1 justify-center">
                          <button
                            onClick={() =>
                              handleStatusChange(
                                order.orderId,
                                item.productId,
                                "Pending"
                              )
                            }
                            className="text-[8px] font-semibold text-black rounded-lg p-1 border-2 border-blue-500"
                          >
                            pending
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(
                                order.orderId,
                                item.productId,
                                "Shipped"
                              )
                            }
                            className="text-[8px] font-semibold text-black rounded-lg p-1 border-2 border-yellow-500"
                          >
                            shipped
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(
                                order.orderId,
                                item.productId,
                                "Delivered"
                              )
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
