import React from 'react';

import { NavLink } from 'react-router-dom';
import { LINKS } from '../../utils/constants';

import styles from './Navigation.scss';

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        className={({ isActive }) =>
          'navigation__button' + (isActive ? ' navigation__button_active' : '')
        }
        to={LINKS.MOVIES}
      >
        Фильмы
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'navigation__button' + (isActive ? ' navigation__button_active' : '')
        }
        to={LINKS.SAVED_MOVIES}
      >
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;
