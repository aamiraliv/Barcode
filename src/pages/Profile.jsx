import { faBoxOpen, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logoutUser } from "../state/authSlice";
import { getCartItems } from "../state/cartSlice/cartSlice";
import { cancelOrder, getOrderById } from "../state/orderSlice/orderSlice";
import "../styles/deleteBtn.css";
import ConfirmationPopup from "../components/ConfirmationPopUp";

const Profile = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const dispatch = useDispatch();
  const { ordersByid } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);
  const { loggeduser, userDetails } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(hoveredProduct);

  useEffect(() => {
    dispatch(getCartItems({ userId: userDetails?.id }));
    dispatch(getOrderById(userDetails?.id));
  }, [dispatch, userDetails?.id]);

  useEffect(() => {
    if (loggeduser) {
      dispatch(getUserDetails(loggeduser));
    }
  }, [dispatch, loggeduser]);

  const handleConfirm = async (prodtId, ordId, status) => {
    if (status === "Pending") {
      try {
        const response = await dispatch(
          cancelOrder({
            orderId: ordId,
            productId: prodtId,
            userId: userDetails?.id,
          })
        );
        if (response.payload.success) {
          toast.success("Order cancelled successfully", {
            position: "top-center",
            style: {
              fontSize: "12px",
              padding: "6px 12px",
              background: "white",
              color: "green",
            },
          });
          setPopupOpen(false)
        }
      } catch (error) {
        console.log(error);
        toast.error("Error cancelling order", {
          position: "top-center",
          style: {
            fontSize: "12px",
            padding: "6px 12px",
          },
        });
      }
    } else {
      toast.info(" order dispatched !! cannot cancel the order !!", {
        position: "top-center",
        style: {
          fontSize: "12px",
          padding: "6px 12px",
        },
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      console.log("logout status :", response);
    } catch (error) {
      console.log("Error logging out:", error);
    }

    toast.info("Logged out successfully", {
      position: "top-center",
      style: {
        fontSize: "12px",
        padding: "6px 12px",
        background: "white",
        color: "mediumblue",
        border: "1px solid mediumblue",
      },
      onClose: () => {
        navigate("/");
        window.location.reload();
      },
    });
  };
  console.log(loggeduser);
  console.log(userDetails);

  if (loggeduser === null)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
          <h2 className="text-2xl font-bold text-gray-700">Welcome!</h2>
          <p className="text-gray-500 mt-2">Login to continue</p>

          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 w-full bg-gradient-to-r from-[#EB5757] to-[#5c2f2f] text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );

  return (
    <div className="xl:grid xl:grid-cols-3 flex flex-col gap-4 p-6 bg-slate-200/65 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
              Welcome {userDetails?.username} !
            </h1>
            <p className="text-[12px] text-gray-500">{userDetails?.role}</p>
            <p className="text-[14px] font-light text-gray-600">
              Email: {userDetails?.email}
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
        <table className="relative min-w-full font-Poppins mt-4">
          <tr>
            <th className=""></th>
            <th className="text-center">Product</th>
            <th className="text-center">Status</th>
            <th className="text-center">qty</th>
            <th className="text-center">price</th>
          </tr>

          {ordersByid.map((order) =>
            order.orderItems.map((item) => (
              <tr
                className="relative"
                key={item.productResponse.id}
                onMouseEnter={() => setHoveredProduct(item.productResponse.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <td className="relative">
                  <img
                    className="h-10"
                    src={item.productResponse.image_url}
                    alt=""
                  />
                </td>
                <td className="text-[12px] text-gray-700 p-2 text-center">
                  {item.productResponse.name}
                </td>
                <td
                  className={`text-[12px] ${
                    item.deliveryStatus === "Pending"
                      ? "text-blue-500"
                      : order.deliveryStatus === "Shipped"
                      ? "text-yellow-500"
                      : order.deliveryStatus === "Delivered"
                      ? "text-green-500"
                      : ""
                  } p-2 text-center`}
                >
                  {item.deliveryStatus}
                </td>
                <td className="text-[12px] text-gray-700 p-2 text-center">
                  {item.quantity}
                </td>
                <td className="text-[12px] text-gray-700 p-2 text-center">
                  ₹ {item.productResponse.price}
                </td>
                {hoveredProduct === item.productResponse.id && (
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="absolute top-4 right-[135px] px-9 py-2 text-white border bg-red-500 border-white rounded-lg font-semibold uppercase transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-md active:scale-95"
                  >
                    Cancel
                  </button>
                )}
                <ConfirmationPopup
                  isOpen={popupOpen}
                  onClose={() => setPopupOpen(false)}
                  onConfirm={() =>
                    handleConfirm(
                      hoveredProduct,
                      order.orderId,
                      item.deliveryStatus
                    )
                  }
                />
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

          {/* -------------------------------------------------------------------------------------- */}

          {cartItems.map((item) => (
            <tr key={item.product.id}>
              <td>
                <img className="h-10" src={item.product.image_url} alt="" />
              </td>
              <td className="text-[12px] text-gray-700 p-2 text-center">
                {item.product.name}
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
