import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { getCartItemsCount, setCurrentPage } = useAppContext();

  return (
    <header className="header anime-header">
      <div className="logo" onClick={() => setCurrentPage('home')}>
        <h1>🎌 Tienda de Figuras Anime</h1>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li><button onClick={() => setCurrentPage('home')}>Inicio</button></li>
          <li><button onClick={() => setCurrentPage('categories')}>Categorías</button></li>
          <li><button onClick={() => setCurrentPage('offers')}>Ofertas</button></li>
          <li><button onClick={() => setCurrentPage('cart')}>Carrito</button></li>
        </ul>
      </nav>
      
      <div className="cart-icon" onClick={() => setCurrentPage('cart')}>
        <span>🛒</span>
        {getCartItemsCount() > 0 && (
          <span className="cart-count">{getCartItemsCount()}</span>
        )}
      </div>
    </header>
  );
};

export default Header;