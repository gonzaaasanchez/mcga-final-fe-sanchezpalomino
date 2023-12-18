import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase/firebase';
import './syle-sheet.css';

const Header = () => {
  const navigate = useNavigate();
  const [userIsLogged, setUserIsLogged] = useState(false);

  const handleButtonClick = () => {
    if (userIsLogged) {
      logout();
    } else {
      navigate('/login');
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.log('error: ', error)
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user)
        setUserIsLogged(true);
      } else {
        setUserIsLogged(false);
        logout();
      }
    });

  }, [])

  return (
    <header className='container'>
      <strong>MCGA TP Final - Sanchez Palomino</strong>
      <button
        className={`login-button ${userIsLogged ? 'logout-button' : ''}`}
        onClick={handleButtonClick}>
        {userIsLogged ? 'Logout' : 'Login'}
      </button>
    </header>
  );
};

export default Header;