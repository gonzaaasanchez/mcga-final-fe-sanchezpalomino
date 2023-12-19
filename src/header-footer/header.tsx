import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase/firebase.ts';
import { cleanUserData } from '../utils/auth_helper.tsx';
import ConfirmationDialog from '../utils/dialog/index.tsx';
import './syle-sheet.css';

const Header = () => {
  const navigate = useNavigate();
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const showHome = () => {
    navigate('/', { replace: true })
  }

  const handleButtonClick = () => {
    if (userIsLogged) {
      setIsLogoutDialogOpen(true);
    } else {
      navigate('/auth');
    }
  };

  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false);
  }

  const logout = () => {
    signOut(auth).then(() => {
      cleanUserData();
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
        setUserName(user.email);
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
        <button className="home-button" onClick={showHome}>
          🏠
        </button>
        <div>
          <strong>MCGA TP Final - Sanchez Palomino</strong>
          <div className='user-info'>Usuario: {userIsLogged ? userName : 'no logueado'}</div>
        </div>
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