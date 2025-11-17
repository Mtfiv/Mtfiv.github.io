import React, { useState } from 'react';

const CheckoutForm = ({ cartItems, onOrderComplete, onBackToCart }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    return (
      formData.customerName &&
      formData.email &&
      formData.address &&
      formData.cardNumber &&
      formData.cardExpiry &&
      formData.cardCVC
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simular procesamiento de pago
      setTimeout(() => {
        const isSuccess = Math.random() > 0.1; // 90% éxito
        
        if (isSuccess) {
          const total = cartItems.reduce((sum, item) => {
            const price = item.product.discountPrice || item.product.price;
            return sum + (price * item.quantity);
          }, 0);
          
          onOrderComplete({
            success: true,
            orderId: `ORD-${Date.now()}`,
            total: total,
            customer: formData.customerName,
            email: formData.email,
            items: cartItems
          });
        } else {
          alert('Pago rechazado: Fondos insuficientes o problema con la tarjeta');
        }
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      alert(`Error en el pago: ${error}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-form">
      <h2>🎌 Finalizar Compra</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>📦 Información de Envío</h4>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                name="customerName"
                placeholder="Nombre completo *"
                value={formData.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <input
            type="text"
            name="address"
            placeholder="Dirección completa *"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="zipCode"
                placeholder="Código Postal"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>💳 Información de Pago</h4>
          <input
            type="text"
            name="cardNumber"
            placeholder="Número de tarjeta *"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                name="cardExpiry"
                placeholder="MM/AA *"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="cardCVC"
                placeholder="CVC *"
                value={formData.cardCVC}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="checkout-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onBackToCart}
          >
            ← Volver al Carrito
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isProcessing || cartItems.length === 0}
          >
            {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;