import { useState } from 'react';

import {} from '../../utils/firebase/firebase';
import { useDispatch } from 'react-redux/es/exports';
import { signUpStart } from '../../store/user/userSLice';
import './SignUpForm.scss';
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';

const init = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpForm() {
  const dispatch = useDispatch();

  const [hasError, setHasError] = useState();

  const [signUpFormInput, setSignUpFormInput] = useState(init);

  const { displayName, email, password, confirmPassword } = signUpFormInput;

  const formSubmitHandler = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setHasError('password do not match');
      return;
    }

    dispatch(signUpStart({ email, password, displayName }));
    setSignUpFormInput(init);
  };

  const inputHandlerChange = e => {
    const { name, value } = e.target;

    setSignUpFormInput({ ...signUpFormInput, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form action="" onSubmit={formSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={inputHandlerChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={inputHandlerChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={inputHandlerChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={inputHandlerChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
export default SignUpForm;
