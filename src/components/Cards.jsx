import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Cards = ({key,name,image,price,handleAddToCart,item}) => {

  const navaigate = useNavigate()

  const handleDetails = () => {
    navaigate(`/view/${item.id}`)
  }

  return (
    <div key={key} className="productCard p-3 w-full flex flex-col gap-3 items-center justify-between border-2 rounded-2xl overflow-hidden">
      <div onClick={handleDetails} className=" w-full h-36 p-3 overflow-hidden border-2 rounded-2xl relative md:h-60">
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
        <button onClick={()=>handleAddToCart(item)} className="font-Poppins bg-red-500 py-2 pr-2 pl-6 rounded-md font-bold text-white text-[10px]  xl:text-[12px] xl:pl-7">
          Add To Cart
        </button>
        <ShoppingCartIcon className="absolute font-semibold text-white h-4 right-[70px] xl:right-[85px]" />
      </div>
    </div>
  );
};

export default Cards;
