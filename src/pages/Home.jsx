import {
  CheckBadgeIcon,
  CreditCardIcon,
  MicrophoneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import Cards from "../components/Cards";
import randomImage from "../../json/random";
import { useDispatch, useSelector } from "react-redux";
import { mostSellingProducts } from "../state/productSlice/productSlice";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { addToCart, getCartItems } from "../state/cartSlice/cartSlice";
import { getWishlistItems } from "../state/wishlistSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails, loggeduser, isAuth, token } = useSelector(
    (state) => state.auth
  );
  const { mostSoldProducts, mostSoldLoading, mostSoldError } = useSelector(
    (state) => state.product
  );
  const [random, setRandom] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const userId = userDetails?.id;

  useEffect(() => {
    dispatch(getCartItems({ userId: userDetails?.id }));
    dispatch(getWishlistItems(userId));
  }, [dispatch, userDetails?.id, userId]);

  useEffect(() => {
    dispatch(mostSellingProducts());
    setRandom(randomImage);
    const interval = setInterval(() => {
      setCurrentIndex((prevInd) => (prevInd + 1) % random.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch, random.length]);

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

      toast.success(`${item.name} added to cart! 🛒`, {
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

  if (mostSoldError) return <div>Error: {mostSoldError}</div>;
  if (mostSoldLoading)
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <SyncLoader margin={0} />
      </div>
    );

  const handleCatogary = (category) => {
    navigate("/products/category", { state: { category } });
    window.location.reload();
    // navigate(`/products/category`);
  };

  return (
    <div>
      <div className="overflow-hidden h-[160px] md:h-[580px] xl:h-screen relative">
        {randomImage.map((item) => (
          <div
            key={item.id}
            className="random-container relative flex flex-col md:gap-8 px-10 md:px-14 py-6  w-full rounded-2xl transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            <h1 className="mt-5 text-black font-Poppins font-semibold text-lg md:mt-[0px] md:text-6xl md:pl-9 xl:mt-[200px]">
              {item.title}
            </h1>
            <img
              className="absolute right-[20px] bottom-[0px] h-[150px] md:h-[400px]  md:right-[100px] xl:h-[550px] xl:bottom-[40px]"
              src={item.image}
              alt=""
            />
            <h1 className="mb-5 text-black/20 font-Poppins font-extrabold text-4xl md:text-8xl  md:mb-[300px] xl:text-9xl md:pl-9 xl:mb-[150px]">
              {item.type}
            </h1>
          </div>
        ))}

        <div className="absolute top-[11%] xl:top-[30%] md:top-[50%] right-2 grid gap-2 xl:gap-8 grid-cols-1 ">
          {randomImage.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 xl:w-2 xl:h-2 md:w-2  md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-400 scale-150 translate-x-[-3px]"
                  : "bg-black/40"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
        <div className="relative flex flex-col gap-1 px-6 pt-10 font-Poppins pb-6 bg-gradient-to-br from-black to-gray-900 col-span-2 rounded-2xl shadow-md overflow-hidden">
          <p className="text-white font-thin text-sm">new</p>
          <p className="text-white font-bold text-xl xl:text-2xl ">Trend In</p>
          <h1 className="text-white/30 font-extrabold text-2xl z-10 xl:text-4xl ">
            SMARTPHONES
          </h1>
          <button
            onClick={() => handleCatogary("Mobile")}
            className="text-black bg-white py-1 rounded-[50px] z-30"
          >
            Browse
          </button>
          <img
            className="absolute h-[120px] top-2 right-4 xl:h-[250px]"
            src="./src/assets/images/phone.png"
            alt=""
          />
        </div>
        <div className="relative flex flex-col gap-1 px-6 pt-10 font-Poppins pb-6  bg-gradient-to-br from-yellow-500 to-yellow-300 col-span-1 rounded-2xl shadow-md overflow-hidden">
          <p className="text-white font-thin text-sm">new</p>
          <p className="text-white font-bold text-xl xl:text-2xl">Wear</p>
          <h1 className="text-white/30 font-extrabold text-2xl z-10 xl:text-4xl">
            GADGET
          </h1>
          <button
            onClick={() => handleCatogary("Watches")}
            className="text-black bg-white py-1 rounded-[50px] z-30"
          >
            Browse
          </button>
          <img
            className="absolute h-[120px] top-2 right-0 xl:h-[250px] xl:top-0 xl:right-"
            src="./src/assets/images/watch.png"
            alt=""
          />
        </div>
        <div className="relative flex flex-col gap-1 px-6 pt-10 font-Poppins pb-6  bg-gradient-to-br from-red-500 to-red-400 col-span-1 rounded-2xl shadow-md overflow-hidden">
          <p className="text-white font-thin text-sm">play</p>
          <p className="text-white font-bold text-xl xl:text-2xl">Latest</p>
          <h1 className="text-white/30 font-extrabold text-2xl z-10 xl:text-4xl">
            GAMES
          </h1>
          <button
            onClick={() => handleCatogary("Gamings")}
            className="text-red-500 bg-white py-1 rounded-[50px] z-30 "
          >
            Browse
          </button>
          <img
            className="absolute h-[120px] top-0 right-2 xl:h-[250px]"
            src="./src/assets/images/ps5.png"
            alt=""
          />
        </div>
        <div className="relative flex flex-col gap-1 px-6 pt-10 font-Poppins pb-6 bg-gradient-to-br from-gray-200 to-gray-300 col-span-2 md:col-span-1 rounded-2xl shadow-md overflow-hidden">
          <p className="text-black font-light text-sm">try</p>
          <p className="text-black font-bold text-xl xl:text-2xl">trending</p>
          <h1 className="text-black/20 font-extrabold text-2xl z-10 xl:text-4xl">
            SPEAKERS
          </h1>
          <button
            onClick={() => handleCatogary("Speakers")}
            className="text-red-600 bg-white py-1 rounded-[50px] z-[2]"
          >
            Browse
          </button>
          <img
            className="absolute h-[150px] top-0 right-4 xl:h-[250px] xl:top-[-70px] xl:right-[-60px]"
            src="./src/assets/images/speaker.png"
            alt=""
          />
        </div>
        <div className="relative flex flex-col gap-1 px-6 pt-10 font-Poppins pb-6  bg-gradient-to-br from-green-500 to-green-300 col-span-1 md:col-span-1 rounded-2xl shadow-md overflow-hidden">
          <p className="text-white font-thin text-sm">Trend</p>
          <p className="text-white font-bold text-xl xl:text-2xl">Devices</p>
          <h1 className="text-white/30 font-extrabold text-2xl z-10 xl:text-4xl">
            LAPTOPS
          </h1>
          <button
            onClick={() => handleCatogary("Laptops")}
            className="text-green-500 bg-white py-1 rounded-[50px] z-30"
          >
            Browse
          </button>
          <img
            className="absolute h-[120px] top-2 right-2 xl:h-[250px] xl:top-[-10px] xl:right-[-80px]"
            src="./src/assets/images/laptop.png"
            alt=""
          />
        </div>
        <div className="relative flex flex-col gap-1 px-6 pt-10 font-Poppins pb-6  bg-gradient-to-br from-blue-500 to-blue-300  col-span-1 md:col-span-2 rounded-2xl shadow-md overflow-hidden">
          <p className="text-white font-thin text-sm">Enjoy</p>
          <p className="text-white font-bold text-xl xl:text-2xl">With</p>
          <h1 className="text-white/30 font-extrabold text-2xl z-10 xl:text-4xl">
            AUDIO
          </h1>
          <button
            onClick={() => handleCatogary("Headphones")}
            className="text-blue-500 bg-white py-1 rounded-[50px] z-20"
          >
            Browse
          </button>
          <img
            className="absolute h-[100px] top-4 right-4 xl:h-[250px] xl:top-[-50px]"
            src="./src/assets/images/airpodsnew.png"
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 my-8 md:flex justify-between">
        <div className="flex items-center gap-2">
          <TruckIcon className="h-10 text-red-600" />
          <div>
            <p className="font-semibold font-Poppins">Free Shipping</p>
            <p className="font-Poppins font-light text-[13px] text-black/50">
              free shipping on all orders
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckBadgeIcon className="h-10 text-red-600" />
          <div>
            <p className="font-semibold font-Poppins">Money Guarantee</p>
            <p className="font-Poppins font-light text-[13px] text-black/50">
              30 day money back
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MicrophoneIcon className="h-10 text-red-600" />
          <div>
            <p className="font-semibold font-Poppins">Online Support 24/7</p>
            <p className="font-Poppins font-light text-[13px] text-black/50">
              technical support available
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-10 text-red-600" />
          <div>
            <p className="font-semibold font-Poppins">Secure Payment</p>
            <p className="font-Poppins font-light text-[13px] text-black/50">
              payment is secured
            </p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <h1 className="text-xl text-center font-Poppins font-bold md:text-2xl ">
          Best Selling Products
        </h1>
        <div className="cardContainer grid grid-cols-2 gap-2 mt-4 md:grid-cols-4 xl:grid-cols-5 xl:gap-4">
          {mostSoldProducts.map((item) => (
            <Cards
              key={item.id}
              name={item.name}
              image={item.image_url}
              price={item.price}
              item={item}
              handleAddToCart={() => handleAddToCart(item)}
              userId={userDetails?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
