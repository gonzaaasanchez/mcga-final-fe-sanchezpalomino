import React from 'react';
import { useNavigate } from 'react-router-dom';
import './syle-sheet.css';

const Header = () => {

  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    const userLogged = false;
    if (userLogged) {
      // logout popup
     }
    else {
      navigate('/login');
    }
  };

  return (
    <header className="container">
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