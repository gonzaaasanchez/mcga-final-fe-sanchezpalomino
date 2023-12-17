import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductsList from './products';
import ProductFormPage from './products_form';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductFormPage />} />
        <Route path="/product/add" element={<ProductFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
