import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Header from './header-footer/header.tsx';
import Footer from './header-footer/footer.tsx';
import ProductsList from './products/index.tsx';
import ProductFormPage from './products_form/index.tsx';
import AuthPage from './auth/index.tsx';
import ProtectedRoute from './utils/protected_route.tsx';
import NotFoundPage from './utils/not-found.tsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
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
