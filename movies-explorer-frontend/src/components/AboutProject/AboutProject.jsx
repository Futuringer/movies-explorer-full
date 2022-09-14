import React from 'react';

import styles from './AboutProject.scss';

function AboutProject() {
  return (
    <section className="about">
    <h2 className="about__header">О проекте</h2>
    <div className="about__description-container">
      <div>
        <h3 className="about__subheader">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about__text">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
          финальные доработки.
        </p>
      </div>
      <div>
        <h3 className="about__subheader">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
          успешно защититься.
        </p>
      </div>
    </div>
    <div className="about__stages-bar">
      <div className="about__stage about__stage_filled">1 неделя</div>
      <div className="about__stage">4 недели</div>
      <div>
        <p className="about__stage-text">Back-end</p>
      </div>
      <div>
        <p className="about__stage-text">Front-end</p>
      </div>
    </div>
  </section >
  );
}

export default AboutProject;
