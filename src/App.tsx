import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './header-footer/header';
import Footer from './header-footer/footer';
import ProductsList from './products';
import ProductFormPage from './products_form';
import LoginPage from './login';


function App() {
  return (
    <Router>
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductFormPage />} />
            <Route path="/product/add" element={<ProductFormPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
