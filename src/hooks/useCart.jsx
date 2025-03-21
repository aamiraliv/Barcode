// import { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import api from "../../services/api";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
    
//     if (storedUser) {
//       api
//         .get(`/users/${storedUser.id}`)
//         .then((response) => {
//           const userCart = response.data.userCart || [];
//           setCart(userCart);
//           localStorage.setItem("cart", JSON.stringify(userCart));
//         })
//         .catch((error) => {
//           console.error("Failed to fetch cart from server:", error);
//           const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//           setCart(storedCart);
//         });
//     }
//   }, []);

//   useEffect(() => {
//     if (!user || cart.length === 0) return;

//     const timeout = setTimeout(() => {
//       if (user) {
//         api
//           .patch(`/users/${user.id}`, { userCart: cart || [] })
//           .then((response) =>
//             console.log("Cart synced to server", response.data)
//           )
//           .catch((error) => console.error("Failed to sync cart", error));

//         localStorage.setItem("cart", JSON.stringify(cart));
//       }
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [cart, user]);

//   const addToCart = (product, quantity = 1) => {
//     if (!user) {
//       // alert(" Please login to add product to cart ");
//       toast.warn('Please login to add product to cart')
//       return;
//     } else {
//       setCart((prevCart) => {
//         const existingItem = prevCart.find((item) => item.id === product.id);

//         if (existingItem) {
//           toast.info(`${product.name} quantity increased`);
//           return prevCart.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + quantity }
//               : item
//           );
//         } else {
//           toast.success(`${product.name} added to cart`);
//           return [...prevCart, { ...product, quantity }];
//         }
//       });
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//     toast.success('Item removed from cart')
//   };

//   const updateQuantity = (productId, quantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//     toast.info('Item quantity updated');
//   };

//   const clearCart = () => {
//     if (!user) return;

//     setCart([]);

//     localStorage.removeItem("cart");

//     api
//       .patch(`/users/${user.id}`, { userCart: [] })
//       .then(() => {
//         console.log("Cart cleared successfully on server");
//       })
//       .catch((error) => {
//         console.error("Failed to clear cart on server:", error);
//       });
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


// export const useCart = () => useContext(CartContext);
