import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllFigures, getFiguresOnOffer } from '../data/animeFigures';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const { setCurrentPage } = useAppContext();

  useEffect(() => {
    const allFigures = getAllFigures();
    setFeaturedProducts(allFigures.slice(0, 6));
    const offerFigures = getFiguresOnOffer();
    setOffers(offerFigures);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-banner">
        <h1>Bienvenido a Tienda de Figuras Anime</h1>
        <p>Las mejores figuras de anime importadas directamente desde Japón</p>
        <button onClick={() => setCurrentPage('categories')}>
          Ver Colección Completa
        </button>
      </section>

      <section className="offers-section">
        <h2>🔥 Ofertas Especiales</h2>
        <div className="products-grid">
          {offers.map(figure => (
            <ProductCard key={figure.id} product={figure} />
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2>⭐ Figuras Destacadas</h2>
        <div className="products-grid">
          {featuredProducts.map(figure => (
            <ProductCard key={figure.id} product={figure} />
          ))}
        </div>
      </section>

      <section className="categories-banner">
        <h3>Explora por Categorías</h3>
        <div className="category-buttons">
          <button onClick={() => setCurrentPage('categories')}>Shonen</button>
          <button onClick={() => setCurrentPage('categories')}>Shojo</button>
          <button onClick={() => setCurrentPage('categories')}>Seinen</button>
          <button onClick={() => setCurrentPage('categories')}>Mecha</button>
        </div>
      </section>
    </div>
  );
};

export default Home;