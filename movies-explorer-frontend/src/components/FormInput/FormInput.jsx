import React from 'react';
import cn from 'classnames';

import styles from './FormInput.scss';

function FormInput({ name, label, placeholder, value, error, required, setValue, type, onBlur }) {
  const handleOnChange = (e) => {
    const { value } = e.target;
    setValue(name, value);
  };

  const fieldClasses = cn(error && "input__field_error", "input__field")
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input
        className={fieldClasses}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
}

export default FormInput;
