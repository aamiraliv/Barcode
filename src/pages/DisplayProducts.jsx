import { faBars, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Cards from "../components/Cards";
import { useCart } from "../hooks/useCart";
import useFetchProducts from "../hooks/useFetchProducts";

const DisplayProducts = () => {
  // const { query } = useOutletContext();
  const { browseCategory } = useParams();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [items, setItems] = useState([]);
  const [grid, setGrid] = useState(true);
  // const searchParams = new URLSearchParams(location.search);
  const { addToCart } = useCart();
  const { products, isError, isLoading } = useFetchProducts("/product");

  useEffect(() => {
    if (browseCategory) {
      setCategory(browseCategory);
    }
  }, [browseCategory]);

  useEffect(() => {
    const query = searchParams.get("search") || "";
    if (products.length > 0) {
      const sortedProducts = [...products]
        .filter((product) => {
          if (query) {
            return product.name.toLowerCase().includes(query.toLowerCase());
          }
          return true;
          // else{
          //   return product;
          // }
        })
        .filter((item) => {
          if (category === "Headphone") {
            return item.category === "headphones";
          } else if (category === "Laptop") {
            return item.category === "Laptops";
          } else if (category === "Gaming") {
            return item.category === "Gamings";
          } else if (category === "Speaker") {
            return item.category === "Speakers";
          } else if (category === "Watch") {
            return item.category === "Watches";
          } else if (category === "Mobile") {
            return item.category === "mobiles";
          } else if (category === "All") {
            return item;
          }
          return item;
          //  else {
          //   return item;
          // }
        })
        .sort((a, b) => {
          if (price === "asc") {
            return a.price - b.price;
          } else if (price === "desc") {
            return b.price - a.price;
          } else if (price === "all") {
            return 0;
          }
          return 0;
        });
      setItems(sortedProducts);
    }
  }, [products, price, category, searchParams]);

  if (isError) return <div>Error:{isError.message}</div>;
  if (isLoading)
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <SyncLoader margin={0} />
      </div>
    );

  return (
    <div>
      <div className="xl:fixed xl:top-[60px] xl:left-0 xl:py-4  xl:px-8 w-full bg-white flex flex-col gap-1 py-10 px-4 border-b-2 mb-4 z-40">
        <div className="flex justify-between  items-baseline ">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-black font-Poppins font-bold xl:text-2xl">
              Explore All Products
            </h1>
            <p className="font-light text-gray-500">{`${items.length} Products found`}</p>
          </div>
          <div className="flex gap-2 ">
            <button
              onClick={() => {
                setGrid(true);
              }}
              className="cursor-pointer z-50  "
            >
              <FontAwesomeIcon icon={faBorderAll} className="xl:h-6" />
            </button>
            <button
              onClick={() => {
                setGrid(false);
              }}
              className="cursor-pointer z-50  "
            >
              <FontAwesomeIcon icon={faBars} className="xl:h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 xl:bg-white xl:w-[300px] xl:fixed xl:left-0 xl:min-h-[75vh] xl:z-50 xl:bottom-0 xl:px-8 xl:border-r-2 xl:py-2">
          <p className="flex items-center gap-2 font-light text-gray-600 ">
            FILTER BY <FunnelIcon className="h-5" />
          </p>
          <div className="flex gap-4 items-baseline font-light text-gray-600">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              name=""
              id=""
              className="z-50 outline-none px-4  appearance-none border-2  bg-white/50 xl:text-sm "
            >
              <option value="" hidden>
                category
              </option>
              <option value="all">All</option>
              <option value="Headphone">Headphone</option>
              <option value="Gaming">Gaming</option>
              <option value="Speaker">Speakers</option>
              <option value="Watch">Watches</option>
              <option value="Laptop">Laptops</option>
              <option value="Mobile">Mobiles</option>
            </select>
            <select
              name=""
              id=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="z-50 outline-none px-4 appearance-none border-2  xl:text-sm "
            >
              <option value="" hidden>
                Price
              </option>
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
          } gap-2 `}
        >
          {items.map((item) => (
            <Cards
              key={item.id}
              name={item.name}
              image={item.imageURL}
              price={item.price}
              item={item}
              handleAddToCart={()=>addToCart(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayProducts;
