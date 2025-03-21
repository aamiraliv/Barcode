import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/page/AdminDashboard";
import ManageOrders from "./admin/page/ManageOrders";
import ManageProducts from "./admin/page/ManageProducts";
import ManageUsers from "./admin/page/ManageUsers";
import ProductEdit from "./admin/page/ProductEdit";
import ViewUser from "./admin/page/ViewUser";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
import DisplayProducts from "./pages/DisplayProducts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import { Toaster } from "react-hot-toast";
import { Wishlist } from "./pages/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/cart", element: <Cart /> },
      { path: "/products/:browseCategory", element: <DisplayProducts /> },
      { path: "/view/:id", element: <ProductDetails /> },
      { path: "/user", element: <Profile /> },
      { path: "/wishlist", element: <Wishlist />} 
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/products",
        element: <ManageProducts />,
      },
      {
        path: "/admin/orders",
        element: <ManageOrders />,
      },
      {
        path: "/admin/users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/productForm",
        element: <ProductEdit />,
      },
      {
        path: "/admin/users/:id",
        element: <ViewUser />,
      },
    ],
  },
]);

const App = () => {
  // return <RouterProvider router={router} />;
  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="toast-custom"
        bodyClassName="toast-body-custom"
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
