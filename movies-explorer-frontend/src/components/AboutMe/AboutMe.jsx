import React from 'react';

import avatar from '../../images/avatar.png';

import styles from './AboutMe.scss';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__description-container">
          <div>
            <h3 className="about-me__name">Владислав</h3>
            <p className="about-me__status">Фронтенд-разработчик, 28 лет.</p>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и
              дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
              работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>

          <div className="about-me__media-links">
            <a href="https://www.facebook.com" className="about-me__media-link" target="_blank">Facebook</a>
            <a href="https://github.com/Futuringer" className="about-me__media-link" target="_blank">Github</a>
          </div>
        </div>
        <img src={avatar} alt="Abstract ovals" className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;
