/**
 * Funciones auxiliares para manejar el carrito
 * Operaciones del carrito de compras
 */

/**
 * Agregar producto al carrito
 */
export const addToCart = (cart, product) => {
  const existingItem = cart.find(item => item.product.id === product.id);
  
  if (existingItem) {
    return cart.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...cart, { product, quantity: 1 }];
  }
};

/**
 * Actualizar cantidad de un producto en el carrito
 */
export const updateCartQuantity = (cart, productId, newQuantity) => {
  if (newQuantity <= 0) {
    return cart.filter(item => item.product.id !== productId);
  }
  
  return cart.map(item =>
    item.product.id === productId
      ? { ...item, quantity: newQuantity }
      : item
  );
};

/**
 * Eliminar producto del carrito
 */
export const removeFromCart = (cart, productId) => {
  return cart.filter(item => item.product.id !== productId);
};

/**
 * Calcular total de items en el carrito
 */
export const getCartItemsCount = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Calcular precio total del carrito
 */
export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);
};