import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../state/productSlice/productSlice";
import { SyncLoader } from "react-spinners";
import { addToCart } from "../state/cartSlice/cartSlice";
import { toast } from "react-hot-toast";
import { MinusCircle, PlusCircle } from "lucide-react";

const ProductDetails = () => {
  const [quanty, setQuanty] = useState(1);
  const { productById, loadingById, errorById } = useSelector(
    (state) => state.product
  );
  const { userDetails, loggeduser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
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
          productId: productById.id,
          quantity: quanty,
        })
      );
      toast.success(`${productById.name} added to cart! 🛒`, {
        style: {
          fontSize: "12px",
          padding: "6px 12px",
        },
      });
    }
  };

  if (loadingById)
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <SyncLoader margin={0} />
      </div>
    );
  if (errorById) {
    return <h1>{errorById}</h1>;
  }

  return (
    <div>
      <div
        key={productById.id}
        className="flex items-center justify-center p-10"
      >
        <div className="flex gap-4 flex-col justify-between xl:grid xl:grid-cols-2">
          <div className="p-4 h-[300px] w-[300px] xl:h-[500px] xl:w-[500px] ">
            <img
              src={productById.image_url}
              alt={productById.name}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-col font-semibold text-center gap-4 xl:gap-0 xl:justify-between">
            <h2 className="font-bold text-xl xl:text-4xl font-Poppins xl:text-center xl:p-4 xl:bg- xl:rounded-lg">
              {productById.name}
            </h2>
            <p className="text-[14px] font-normal p-4 min-h-[250px] text-black/50 bg-slate-300/50 rounded-md xl:text-start">
              &quot;{productById.description}&quot;
            </p>
            <p className="xl:text-start text-stone-700 xl:pl-2 xl:border-l-4 xl:border-l-red-400">
              ₹ {productById.price}
            </p>
            <div className="flex flex-row gap-4 w-min items-center border-2 border-red-500/50 px-4 py-2 rounded-md">
              <button
                disabled={quanty <= 1}
                onClick={() => {
                  setQuanty(quanty - 1);
                }}
              >
                <MinusCircle size={20} />
              </button>

              <p className="xl:text-start text-stone-700">{quanty}</p>
              <button
                onClick={() => {
                  setQuanty(quanty + 1);
                }}
              >
                <PlusCircle size={20} />
              </button>
            </div>

            <button
              onClick={() => handleAddToCart()}
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
