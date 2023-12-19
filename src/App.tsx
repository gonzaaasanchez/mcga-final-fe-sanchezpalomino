import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Header from './header-footer/header';
import Footer from './header-footer/footer';
import ProductsList from './products';
import ProductFormPage from './products_form';
import AuthPage from './auth';
import ProtectedRoute from './utils/protected_route';
import NotFoundASD from './utils/not-found';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Routes>
          <Route path='*' element={<NotFoundASD />} />
            <Route path='/' element={<ProductsList />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/product/add' element={<ProductFormPage />} />
              <Route path='/product/:id' element={<ProductFormPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
