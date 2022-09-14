import React from 'react';

import styles from './Techs.scss';

const technologiesList = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

function Techs() {
  return (
    <section className="technologies">
      <h2 className="technologies__header">Технологии</h2>
      <div className="technologies__text-container">
        <h3 className="technologies__subheader">7 технологий</h3>
        <p className="technologies__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="technologies__list">
          {technologiesList.map((item) => (
            <li key={item} className="technologies__list-item">{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Techs;
