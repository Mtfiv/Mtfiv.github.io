import React from 'react';
import { useAppContext } from '../context/AppContext';

const ShoppingCart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, setCurrentPage } = useAppContext();

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  return (
    <div className="shopping-cart">
      <h2>🛒 Tu Carrito de Figuras</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>No hay figuras en tu carrito</p>
          <button onClick={() => setCurrentPage('home')}>
            Descubrir Figuras
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <p>{item.product.series}</p>
                  <p className="item-price">
                    ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.product.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              🎌 Proceder al Pago
            </button>
            <button className="continue-btn" onClick={() => setCurrentPage('home')}>
              ← Seguir Comprando
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;