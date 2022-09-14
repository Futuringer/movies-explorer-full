import SignInForm from '../../components/SignInForm/SignInForm';

import styles from './Login.scss';

function Login({ ...restProps }) {
  return (
    <div className="register__container">
      <SignInForm {...restProps}></SignInForm>
    </div>
  );
}

export default Login;
