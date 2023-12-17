import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {

  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/');
  };

  return (
    <header className="header-container">
      <strong>MCGA TP Final - Sanchez Palomino</strong>
      <button
        className="login-button"
        onClick={handleLoginButtonClick}>
        Login
      </button>
    </header>
  );
};

export default Header;