import React from 'react';
import { useAppContext } from '../context/AppContext';

const Success = ({ onContinueShopping }) => {
  const { orderHistory } = useAppContext();
  const lastOrder = orderHistory[orderHistory.length - 1];

  if (!lastOrder) {
    return (
      <div className="success-page">
        <div className="container">
          <h2>Orden no encontrada</h2>
          <button onClick={onContinueShopping}>
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-message">
          <div className="success-icon">🎉</div>
          <h1>¡Compra Exitosa!</h1>
          <p className="success-text">
            Gracias por tu compra, <strong>{lastOrder.customer}</strong>
          </p>
          <p>Hemos enviado un correo de confirmación a: {lastOrder.email}</p>
          
          <div className="order-details">
            <h3>Detalles de tu Orden</h3>
            <p><strong>Número de Orden:</strong> {lastOrder.orderId}</p>
            <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES')}</p>
            <p><strong>Total:</strong> ${lastOrder.total.toFixed(2)}</p>
          </div>

          <div className="purchased-items">
            <h4>Figuras que compraste:</h4>
            {lastOrder.items.map(item => (
              <div key={item.product.id} className="purchased-item">
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <h5>{item.product.name}</h5>
                  <p>Cantidad: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            🎌 Seguir Comprando Figuras
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;