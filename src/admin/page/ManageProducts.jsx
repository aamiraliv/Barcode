import {
  BadgePlusIcon,
  ChevronDownCircle,
  Edit,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import api from "../../../services/api";
import useFetchProducts from "../../hooks/useFetchProducts";

const ManageProducts = () => {
  const [category, setCategory] = useState("All");
  const [data, setData] = useState([]);
  const [drop, setDrop] = useState(false);
  const { products, isError, isLoading } = useFetchProducts("/product");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredProducts = products.filter((item) => {
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
    });
    setData(filteredProducts);
  }, [category, products]);

  const handleEdit = (product) => {
    navigate("/admin/productForm", { state: { product } });
  };

  const handleAdd = () => {
    navigate("/admin/productForm");
  };

  const handleDelete = async (product) => {
    try {
      api.delete(`/product/${product.id}`);
      navigate("/admin/products");
      toast.success("Product deleted successfully!", {
        onClose: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) return <div>Error:{isError.message}</div>;
  if (isLoading)
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <SyncLoader margin={0} />
      </div>
    );

  return (
    <div className="bg-[#CCD0CF]/40 px-3 py-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl text-[#04220c] xl:text-2xl">
            {" "}
            Manage Products
          </h1>
          <p className="text-sm text-gray-600">totel products: {data.length}</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setDrop(!drop)}
              className="relative flex items-center justify-center gap-1 p-2 rounded-xl text-white bg-[#11212D] border-2 border-white text-sm"
            >
              category{" "}
              <ChevronDownCircle
                className={`h-4 ${drop === false ? "" : "rotate-180"}`}
              />
            </button>

            <div
              className={`transition-all duration-[1s] absolute grid grid-cols-1 gap-1 left-[-18px] w-40 bg-white p-2 rounded-lg shadow-lg ${
                drop
                  ? "scale-y-100 opacity-100 "
                  : "scale-y-0 opacity-0 "
              } `}
            >
              <button
                onClick={() => {
                  setCategory("all");
                  setDrop(false);
                }}
                className="w-full text-center text-sm text-white bg-[#11212D] rounded-lg p-1"
              >
                All
              </button>
              <button
                onClick={() => {
                  setCategory("Mobile");
                  setDrop(false);
                }}
                className="w-full text-center text-sm text-white bg-[#11212D] rounded-lg p-1"
              >
                Mobiles
              </button>
              <button
                onClick={() => {
                  setCategory("Laptop");
                  setDrop(false);
                }}
                className="w-full text-center text-sm text-white bg-[#11212D] rounded-lg p-1"
              >
                Laptops
              </button>
              <button
                onClick={() => {
                  setCategory("Watch");
                  setDrop(false);
                }}
                className="w-full text-center text-sm text-white bg-[#11212D] rounded-lg p-1"
              >
                Watches
              </button>
              <button
                onClick={() => {
                  setCategory("Speaker");
                  setDrop(false);
                }}
                className="w-full text-center text-sm text-white bg-[#11212D] rounded-lg p-1"
              >
                Speakers
              </button>
              <button
                onClick={() => {
                  setCategory("Headphone");
                  setDrop(false);
                }}
                className="w-full text-center text-sm text-white bg-[#11212D] rounded-lg p-1"
              >
                Headphones
              </button>
              <button
                onClick={() => {
                  setCategory("Gaming");
                  setDrop(false);
                }}
                className="w-full text-center text-sm text-white bg-[#11212D] rounded-lg p-1"
              >
                Gaming
              </button>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-1 p-2 rounded-xl text-white bg-[#11212D] border-2 border-white text-sm"
          >
            <BadgePlusIcon className="h-5" /> <p> add </p>
          </button>
        </div>
      </div>
      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full border-spacing-y-4 border-collapse: separate rounded-lg overflow-hidden shadow-lg bg-white">
          <thead className=" border-b-8 border-[#CCD0CF]/40">
            <tr className="">
              <th className="text-[#1a527c] font-semibold text-center  px-1 py-4 ">
                id
              </th>
              <th className="text-[#1a527c] font-semibold text-center  px-1 py-4">
                category
              </th>
              <th className="text-[#1a527c] font-semibold text-center  px-1 py-4  hidden xl:block">
                image
              </th>
              <th className="text-[#1a527c] font-semibold text-center  px-1 py-4 w-[50px] xl:w-auto">
                name
              </th>
              <th className="text-[#1a527c] font-semibold text-center  px-1 py-4">
                price
              </th>
              <th className="text-[#1a527c] font-semibold text-center  px-1 py-4">
                sales
              </th>
              <th className="text-[#1a527c] font-semibold text-center  px-2 w-[70px] py-4 ">
                edit
              </th>
            </tr>
          </thead>
          <tbody className="rounded-lg">
            {data.map((product) => (
              <tr
                key={product._id}
                className=" hover:bg-gray-50 border-spacing-y-4 border-b-8 border-[#CCD0CF]/40 rounded-lg h-28"
              >
                <td className="text-center  px-1 py-4">{product.id}</td>
                <td className="text-center  px-1 py-4">{product.category}</td>
                <td className="text-center  px-1 py-4 hidden xl:block">
                  <img
                    src={product.imageURL}
                    alt=""
                    className="h-20 w-full object-contain"
                  />
                </td>
                <td className="text-center  px-1 py-4 ">{product.name}</td>
                <td className="text-center  px-1 py-4">{product.price}</td>
                <td className="text-center  px-1 py-4">{product.sales}</td>
                <td className="px-1  py-4 text-center">
                  <button
                    onClick={() => handleEdit(product)}
                    className="w-full text-center"
                  >
                    <Edit className="w-full h-5 " />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="w-full text-center"
                  >
                    <Trash2Icon className="w-full h-5 " />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
