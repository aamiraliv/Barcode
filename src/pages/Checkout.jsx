import { faGooglePay, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faAmazonPay } from "@fortawesome/free-brands-svg-icons/faAmazonPay";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../state/orderSlice/orderSlice";
import { useEffect } from "react";
import { getUserDetails } from "../state/authSlice";
import { toast } from "react-toastify";
import { getCartItems } from "../state/cartSlice/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggeduser, userDetails } = useSelector((state) => state.auth);
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

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

  console.log(loggeduser);
  console.log(userDetails);

  const id = userDetails?.id;
  const orderData = (cartItems ?? []).map((item) => ({
    productId: item.product?.id,
    quantity: item.quantity,
    deliveryStatus: "PENDING",
  }));
  const handleClearCart = async () => {
    if (cartItems?.length === 0) {
      toast.success("yout cart is empty");
    } else {
      try {
        const response = await dispatch(placeOrder({ userId: id, orderData }));
        if (response.payload.success) {
          toast.success("order placed successfully", {
            position: "top-center",
            style: {
              fontSize: "12px",
              padding: "6px 12px",
              background: "white",
              color: "green",
              border: "1px solid green",
            },
            onClose: () => {
              navigate("/", { replace: true });
              window.location.reload();
            },
          });
        } else {
          toast.error("Failed to place order");
        }
      } catch (error) {
        toast.error("error while placing order");
        console.log(error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="xl:grid xl:grid-cols-3 flex flex-col gap-4 bg-slate-200/65 rounded-xl p-4">
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg xl:flex-1">
            <h1 className="font-bold text-gray-600">Order Summary</h1>
            <h1 className="text-base text-gray-800">Products</h1>
            <div className="flex overflow-x-scroll border rounded-md p-2 shadow-sm">
              {cartItems.map((item) => (
                <div key={item.product.id} className="h-[70px] w-[70px]">
                  <img
                    src={item.product.image_url}
                    alt=""
                    className="object-contain w-full h-full rounded-lg "
                  />
                </div>
              ))}
            </div>
            <div className="w-full">
              {cartItems.map((item) => (
                <p
                  className="text-[12px] font-normal text-gray-500"
                  key={item.product.id}
                >
                  {item.product.name} ,
                </p>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h1 className="font-bold text-gray-600 mb-2">Delivery To</h1>
            <div className=" flex justify-between p-4 items-center rounded-lg w-full bg-white shadow-md hover:shadow-lg transition-shadow border">
              <input
                type="checkbox"
                className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-full checked:p-2 checked:bg-black checked:border-black transition-all cursor-pointer peer"
                name=""
                id=""
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">Address Name</h1>
                <p className="font-light text-[12px]">phone number</p>
                <p className="font-light text-[12px]">location</p>
              </div>
              <div className="text-gray-500 cursor-pointer">
                <PencilSquareIcon className="h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg flex flex-col gap-4">
          <h1 className="font-bold text-gray-600 mb-2">Payment method</h1>
          <div className=" flex justify-between p-4 items-center rounded-lg w-full bg-white shadow-md hover:shadow-lg transition-shadow border">
            <div className="h-[70px] w-[70px] cursor-pointer  border border-black p-4 rounded-md">
              <FontAwesomeIcon className="h-8 " icon={faCreditCard} />
            </div>
            <h1 className="font-bold text-lg">Credit Card</h1>
            <input
              type="radio"
              className={`w-5 h-5 appearance-none border-2 border-gray-400 rounded-full checked:bg-black checked:border-black transition-all cursor-pointer peer`}
              name="payment"
              id=""
            />
          </div>
          <div className=" flex justify-between p-4 items-center rounded-lg w-full bg-white shadow-md hover:shadow-lg transition-shadow border">
            <div className="h-[70px] w-[70px] cursor-pointer  border border-black p-4 rounded-md">
              <FontAwesomeIcon className="h-8 " icon={faGooglePay} />
            </div>

            <h1 className="font-bold text-lg">Google Pay</h1>
            <input
              type="radio"
              className={`w-5 h-5 appearance-none border-2 border-gray-400 rounded-full checked:bg-black checked:border-black transition-all cursor-pointer peer`}
              name="payment"
              id=""
            />
          </div>
          <div className=" flex justify-between p-4 items-center rounded-lg w-full bg-white shadow-md hover:shadow-lg transition-shadow border">
            <div className="h-[70px] w-[70px] cursor-pointer  border border-black p-4 rounded-md">
              <FontAwesomeIcon className="h-8" icon={faPaypal} />
            </div>

            <h1 className="font-bold text-lg">Pay Pal</h1>
            <input
              type="radio"
              className={`w-5 h-5 appearance-none border-2 border-gray-400 rounded-full checked:bg-black checked:border-black transition-all cursor-pointer peer`}
              name="payment"
              id=""
            />
          </div>
          <div className=" flex justify-between p-4 items-center rounded-lg w-full bg-white shadow-md hover:shadow-lg transition-shadow border">
            <div className="h-[70px] w-[70px] cursor-pointer  border border-black p-4 rounded-md">
              <FontAwesomeIcon className="h-8" icon={faAmazonPay} />
            </div>

            <h1 className="font-bold text-lg">Amazone Pay</h1>
            <input
              type="radio"
              className={`w-5 h-5 appearance-none border-2 border-gray-400 rounded-full checked:bg-black checked:border-black transition-all cursor-pointer peer`}
              name="payment"
              id=""
            />
          </div>
        </div>
        <div className=" flex flex-col xl:justify-between gap-4 p-4 bg-white rounded-2xl w-full ">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700"> Subtotal:</p>
              <p>₹ {cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700"> Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700"> tax:</p>
              <p>₹ 0.00</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-600/70 pb-4">
              <p className="text-sm text-gray-700"> Total:</p>
              <p>₹ {cartTotal.toFixed(2)}</p>
            </div>
          </div>
          <div
            onClick={handleClearCart}
            className="cursor-pointer flex items-center justify-between bg-black px-3 py-4 rounded-xl"
          >
            <p className="text-white font-semibold">place order</p>
            <p className="text-white font-semibold">₹ {cartTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
