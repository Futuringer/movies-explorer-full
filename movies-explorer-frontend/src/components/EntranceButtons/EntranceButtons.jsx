import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './EntranceButtons.scss';

function EntranceButtons({ mainText, secondaryText, descText, link, disabled }) {
  return (
    <div className="entrance-buttons">
      <button disabled={disabled} type="submit" className="entrance-buttons__main-button">
        {mainText}
      </button>
      <p className="entrance-buttons__secondary-button">
        {`${descText} `}
        <NavLink className={() => "entrance-buttons__link"} to={link}>
          {secondaryText}
        </NavLink>
      </p>
    </div>
  );
}

export default EntranceButtons;
