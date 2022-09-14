import React from 'react';

import LinkArrow from '../../images/link-arrow.svg';

import styles from './Portfolio.scss';

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__header">Портфолио</p>
      <ul className="portfolio__links-list">
        <li className="portfolio__links-item">
          <div className="portfolio__links-text">
            <a href="https://github.com/Futuringer/how-to-learn" target="_blank" className="portfolio__link">
              Статичный сайт
            </a>
            <img src={LinkArrow} alt="link arrow" className="portfolio__link-image" />
          </div>
          <hr className="portfolio__separator" />
        </li>
        <li className="portfolio__links-item">
          <div className="portfolio__links-text">
            <a href="https://github.com/Futuringer/russian-travel" target="_blank" className="portfolio__link">
              Адаптивный сайт
            </a>
            <img src={LinkArrow} alt="link arrow" className="portfolio__link-image" />
          </div>
          <hr className="portfolio__separator" />
        </li>
        <li className="portfolio__links-item">
          <div className="portfolio__links-text">
            <a href="https://github.com/Futuringer/react-mesto-auth" target="_blank" className="portfolio__link">
              Одностраничное приложение
            </a>
            <img src={LinkArrow} alt="link arrow" className="portfolio__link-image" />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
