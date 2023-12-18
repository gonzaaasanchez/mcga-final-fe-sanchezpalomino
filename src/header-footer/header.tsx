import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase/firebase';
import './syle-sheet.css';
import ConfirmationDialog from '../utils/dialog';

const Header = () => {
  const navigate = useNavigate();
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleButtonClick = () => {
    if (userIsLogged) {
      setIsLogoutDialogOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false);
  }

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.log('error: ', error)
    }).finally(() => {
      setIsLogoutDialogOpen(false);
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
    <>
      <header className='container'>
        <strong>MCGA TP Final - Sanchez Palomino</strong>
        <button
          className={`login-button ${userIsLogged ? 'logout-button' : ''}`}
          onClick={handleButtonClick}>
          {userIsLogged ? 'Logout' : 'Login'}
        </button>
      </header>

      {isLogoutDialogOpen && (
        <ConfirmationDialog
          isOpen={isLogoutDialogOpen}
          title='¿Estás seguro que deseás cerrar sesión?'
          cancelText='Volver'
          onCancel={() => handleLogoutCancel()}
          confirmText='Cerrar sesión'
          onConfirm={() => logout()}
        />
      )}
    </>

  );
};

export default Header;