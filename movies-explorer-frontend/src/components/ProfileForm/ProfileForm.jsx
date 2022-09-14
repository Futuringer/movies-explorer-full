import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import api from '../../utils/api/MainApi';
import ProfileInput from '../ProfileInput/ProfileInput';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import styles from './ProfileForm.scss';

function ProfileForm({ setActualUser, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [apiError, setApiError] = useState('');
  const [successStatus, setSuccessStatus] = useState('');

  const initialValues = { name: currentUser.name, email: currentUser.email };
  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^(?![\s.]+$)[a-zA-Zа-яёА-ЯЁ \-\s]*$/, 'Недопустимый символ')
      .min(2, 'Не меньше двух символов')
      .nullable(),
    email: Yup.string().email('Некорректный email').required('Это поле обязательно').nullable(),
  });
  const formik = useFormik({
    initialValues: { initialValues },
    validationSchema: ValidationSchema,
    onSubmit: (e) => {
      const { name, email } = values;
      api
        .changeMyInfo({ name: name, email: email })
        .then((res) => {
          setSuccessStatus('Данные успешно обновлены');
          setActualUser({ name: name, email: email });
        })
        .catch((err) => {
          console.log(err);
          setApiError(err?.split('"')[1]);
        });
    },
  });
  const { values, handleSubmit, errors, setFieldValue, touched } = formik;

  useEffect(() => {
    setFieldValue('name', initialValues.name);
    setFieldValue('email', initialValues.email);
  }, [currentUser]);

  const resetMessages = useCallback(() => {
    setApiError('');
    setSuccessStatus('');
  }, []);

  useEffect(() => {
    document.addEventListener('click', resetMessages);
    return () => {
      document.removeEventListener('click', resetMessages);
    };
  }, [resetMessages]);

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div>
        <h1 className="profile-form__header">Привет, {currentUser.name}</h1>
        <div className="profile-form__inputs-container">
          <div className="profile-form__input-container">
            <ProfileInput
              name="name"
              label="Имя"
              placeholder="Введите имя"
              value={values.name || ''}
              required
              setValue={setFieldValue}
              type="text"
              error={errors.name}
            ></ProfileInput>
          </div>
          <hr className="profile-form__separator" />
          <div className="profile-form__input-container">
            <ProfileInput
              name="email"
              label="E-mail"
              placeholder="Введите E-mail"
              value={values.email || ''}
              required
              setValue={setFieldValue}
              type="email"
              error={errors.email}
            ></ProfileInput>
          </div>
        </div>
      </div>
      <div className="profile-form__entrance-buttons">
        {apiError && <div className="profile-form__form-error">{apiError}</div>}
        {successStatus && <div className="profile-form__form-success">{successStatus}</div>}
        <button
        type='submit'
          disabled={
            !formik.isValid ||
            (values.name === initialValues.name && values.email === initialValues.email)
          }
          className="profile-form__entrance-button"
        >
          Редактировать
        </button>
        <button
          className="profile-form__entrance-button profile-form__entrance-button_type_leave"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
