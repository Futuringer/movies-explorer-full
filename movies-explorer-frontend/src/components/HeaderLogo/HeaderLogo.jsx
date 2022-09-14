import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '../../utils/constants';

import styles from './HeaderLogo.scss';

function HeaderLogo() {
  const navigate = useNavigate();
  const handleOnLogoClick = () => {
    navigate(LINKS.MAIN);
  };
  
  return <div className="header-logo" onClick={handleOnLogoClick}></div>;
}

export default HeaderLogo;
