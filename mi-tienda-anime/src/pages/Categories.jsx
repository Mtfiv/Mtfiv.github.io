import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getFiguresByCategory, categories } from '../data/animeFigures';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [products, setProducts] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filteredProducts = getFiguresByCategory(category);
    setProducts(filteredProducts);
  };

  React.useEffect(() => {
    handleCategoryChange('Todos');
  }, []);

  return (
    <div className="categories-page">
      <h1>🎌 Figuras por Categoría</h1>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="results-info">
        <p>
          Mostrando {products.length} figura{products.length !== 1 ? 's' : ''} 
          {selectedCategory !== 'Todos' && ` en ${selectedCategory}`}
        </p>
      </div>

      <div className="products-grid">
        {products.map(figure => (
          <ProductCard 
            key={figure.id} 
            product={figure} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <p>No se encontraron figuras en esta categoría</p>
        </div>
      )}
    </div>
  );
};

export default Categories;