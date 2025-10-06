import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const quantity = parseInt(action.payload.quantity) || 1;
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.options === JSON.stringify(action.payload.options)
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && 
            item.options === JSON.stringify(action.payload.options)
              ? { ...item, quantity: (parseInt(item.quantity) || 0) + quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { 
            ...action.payload, 
            quantity: quantity,
            options: JSON.stringify(action.payload.options || {})
          }]
        };
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: parseInt(action.payload.quantity) || 1 }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  // Initialize state from localStorage or empty array
  const [state, dispatch] = useReducer(cartReducer, {
    items: JSON.parse(localStorage.getItem('cartItems')) || []
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => {
    const cartId = Date.now() + Math.random();
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, cartId }
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: cartId
    });
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { cartId, quantity }
      });
    }
  };

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART'
    });
    localStorage.removeItem('cartItems');
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => {
      const quantity = parseInt(item.quantity) || 0;
      return total + quantity;
    }, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};