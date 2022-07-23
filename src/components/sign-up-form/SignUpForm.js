import { useReducer, useState } from 'react';

import {
  createAuthUserEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase';
import './SignUpForm.scss';
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';

const init = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAYNAME':
      return { ...state, displayName: action.payload.value };
    case 'EMAIL':
      return { ...state, email: action.payload.value };
    case 'PASSWORD':
      return { ...state, password: action.payload.value };
    case 'CONFIRMPASSWORD':
      return { ...state, confirmPassword: action.payload.value };

    default:
      return state;
  }
};

function SignUpForm() {
  const [hasError, setHasError] = useState();

  const [state, dispatch] = useReducer(formReducer, init);

  const { displayName, email, password, confirmPassword } = state;

  const formSubmitHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setHasError('password do not match');
      return;
    }

    try {
      const { user } = await createAuthUserEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      console.log('user creation encountered an error', error);
    }
  };

  const inputHandlerChange = e => {
    const { name } = e.target;

    switch (name) {
      case 'displayName':
        dispatch({
          type: 'DISPLAYNAME',
          payload: { value: e.target.value },
        });
        break;
      case 'email':
        dispatch({ type: 'EMAIL', payload: { value: e.target.value } });
        break;
      case 'password':
        dispatch({ type: 'PASSWORD', payload: { value: e.target.value } });
        break;
      case 'confirmPassword':
        dispatch({
          type: 'CONFIRMPASSWORD',
          payload: { value: e.target.value },
        });
        break;
      default:
        break;
    }
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
