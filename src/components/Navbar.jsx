import {
  Bars3Icon,
  ChatBubbleBottomCenterIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
// import useFetchProducts from "../hooks/useFetchProducts";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navaigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userdata, setUserData] = useState();
  // const [filtered, setFiltered] = useState([]);
  // const { products } = useFetchProducts("/product");
  // const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
    setUserData(storedUser);
  }, []);

  const handleuser = () => {
    navaigate("/user");
    setIsOpen(false);
  };

  const { cart } = useCart();
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setLogged(true);
    }
  }, []);

  // useEffect(() => {
  //   const filteredItems = products.filter((item) =>
  //     item.name.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFiltered(filteredItems);
  // }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navaigate(`/products/All?search=${query}`);
    } else {
      navaigate("/products/All");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="w-full px-4 md:px-6 fixed top-0 right-0 z-50 bg-white">
      <div className="w-full flex items-center justify-between py-3">
        <div className="md:flex xl:flex gap-5 items-center">
          <Link to={"/"}>
            <h1 className="text-red-500 font-Iceland text-2xl font-bold cursor-pointer">
              BARCODE
            </h1>
          </Link>
          <Link to={"/products/All"}>
            <p className="nav-titles">Shop</p>
          </Link>
          <p className="nav-titles">About</p>
          <p className="nav-titles">Contact</p>
        </div>
        <div className="flex items-center gap-5">
          <Link to={"/login"}>
            <p
              className={`font-Poppins font-light text-[15px] cursor-pointer hover:text-black/50 ${
                isSearchOpen ? "" : "mr-[45px]"
              } ${logged ? "hidden" : ""}`}
            >
              Login
            </p>
          </Link>
          {/* {isSearchOpen ? (
            <p className="font-Poppins font-light text-[15px] cursor-pointer hover:text-black/50">
              login
            </p>
          ) : (
            <p className="font-Poppins font-light text-[15px] cursor-pointer hover:text-black/50 mr-[45px]">
              login
            </p>
          )} */}

          <div
            className={`relative transition-all duration-1000 ease-in-out ${
              isSearchOpen ? " w-[100px] md:w-[200px]" : "w-0 "
            } overflow-hidden`}
          >
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full  flex-grow rounded-full px-4 py-1 bg-transparent outline-none border-2 border-black/55"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* {query && (
                <ul className="absolute top-10  w-full bg-white shadow-lg rounded-md max-h-48 overflow-auto z-50">
                  {filtered.map((item, index) => (
                    <li
                      key={index}
                      onClick={handleSearch}
                      className="p-2 border-b cursor-pointer hover:bg-gray-100"
                    >
                      {item.name}
                    </li>
                  ))}
                  {filtered.length === 0 && (
                    <li className="p-2 text-gray-500">No results found</li>
                  )}
                </ul>
              )} */}
            </form>
          </div>

          <button
            onClick={toggleSearch}
            className="absolute right-[100px] md:right-[110px] "
          >
            {isSearchOpen ? (
              <XMarkIcon className="h-5" />
            ) : (
              <MagnifyingGlassIcon className="h-5" />
            )}
          </button>
          <Link to={"/cart"}>
            <ShoppingBagIcon className="h-5 relative" />
          </Link>
          <p className="absolute right-[50px] top-3 rounded-full bg-red-500 text-white font-bold text-[10px] px-1 md:right-[60px]">
            {cart.length}
          </p>
          <UserIcon
            onClick={handleuser}
            className="h-5 hidden md:block cursor-pointer "
          />
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? (
              <XMarkIcon className="h-5" />
            ) : (
              <Bars3Icon className="h-5" />
            )}
          </button>
          <div
            className={`z-40 flex flex-col items-center absolute top-14 right-6 p-4 gap-4 rounded-lg transition-all ease-in-out duration-[.7s] ${
              isOpen ? "block" : "hidden"
            } mt-2 border backdrop-blur-md bg-black/40  md:hidden overflow-hidden`}
          >
            <div
              onClick={() => {
                navaigate("/products/All");
                setIsOpen(false);
              }}
              className="flex gap-2 items-center"
            >
              <ShoppingCartIcon className="h-4 text-white" />
              <p className="menu-nav-titles">Shop</p>
            </div>

            <div className="flex gap-2 items-center">
              <ExclamationCircleIcon className="h-4 text-white" />
              <p className="menu-nav-titles">About</p>
            </div>

            <div className="flex gap-2 items-center">
              <ChatBubbleBottomCenterIcon className="h-4 text-white" />
              <p className="menu-nav-titles">Contact</p>
            </div>

            <div
              onClick={handleuser}
              className="flex gap-2 items-center cursor-pointer"
            >
              <UserIcon className="h-4 text-white" />
              {userdata ? (
                <p className="menu-nav-titles">{userdata.name}</p>
              ) : (
                <p className="menu-nav-titles">Profile</p>
              )}
              {/* <p className="menu-nav-titles">Profile</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
