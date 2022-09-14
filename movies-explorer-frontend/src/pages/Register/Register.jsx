import SignUpForm from '../../components/SignUpForm/SignUpForm';

import styles from './Register.scss';

function Register({ ...restProps }) {
  return (
    <div className="register__container">
      <SignUpForm {...restProps}></SignUpForm>
    </div>
  );
}

export default Register;
