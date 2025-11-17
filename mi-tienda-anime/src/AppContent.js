import React from 'react';
import { useAppContext } from './context/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

const AppContent = () => {
  const { currentPage, addOrder } = useAppContext();

  const handleOrderComplete = (orderResult) => {
    if (orderResult.success) {
      addOrder(orderResult);
    }
  };

  const handleContinueShopping = () => {
    window.location.reload(); // Recargar para limpiar estado
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'categories':
        return <Categories />;
      case 'offers':
        return <Offers />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout onOrderComplete={handleOrderComplete} />;
      case 'success':
        return <Success onContinueShopping={handleContinueShopping} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default AppContent;