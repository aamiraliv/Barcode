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
import { AdminLogin } from "./admin/page/AdminLogin";

import UnauthorizedPage from "./admin/page/UnauthorizedPage";
import AdminProtectedRoute from "./utils/AdminProtectedRoute ";
import useAutoRefreshToken from "./hooks/useAutoRefreshToken";

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
      { path: "/wishlist", element: <Wishlist /> },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
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
    path: "adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "products",
            element: <ManageProducts />,
          },
          {
            path: "orders",
            element: <ManageOrders />,
          },
          {
            path: "users",
            element: <ManageUsers />,
          },
          {
            path: "productForm",
            element: <ProductEdit />,
          },
          {
            path: "users/:id",
            element: <ViewUser />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  useAutoRefreshToken();
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
