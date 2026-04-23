import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { getCartItemsWithProduct, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const cartItems = getCartItemsWithProduct();
  const navigate = useNavigate()
  const total = getCartTotal()

  function placeOrder(users) {
    if(!user) {
      alert('You need to Sign In first!');
      navigate('/auth');
    } else { 
      alert('Successful Order!');
    clearCart();
    }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="page-title">
          <div className="checkout-container">
            <div className="checkout-items">
              <h2 className="checkout-section-title">Order Summary</h2>
              {cartItems.map((item) => (
                <div className="checkout-item">
                  <img
                    className="checkout-item-image"
                    src={item.product.image}
                    alt={item.product.name}
                  />
                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.product.name}</h3>
                    <p className="checkout-item-price">{item.product.price} each</p>
                  </div>

                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">-</button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                    </div>

                    <p className="checkout-item-total">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-secondary btn-small">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary">
              <h2 className="checkout-section-title">Total</h2>
              <div className="checkout-total">
                <p className="checkout-total-label">Subtotal:</p>
                <p className="checkout-total-value">${total.toFixed(2)}</p>
              </div>
              <div className="checkout-total">
                <p className="checkout-total-label">Total:</p>
                <p className="checkout-total-value">${total.toFixed(2)}</p>
              </div>
              <button onClick={placeOrder} className="btn btn-primary btn-large btn-block">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
