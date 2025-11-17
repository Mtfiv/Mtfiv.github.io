/**
 * Servicio de simulación de compra
 * Maneja todo el proceso de checkout y pago
 */

/**
 * Simular proceso de pago
 */
export const simulatePayment = (orderData, cartItems) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const total = cartItems.reduce((sum, item) => {
        const price = item.product.discountPrice || item.product.price;
        return sum + (price * item.quantity);
      }, 0);
      
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        resolve({
          success: true,
          orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          total: total,
          customer: orderData.customerName,
          email: orderData.email,
          shippingAddress: orderData.address,
          items: cartItems
        });
      } else {
        reject({
          success: false,
          error: "Pago rechazado: Fondos insuficientes o problema con la tarjeta",
          code: "PAYMENT_FAILED"
        });
      }
    }, 2000);
  });
};

/**
 * Generar resumen de orden
 */
export const generateOrderSummary = (cartItems, customerData) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
  
  const shipping = 15.00;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;
  
  return {
    customer: customerData,
    items: cartItems,
    summary: {
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total
    },
    orderDate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  };
};