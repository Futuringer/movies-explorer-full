import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import api from '../../utils/api/MainApi';
import { LINKS } from '../../utils/constants';
import FormInput from '../FormInput/FormInput';
import HeaderLogo from './../HeaderLogo/HeaderLogo.jsx';
import EntranceButtons from '../EntranceButtons/EntranceButtons';

import styles from './SignUpForm.scss';

function SignUpForm({ setLoggedIn, setActualUser }) {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const initialValues = { name: '', email: '', password: '' };
  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Это поле обязательно')
      .matches(/^(?![\s.]+$)[a-zA-Zа-яёА-ЯЁ \-\s]*$/, 'Недопустимый символ')
      .required('Это поле обязательно')
      .nullable(),
    email: Yup.string().email('Некорректный email').required('Это поле обязательно').nullable(),
    password: Yup.string().required('Это поле обязательно').nullable(),
  });
  const formik = useFormik({
    initialValues: { initialValues },
    validationSchema: ValidationSchema,
    onSubmit: () => {
      const { name, email, password } = values;
      api
        .register({ name: name, email: email, password: password })
        .then((res) => {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', JSON.stringify(true));
          navigate(LINKS.MOVIES);
          return api
            .login({ email: email, password: password })
            .then((res) => {
              setActualUser({ email: email, name: name });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          setApiError(err?.split('"')[1]);
        });
    },
  });
  const { values, handleSubmit, errors, setFieldValue, touched, handleBlur, validateForm } = formik;

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
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="sign-up-form__logo">
        <HeaderLogo />
      </div>
      <h1 className="sign-up-form__header">Добро пожаловать!</h1>
      <div className="sign-up-form__inputs-container">
        <div className="sign-up-form__input-container">
          <FormInput
            name="name"
            label="Имя"
            placeholder="Введите имя"
            value={values.name || initialValues.name}
            required
            setValue={setFieldValue}
            type="text"
            error={touched.name && errors.name}
            onBlur={handleBlur}
          ></FormInput>
        </div>
        <div className="sign-up-form__input-container">
          <FormInput
            name="email"
            label="E-mail"
            placeholder="Введите E-mail"
            value={values.email || initialValues.email}
            required
            setValue={setFieldValue}
            type="email"
            error={touched.email && errors.email}
            onBlur={handleBlur}
          ></FormInput>
        </div>
        <div className="sign-up-form__input-container">
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
      <div className="sign-up-form__entrance-buttons">
        {apiError && <div className="sign-up-form__form-error">{apiError}</div>}
        <EntranceButtons
          mainText="Зарегистрироваться"
          descText="Уже зарегистрированы?"
          secondaryText="Войти"
          link="/signin"
          disabled={!formik.isValid}
        ></EntranceButtons>
      </div>
    </form>
  );
}

export default SignUpForm;
