import React from 'react';

import styles from './Footer.scss';

function Footer({ children }) {
  return (
    <div className="footer">
      <div className="footer__intro-text">Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <div className="footer__nav-container">
        <nav className="footer__nav">
          <div className="footer__year">&#169; 2022</div>
          <ul className="footer__links-list">
            <li className="footer__list-item">
              <a
                href="https://practicum.yandex.ru/profile/web/"
                target="_blank"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a
                href="https://github.com/Futuringer/how-to-learn"
                target="_blank"
                className="footer__link"
              >
                Github
              </a>
            </li>
            <li className="footer__list-item">
              {' '}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="footer__link"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
