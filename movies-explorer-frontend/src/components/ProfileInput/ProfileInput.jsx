import React from 'react';

import styles from './ProfileInput.scss';

function ProfileInput({ name, label, value, required, setValue, type, error }) {
  const handleOnChange = (e) => {
    const { value } = e.target;
    setValue(name, value);
  };

  return (
    <div className="profile-input__container">
      <div className="profile-input">
        <label className="profile-input__label">{label}</label>
        <input
          required={required}
          className="profile-input__field"
          name={name}
          type={type}
          value={value}
          onChange={handleOnChange}
        />
      </div>
      {error && <div className="profile-input__error">{error}</div>}
    </div>
  );
}

export default ProfileInput;
