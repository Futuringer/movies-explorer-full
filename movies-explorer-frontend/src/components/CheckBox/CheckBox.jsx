import React from 'react';

import styles from './CheckBox.scss';

function CheckBox({ shortFilmChecked, handleShortFilmChange }) {
  return (
    <label className="checkbox__label">
      <input
        className="checkbox__checkbox"
        type="checkbox"
        checked={shortFilmChecked}
        onChange={handleShortFilmChange}
      />
    </label>
  );
}

export default CheckBox;
