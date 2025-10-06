import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>Your cart is currently empty</p>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>No items in your cart</h2>
            <p>Start shopping to add items to your cart</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{getTotalItems()} item(s) in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.cartId} className="cart-item">
                <div className="item-info">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    {item.options && (() => {
                      try {
                        const options = typeof item.options === 'string' ? JSON.parse(item.options) : item.options;
                        return Object.keys(options).length > 0 && (
                          <div className="item-options">
                            <strong>Options:</strong>
                            {Object.entries(options).map(([key, value]) => (
                              <span key={key} className="option">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        );
                      } catch (e) {
                        return null;
                      }
                    })()}
                  </div>
                </div>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  

                  
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({getTotalItems()})</span>
                <span>Contact for pricing</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Contact for details</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>Contact for quote</span>
              </div>
              
              <div className="cart-actions">
                <Link to="/place-order" className="checkout-btn">
                  Proceed to Checkout
                </Link>
                <button onClick={clearCart} className="clear-cart-btn">
                  Clear Cart
                </button>
                <Link to="/products" className="continue-shopping-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;