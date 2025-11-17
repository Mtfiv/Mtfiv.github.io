import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getFiguresOnOffer } from '../data/animeFigures';

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const offerFigures = getFiguresOnOffer();
    setOffers(offerFigures);
  }, []);

  return (
    <div className="offers-page">
      <h1>🔥 Ofertas Especiales</h1>
      <p>¡Aprovecha nuestros descuentos en figuras seleccionadas!</p>
      
      <div className="products-grid">
        {offers.map(figure => (
          <ProductCard 
            key={figure.id} 
            product={figure} 
          />
        ))}
      </div>

      {offers.length === 0 && (
        <div className="no-offers">
          <p>No hay ofertas disponibles en este momento</p>
        </div>
      )}
    </div>
  );
};

export default Offers;