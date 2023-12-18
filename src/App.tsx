import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Header from './header-footer/header';
import Footer from './header-footer/footer';
import ProductsList from './products';
import ProductFormPage from './products_form';
import AuthPage from './auth';
import ProtectedRoute from './utils/protected_route';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<ProductsList />} />
            <Route path='/product/add' element={
              <ProtectedRoute userToken={'asd'}> <ProductFormPage /> </ProtectedRoute>
            } />
            <Route path='/product/:id' element={
              <ProtectedRoute userToken={'asd'}> <ProductFormPage /> </ProtectedRoute>
            } />
            <Route path='/auth' element={<AuthPage />} />
          </Routes>
        </main>
        <Footer /> 
      </>
    </BrowserRouter>
  );
}

export default App;
