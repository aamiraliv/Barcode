import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <h2> Cart is empty </h2>;
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img className="h-20" src={item.imageURL} alt="" />
              </td>
              <td className="max-w-8 xl:w-auto">{item.name}</td>
              <td>₹ {item.price}</td>
              <td className="min-h-full">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <MinusIcon className="h-4 cursor-pointer" />
                  </button>
                  {item.quantity}
                  <PlusIcon
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-4 cursor-pointer"
                  />
                </div>
              </td>
              <td>₹ {item.price * item.quantity}</td>
              <td>
                <XCircleIcon
                  onClick={() => removeFromCart(item.id)}
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
            <p>₹ {total.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700"> Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex items-center justify-between border-b border-gray-600/70 pb-4">
            <p className="text-sm text-gray-700"> Total:</p>
            <p>₹ {total.toFixed(2)}</p>
          </div>
        </div>
        <Link to={'/checkout'}>
          <div className="cursor-pointer flex items-center justify-between bg-red-500 px-3 py-4 rounded-xl">
            <p className="text-white font-semibold">Checkout</p>
            <p className="text-white font-semibold">₹ {total.toFixed(2)}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
