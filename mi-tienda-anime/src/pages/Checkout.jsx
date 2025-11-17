import React from 'react';
import { useAppContext } from '../context/AppContext';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = ({ onOrderComplete }) => {
  const { cart, setCurrentPage } = useAppContext();

  const subtotal = cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  const shipping = 15.00;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>🎌 Finalizar Compra</h1>
        
        <div className="row">
          <div className="col-md-5">
            <div className="order-summary">
              <h3>Resumen de tu Pedido</h3>
              
              {cart.map(item => (
                <div key={item.product.id} className="order-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="item-details">
                    <h5>{item.product.name}</h5>
                    <p>{item.product.series}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p className="price">
                      ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Envío:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>IVA (19%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-7">
            <CheckoutForm 
              cartItems={cart}
              onOrderComplete={onOrderComplete}
              onBackToCart={() => setCurrentPage('cart')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;