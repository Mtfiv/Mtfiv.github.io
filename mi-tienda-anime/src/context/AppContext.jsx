import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  cart: [],
  user: null,
  currentPage: 'home',
  orderHistory: []
};

// Tipos de acciones
export const ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_USER: 'SET_USER',
  ADD_ORDER: 'ADD_ORDER'
};

// Reducer para manejar estado global
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product: action.payload, quantity: 1 }]
        };
      }

    case ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case ACTION_TYPES.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== action.payload.productId)
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case ACTION_TYPES.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ACTION_TYPES.ADD_ORDER:
      return {
        ...state,
        orderHistory: [...state.orderHistory, action.payload],
        cart: []
      };

    default:
      return state;
  }
};

// Crear contexto
const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Acciones
  const addToCart = (product) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: ACTION_TYPES.UPDATE_QUANTITY, payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_CART });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: ACTION_TYPES.SET_CURRENT_PAGE, payload: page });
  };

  const setUser = (user) => {
    dispatch({ type: ACTION_TYPES.SET_USER, payload: user });
  };

  const addOrder = (order) => {
    dispatch({ type: ACTION_TYPES.ADD_ORDER, payload: order });
  };

  // Calcular total del carrito
  const getCartTotal = () => {
    return state.cart.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Contar items en carrito
  const getCartItemsCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    // Estado
    ...state,
    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCurrentPage,
    setUser,
    addOrder,
    // Calculados
    getCartTotal,
    getCartItemsCount
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
};