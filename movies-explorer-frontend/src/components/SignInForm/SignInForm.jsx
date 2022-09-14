import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '../../utils/constants';
import api from '../../utils/api/MainApi';
import FormInput from '../FormInput/FormInput';
import HeaderLogo from '../HeaderLogo/HeaderLogo.jsx';
import EntranceButtons from '../EntranceButtons/EntranceButtons';

import styles from './SignInForm.scss';

function SignInForm({ setLoggedIn, setActualUser }) {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const initialValues = { email: '', password: '' };
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Некорректный email').required('Это поле обязательно').nullable(),
    password: Yup.string().required('Это поле обязательно').nullable(),
  });
  const formik = useFormik({
    initialValues: { initialValues },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      api
        .login({ email: email, password: password })
        .then((res) => {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', JSON.stringify(true));
          navigate(LINKS.MOVIES);
          return api
            .getMyInfo()
            .then((res) => {
              setActualUser(res);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          setApiError(err?.split('"')[1]);
        });
    },
  });
  const { values, handleSubmit, errors, touched, setFieldValue, handleBlur, validateForm } = formik;

  const resetErrors = useCallback(() => {
    setApiError('');
  }, []);

  useEffect(() => {
    document.addEventListener('click', resetErrors);
    return () => {
      document.removeEventListener('click', resetErrors);
    };
  }, [resetErrors]);

  useEffect(()=>{
    validateForm();
  },[])

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <div className="sign-in-form__logo">
        <HeaderLogo />
      </div>
      <h1 className="sign-in-form__header">Рады видеть!</h1>
      <div className="sign-in-form__inputs-container">
        <div className="sign-in-form__input-container">
          <FormInput
            name="email"
            label="E-mail"
            placeholder="Введите E-mail"
            value={values.email || initialValues.email}
            required
            setValue={setFieldValue}
            error={touched.email && errors.email}
            onBlur={handleBlur}
          ></FormInput>
        </div>
        <div className="sign-in-form__input-container">
          <FormInput
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={values.password || initialValues.password}
            required
            setValue={setFieldValue}
            type="password"
            error={touched.password && errors.password}
            onBlur={handleBlur}
          ></FormInput>
        </div>
      </div>
      <div className="sign-in-form__entrance-buttons">
        {apiError && <div className="sign-in-form__form-error">{apiError}</div>}
        <EntranceButtons
          mainText="Войти"
          descText="Ещё не зарегистрированы?"
          secondaryText="Регистрация"
          link="/signup"
          disabled={!formik.isValid}
        ></EntranceButtons>
      </div>
    </form>
  );
}

export default SignInForm;
