import React from 'react';
import { NavLink } from 'react-router-dom';

import { LINKS } from '../../utils/constants';
import AccountLogo from '../../images/account-logo.svg';

import styles from './AccountMenu.scss';

function AccountMenu() {
  return (
    <NavLink className="account-menu" to={LINKS.PROFILE}>
      <p className="account-menu__account-text">Аккаунт</p>
      <div className="account-menu__image-container">
        <img src={AccountLogo} alt="link arrow" className="account-menu__link-image" />
      </div>
    </NavLink>
  );
}

export default AccountMenu;
