import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addToWishList, getWishlistItems, removeFromWishlist } from "../state/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Cards = ({ key, name, image, price, item, handleAddToCart, userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggeduser } = useSelector((state) => state.auth);
  const { wishlistByUser } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlistByUser.some(
    // eslint-disable-next-line react/prop-types
    (wishlistItem) => wishlistItem.product.id === item.id
  );

  console.log(wishlistByUser);
  console.log("user-",userId,"product - ",item.id);
  

  const handleaddToWishList = () => {
    if (loggeduser === null) {
      toast.error("Please login to add to wishlist", {
        style: {
          fontSize: "12px",
          padding: "6px 12px",
        },
      });
    } else {
      if (isInWishlist) {
        dispatch(removeFromWishlist({ userId, productId: item.id }));

        toast.success("Product removed from wishlist successfully", {
          duration: 3000,
          position: "top-center",
          style: {
            fontSize: "14px",
            padding: "10px 14px",
            borderRadius: "50px",
            background: "#fef3c7",
            color: "#b45309",
            border: "1px solid #f59e0b",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
          icon: "💔",
        });
      } else {
        dispatch(addToWishList({ userId, productId: item.id }));
        toast.success("Product added to wishlist successfully", {
          duration: 3000,
          position: "top-center",
          style: {
            fontSize: "14px",
            padding: "10px 14px",
            borderRadius: "50px",
            background: "#fef3c7",
            color: "#b45309",
            border: "1px solid #f59e0b",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
          icon: "💖",
        });
      }
    }
  };

  const handleDetails = () => {
    // eslint-disable-next-line react/prop-types
    navigate(`/view/${item.id}`);
    window.scroll(0, 0);
  };

  return (
    <div
      key={key}
      className="productCard p-3 w-full flex flex-col gap-3 items-center justify-between border-2 rounded-2xl overflow-hidden"
    >
      <div
        onClick={handleDetails}
        className=" relative w-full h-36 p-3 overflow-hidden border-2 rounded-2xl relative md:h-60"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleaddToWishList(item);
          }}
          className="absolute top right-2"
        >
          {isInWishlist ? (
            <BsFillSuitHeartFill size={22} className=" text-red-500" />
          ) : (
            <Heart className="text-lg text-slate-400 " />
          )}
        </button>

        <img
          src={image}
          alt="Square Image"
          className=" w-full h-full object-contain"
        />
      </div>
      <p className="w-full font-Poppins text-sm font-semibold">{name}</p>
      <div className="relative flex w-full items-center justify-between">
        <p className="text-[12px]  font-Poppins font-bold md:text-[16px] xl:text-[14px]">
          ₹ {price}
        </p>
        <button
          onClick={handleAddToCart}
          className="font-Poppins bg-red-500 py-2 pr-2 pl-6 rounded-md font-bold text-white text-[10px]  xl:text-[12px] xl:pl-7"
        >
          Add To Cart
        </button>
        <ShoppingCartIcon className="absolute font-semibold text-white h-4 right-[70px] xl:right-[85px]" />
      </div>
    </div>
  );
};

export default Cards;
