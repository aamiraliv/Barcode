import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import DisplayProducts from "./pages/DisplayProducts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

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
]);

const App = () => {
  // return <RouterProvider router={router} />;
  return (
    <>
      
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
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
    </>
  );
};

export default App;
