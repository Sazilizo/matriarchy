import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoute';
import Header from './Header';

function App() {

  const location = useLocation();

  const isProductPage = location.pathname.startsWith("/products/product");

  return (
    <div className="App">

      {!isProductPage && <Header />}

      <AppRoutes/>

    </div>
  );
}

export default App;