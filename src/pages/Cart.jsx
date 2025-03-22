import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCartItems,
  removeFromCart,
  updateQuantity,
} from "../state/cartSlice/cartSlice";
import { getUserDetails } from "../state/authSlice";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { loggeduser, userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggeduser !== null) {
      dispatch(getUserDetails(loggeduser));
    }
  }, [dispatch, loggeduser]);

  useEffect(() => {
    if (userDetails?.id) {
      dispatch(getCartItems({ userId: userDetails.id }));
    }
  }, [dispatch, userDetails?.id]);

  const totel = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  console.log(cartItems);
  console.log(loggeduser);
  console.log(userDetails);

  // if (loggeduser === null)
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
  //         <h2 className="text-2xl font-bold text-gray-700">Welcome!</h2>
  //         <p className="text-gray-500 mt-2">Login to continue</p>

  //         <button
  //           onClick={() => (window.location.href = "/login")}
  //           className="mt-4 w-full bg-gradient-to-r from-[#EB5757] to-[#5c2f2f] text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
  //         >
  //           Go to Login
  //         </button>
  //       </div>
  //     </div>
  //   );

  if (cartItems?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center flex flex-col items-center gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4555/4555978.png"
            alt="Empty Cart"
            className="w-32 opacity-70"
          />
          <h2 className="text-2xl font-bold text-gray-700">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500">
            Looks like you haven&apos;t added anything yet.
          </p>

          <Link to="/products/All">
            <button className="mt-4 bg-gradient-to-r from-[#EB5757] to-[#5c2f2f] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-6 min-h-[88vh] relative">
      <div className="flex justify-between items-center xl:mr-[400px]">
        <h1 className="text-2xl xl:text-4xl font-bold font-Poppins">My Cart</h1>
        <Link to={"/products/All"}>
          <button className="flex gap-2 items-center rounded-md justify-between border-2 px-4 py-2 text-[10px] font-semibold font-Poppins">
            <ArrowLeftIcon className="h-3 text-gray-400" /> Continue Shoping
          </button>
        </Link>
      </div>
      <div className="flex-grow xl:mr-[400px]">
        <table className="min-w-full font-Poppins mt-4">
          <tr>
            <th></th>
            <th>PRODUCTS</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img className="h-20" src={item.product.image_url} alt="" />
              </td>
              <td className="max-w-8 xl:w-auto">{item.product.name}</td>
              <td>₹ {item.product.price}</td>
              <td className="min-h-full">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={async () => {
                      const result = await dispatch(
                        updateQuantity({
                          userId: userDetails.id,
                          productId: item.product.id,
                          quantity: -1,
                        })
                      );
                      if (updateQuantity.fulfilled.match(result)) {
                        // toast.info("Quantity updated successfully!");
                        toast("Quantity updated successfully!", {
                          icon: "ℹ️",
                          style: {
                            fontSize: "12px",
                            padding: "6px 12px",
                            background: "white",
                            color: "#3498db",
                            borderRadius: "50px",
                            border: "1px solid #3498db",
                          },
                        });
                      } else {
                        toast.error("Failed to update quantity", {
                          style: {
                            fontSize: "12px",
                            padding: "6px 12px",
                          },
                        });
                      }
                    }}
                    disabled={item.quantity <= 1}
                  >
                    <MinusIcon className="h-4 cursor-pointer" />
                  </button>
                  {item.quantity}
                  <PlusIcon
                    onClick={async () => {
                      const result = await dispatch(
                        updateQuantity({
                          userId: userDetails.id,
                          productId: item.product.id,
                          quantity: 1,
                        })
                      );
                      if (updateQuantity.fulfilled.match(result)) {
                        // toast.info("Quantity updated successfully!");.
                        toast("Quantity updated successfully!", {
                          icon: "ℹ️",
                          style: {
                            fontSize: "12px",
                            padding: "6px 12px",
                            background: "white",
                            color: "#3498db",
                            borderRadius: "50px",
                            border: "1px solid #3498db",
                          },
                        });
                      } else {
                        toast.error("Failed to update quantity", {
                          stylev: {
                            fontSize: "12px",
                            padding: "6px 12px",
                          },
                        });
                      }
                    }}
                    className="h-4 cursor-pointer"
                  />
                </div>
              </td>
              <td>₹ {item.product.price * item.quantity}</td>
              <td>
                <XCircleIcon
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        userId: userDetails.id,
                        productId: item.product.id,
                      })
                    )
                  }
                  className="h-4 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="xl:fixed xl:top-[80px] xl:right-4 xl:w-1/4 xl:h-[85vh]   flex flex-col xl:justify-between gap-4 p-4 bg-slate-200 rounded-2xl w-full z-[101]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700"> Subtotal:</p>
            <p>₹ {totel.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700"> Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex items-center justify-between border-b border-gray-600/70 pb-4">
            <p className="text-sm text-gray-700"> Total:</p>
            <p>₹ {totel.toFixed(2)}</p>
          </div>
        </div>
        <Link to={"/checkout"}>
          <div className="cursor-pointer flex items-center justify-between bg-red-500 px-3 py-4 rounded-xl">
            <p className="text-white font-semibold">Checkout</p>
            <p className="text-white font-semibold">₹ {totel.toFixed(2)}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
