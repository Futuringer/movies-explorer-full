import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFound.scss';

function NotFound() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__texts">
          <h1 className="not-found__error">404</h1>
          <p className="not-found__description">Страница не найдена</p>
        </div>
        <button className="not-found__button" onClick={handleBackClick}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default NotFound;
