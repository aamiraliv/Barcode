import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './hooks/useCart.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>,
)
