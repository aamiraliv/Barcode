import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addProducts,
  updateProduct,
} from "../../state/productSlice/productSlice";
import ImageUpload from "../components/ImageUpload";

const ProductForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { product: productData } = location.state || {};

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "",
  });

  const handleImageUpload = (imageUrl) => {
    setProduct({ ...product, image_url: imageUrl });
  };

  useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (productData) {
        const response = await dispatch(
          updateProduct({ productId: productData?.id, productData: product })
        );
        if (response.payload.success === true) {
          toast.success("Product updated successfully", {
            position: "top-center",
            style: {
              fontSize: "12px",
              padding: "6px 12px",
              background: "white",
              color: "green",
            },
            onClose: () => {
              navigate("/admin/products");
            },
          });
        } else {
          toast.error("Failed to update product", {
            position: "top-center",
            style: {
              fontSize: "12px",
              padding: "6px 12px",
              background: "white",
              color: "red",
            },
          });
        }
      } else {
        const response = await dispatch(addProducts(product));
        if (response.payload.success === true) {
          toast.success("Product added successfully", {
            position: "top-center",
            style: {
              fontSize: "12px",
              padding: "6px 12px",
              background: "white",
              color: "green",
            },
            onClose: () => {
              navigate("/admin/products");
            },
          });
        } else {
          toast.error("Failed to add product", {
            position: "top-center",
            style: {
              fontSize: "12px",
              padding: "6px 12px",
              background: "white",
              color: "red",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to submit product");
    }
  };

  return (
    <div className="form-container h-[80vh] flex items-center justify-center ">
      <div className="bg-slate-200 p-4 rounded-lg xl:w-4/5 ">
        <h2 className="font-semibold text-center text-2xl">
          {productData ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className=" mt-4 grid grid-cols-1 gap-4  xl:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Enter the product name"
              className="w-full p-2 rounded-lg border border-gray-300 outline-none"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Enter the product price"
              className="w-full p-2 rounded-lg border border-gray-300 outline-none"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required
            />
            <textarea
              type="text"
              name="discription"
              placeholder=" Enter the product discription"
              className="xl:col-span-2 min-h-20 w-full p-2 rounded-lg border border-gray-300 outline-none"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              required
            />
            <div className="row-span-2">
              <ImageUpload onUpload={handleImageUpload}/>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <input
                type="text"
                name="imageURL"
                placeholder="product image Link"
                className="w-full p-2 rounded-lg border border-gray-300 outline-none"
                value={product.image_url}
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 gap-1">
              <input
                type="text"
                name="category"
                placeholder="Enter the product category"
                className="w-full p-2 rounded-lg border border-gray-300 outline-none"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                required
              />
              <p className="text-[10px] text-gray-600">
                *(Headphones,Speakers,Watches,Laptops,Gamings)
              </p>
            </div>

            <button
              type="submit"
              className="w-full p-2 rounded-lg border border-gray-300 bg-[#11212D] xl:col-span-2 text-slate-200"
            >
              {productData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
