import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useCart } from "../hooks/useCart";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    api
      .get(`product/${id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div>
      <div key={data.id} className="flex items-center justify-center p-10">
        <div className="flex gap-4 flex-col justify-between xl:grid xl:grid-cols-2">
          <div className="p-4 h-[300px] w-[300px] xl:h-[500px] xl:w-[500px] rounded-lg border-2 border-red-500/50">
            <img
              src={data.imageURL}
              alt={data.name}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-col font-semibold text-center gap-4 xl:gap-0 xl:justify-between">
            <h2 className="font-bold text-xl xl:text-4xl font-Poppins xl:text-center xl:p-4 xl:bg- xl:rounded-lg">{data.name}</h2>
            <p className="text-[14px] font-normal p-4 min-h-[250px] bg-slate-300/50 rounded-md xl:text-start">{data.discription}</p>
            <p className="xl:text-start text-stone-700 xl:pl-2 xl:border-l-4 xl:border-l-red-400">₹ {data.price}</p>
            <p className="xl:text-start text-stone-700">Quantity: 1</p>
            <button
              onClick={() => addToCart(data)} // Add your function to handle the cart logic
              className="font-Poppins w-full border-2 border-red-500/50 text-red-500 rounded-lg p-4 hover:text-white hover:bg-red-500"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
