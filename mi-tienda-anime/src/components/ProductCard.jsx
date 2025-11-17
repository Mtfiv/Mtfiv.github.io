import React from 'react';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== null;

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product);
      alert(`¡${product.name} agregado al carrito!`);
    }
  };

  return (
    <div className="product-card anime-figure-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.isOffer && <span className="badge offer-badge">🔥 OFERTA</span>}
        {!product.inStock && <span className="badge stock-badge">AGOTADO</span>}
        <span className="badge series-badge">{product.series}</span>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-series">{product.series}</p>
        <p className="product-category">Categoría: {product.category}</p>
        
        <div className="product-pricing">
          {hasDiscount ? (
            <>
              <span className="original-price">${product.price}</span>
              <span className="discount-price">${displayPrice}</span>
            </>
          ) : (
            <span className="normal-price">${displayPrice}</span>
          )}
        </div>
        
        <div className="product-rating">
          {'⭐'.repeat(Math.floor(product.rating))} ({product.rating})
        </div>
        
        <button 
          className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? '🛒 Agregar al Carrito' : 'AGOTADO'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;