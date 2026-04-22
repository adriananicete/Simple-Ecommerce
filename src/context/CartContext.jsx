import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId) {
    const existingId = cartItems.find((item) => item.id === productId);
    if (existingId) {
      const currentQuantity = existingId.quantity;

      const updatedCartItems = cartItems.map((item) => {
        return item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProduct() {
    return cartItems.map(item => ({...item, product: getProductById(item.id)})).filter(item => item.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  function updateQuantity(productId, quantity) {
    if(quantity <= 0) {
      removeFromCart(productId);
      return;
    } else {
      setCartItems(cartItems.map(item => item.id === productId ? {...item,quantity} : item))
    }
    
  }

  

  return <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, getCartItemsWithProduct, removeFromCart}}>{children}</CartContext.Provider>;
}

export default CartProvider;

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
