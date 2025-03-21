import { useDispatch, useSelector } from "react-redux";
import Cards from "../components/Cards";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { addToCart } from "../state/cartSlice/cartSlice";
import { getWishlistItems } from "../state/wishlistSlice";
import { BsHeartFill } from "react-icons/bs";

export const Wishlist = () => {
  const { wishlistByUser } = useSelector((state) => state.wishlist);
  const { userDetails, loggeduser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistItems(userDetails?.id));
  }, [dispatch, userDetails?.id]);

  const handleAddToCart = (item) => {
    if (loggeduser === null) {
      toast.error("Please login to add to cart", {
        style: {
          fontSize: "12px",
          padding: "6px 12px",
        },
      });
    } else {
      dispatch(
        addToCart({
          userId: userDetails.id,
          productId: item.id,
          quantity: 1,
        })
      );

      toast.success(`${item.product.name} added to cart! 🛒`, {
        style: {
          fontSize: "12px",
          padding: "6px 12px",
          background: "white",
          color: "green",
          borderRadius: "50px",
          border: "1px solid green",
        },
      });
    }
  };

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
    <div className="p-5">
      <div className="flex items-center gap-2 p-5">
        <h1 className="flex items-center justify-center gap-4 w-full text-center text-slate-400 font-Poppins font-bold text-4xl">
          My Wishlist <BsHeartFill />
        </h1>
      </div>
      <div className="grid grid-cols-2  gap-4">
        {wishlistByUser.map((item) => (
          <Cards
            key={item.product.id}
            name={item.product.name}
            image={item.product.image_url}
            price={item.product.price}
            item={item.product}
            handleAddToCart={() => handleAddToCart(item)}
            userId={userDetails?.id}
          />
        ))}
      </div>
    </div>
  );
};
