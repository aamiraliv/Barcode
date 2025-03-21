import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from './hooks/useCart.jsx';
import "./index.css";
// import { Provider } from "react-redux";
// import { store } from "./state/store.js";

createRoot(document.getElementById("root")).render(
  <>
    {/* <Provider store={store}> */}
    {/*   <App /> */}
    {/* </Provider> */}
    <CartProvider>
      <App />
    </CartProvider>
  </>
);
