import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';
import AccountMenu from '../AccountMenu/AccountMenu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';

import styles from './Header.scss';

function Header({ loggedIn, children, openPopup }) {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(LINKS.SIGN_UP);
  };

  const handleLoginClick = () => {
    navigate(LINKS.SIGN_IN);
  };

  return (
    <div className="header">
      {loggedIn ? (
        <>
          <HeaderLogo />
          <div className="header__navigation">
            <Navigation />
          </div>
          <div className="header__account-menu">
            <AccountMenu />
          </div>
          <div className="header__hamburger-container" onClick={openPopup}>
            <div className="header__hamburger" />
          </div>
        </>
      ) : (
        <>
          <HeaderLogo />
          <div className="header__buttons-container">
            <button className="header__button" onClick={handleRegisterClick}>
              Регистрация
            </button>
            <button className="header__button header__button_active" onClick={handleLoginClick}>
              Войти
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
