import React from 'react';
import './syle-sheet.css';

const Header = () => {

  const openExternalLink = (url: string | URL | undefined) => {
    window.open(url, '_blank');
  };


  return (
    <footer className='container footer-container'>
      <span>© 2023 - </span>
      <button
        type='button'
        className='underlined-button'
        onClick={() => openExternalLink('https://github.com/gonzaaasanchez/mcga-final-fe-sanchezpalomino')}
      >
        FE Repo
      </button>
      <button
        type='button'
        className='underlined-button'
        onClick={() => openExternalLink('https://github.com/gonzaaasanchez/mcga-final-be-sanchezpalomino')}
      >
        BE Repo
      </button>
    </footer>
  );
};

export default Header;