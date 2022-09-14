import React from 'react';
import cn from 'classnames';

import { NavLink } from 'react-router-dom';
import { LINKS } from '../../utils/constants';
import AccountMenu from '../AccountMenu/AccountMenu';
import close from '../../images/close.svg';

import styles from './NavigationPopup.scss';

function NavigationPopup({ isOpen, closeMenu }) {
  let popupClasses = cn('navigation-popup', isOpen && 'shown');

  return (
    <div className={popupClasses}>
      <div className="navigation-popup__content">
        <button className="navigation-popup__close-button" onClick={closeMenu}>
          <img className="navigation-popup__icon" src={close} alt="delete" />
        </button>
        <nav className="navigation-popup__list">
          <NavLink
            className={({ isActive }) =>
              'navigation-popup__button' + (isActive ? ' navigation-popup__button_active' : '')
            }
            to={LINKS.MAIN}
          >
            Главная
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              'navigation-popup__button' + (isActive ? ' navigation-popup__button_active' : '')
            }
            to={LINKS.MOVIES}
          >
            Фильмы
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              'navigation-popup__button' + (isActive ? ' navigation-popup__button_active' : '')
            }
            to={LINKS.SAVED_MOVIES}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <AccountMenu />
      </div>
    </div>
  );
}

export default NavigationPopup;
