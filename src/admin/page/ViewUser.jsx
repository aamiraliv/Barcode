import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const ViewUser = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});

  
  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log("Failed to fetch user:", error));

    api.get(`/orders`).then((response) => {
      const userOrders = response.data.filter(
        (item) => Number(item.userId) === Number(id)
      );
      setOrders(userOrders);
    });
    console.log(user);
  }, [id, orders,user]);
  
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className=" xl:col-span-2 flex items-center justify-center flex-col w-full p-4 bg-white rounded-lg shadow-md border">
            <div className="flex flex-col gap-2 item">
              <h1 className="text-2xl font-bold text-center capitalize">
                {user.name} !
              </h1>
              <p
                className={`text-[12px] text-center rounded-lg
                  border  ${
                    user.role === "admin"
                      ? "text-green-600 bg-green-300/20 border-green-500/50"
                      : "text-blue-600 bg-blue-300/20 border-blue-500/50"
                  } `}
              >
                {user.role}
              </p>
              <p className="text-[14px] font-light text-gray-600">
                Email: {user.email}
              </p>
            </div>
          </div>
          <div className="w-full p-4 bg-white rounded-lg shadow-md border">
            <h1 className="font-semibold text-center border-b-2 border-blue-400 p-2">
              Cart
            </h1>
            <div>
              <div className=" xl:h-[80vh] xl:overflow-y-scroll">
                <table className="min-w-full font-Poppins mt-4">
                  <tr>
                    <th className=""></th>
                    <th className="text-center">Product</th>
                    <th className="text-center">Qty</th>
                  </tr>
                  {user.userCart?.map((item) => (
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
            </div>
          </div>
          <div className="w-full p-4 bg-white rounded-lg shadow-md border">
            <h1 className="font-semibold text-center border-b-2 border-blue-400 p-2">
              orders
            </h1>
            <div className=" xl:h-[80vh] xl:overflow-y-scroll">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
