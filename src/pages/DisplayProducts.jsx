import { faBars, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { searchProducts } from "../state/productSlice/productSlice";
import { useLocation } from "react-router-dom";
import { addToCart } from "../state/cartSlice/cartSlice";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import Cards from "../components/Cards";

const DisplayProducts = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const sendCategory = location.state?.category || "all";
  const [category, setCategory] = useState(sendCategory);
  const [price, setPrice] = useState("all");
  const [grid, setGrid] = useState(true);
  const [items, setItems] = useState([]);

  const { userDetails, loggeduser } = useSelector((state) => state.auth);
  const { searchResults, errorSearch, loadingSearch } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(searchProducts({ category }));
  }, [dispatch, category]);

  useEffect(() => {
    setItems(searchResults);
  }, [searchResults]);

  useEffect(() => {
    if (price !== "all") {
      setItems((prevItems) =>
        [...prevItems].sort((a, b) =>
          price === "asc" ? a.price - b.price : b.price - a.price
        )
      );
    }
  }, [price]);

  const handleAddToCart = (item) => {
    if (!loggeduser) {
      toast.error("Please login to add to cart", {
        style: {
          fontSize: "12px",
          padding: "6px 12px",
        },
      });
      return;
    }
    dispatch(
      addToCart({ userId: userDetails.id, productId: item.id, quantity: 1 })
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
  };

  if (errorSearch) return <div>Error: {errorSearch.message}</div>;

  if (loadingSearch)
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <SyncLoader margin={0} />
      </div>
    );

  return (
    <div>
      <div className="xl:fixed xl:top-[60px] xl:left-0 xl:py-4 xl:px-8 w-full bg-white flex flex-col gap-1 py-10 px-4 border-b-2 mb-4 z-40">
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-black font-Poppins font-bold xl:text-2xl">
              Explore All Products
            </h1>
            <p className="font-light text-gray-500">{`${items.length} Products found`}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setGrid(true)}
              className="cursor-pointer z-50"
            >
              <FontAwesomeIcon icon={faBorderAll} className="xl:h-6" />
            </button>
            <button
              onClick={() => setGrid(false)}
              className="cursor-pointer z-50"
            >
              <FontAwesomeIcon icon={faBars} className="xl:h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 xl:bg-white xl:w-[300px] xl:fixed xl:left-0 xl:min-h-[75vh] xl:z-50 xl:bottom-0 xl:px-8 xl:border-r-2 xl:py-2">
          <p className="flex items-center gap-2 font-light text-gray-600">
            FILTER BY <FunnelIcon className="h-5" />
          </p>
          <div className="flex gap-4 items-baseline font-light text-gray-600">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="z-50 outline-none px-4  appearance-none border-2  bg-white/50 xl:text-sm"
            >
              <option value="all">All</option>
              <option value="Headphone">Headphone</option>
              <option value="Gaming">Gaming</option>
              <option value="Speaker">Speakers</option>
              <option value="Watch">Watches</option>
              <option value="Laptop">Laptops</option>
              <option value="Mobile">Mobiles</option>
            </select>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="z-50 outline-none px-4  appearance-none border-2  bg-white/50 xl:text-sm"
            >
              <option value="all">All</option>
              <option value="asc">Low To High</option>
              <option value="desc">High To Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="xl:mt-[120px] xl:ml-[300px]">
        <div
          className={`grid ${
            grid ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
          } gap-2`}
        >
          {items.map((item) => (
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

export default DisplayProducts;
