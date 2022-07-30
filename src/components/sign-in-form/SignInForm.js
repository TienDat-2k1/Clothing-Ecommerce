import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createUserDocumentFromAuth,
  signInAuthUserEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase';
import {
  emailSignInStart,
  signInWithGoogleStart,
} from '../../store/user/userSLice';
import Button from '../button/Button';
import FormInput from '../form-input/FormInput';

import './SignInForm.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

function SignInForm() {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const inputChangeHandler = e => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const formSubmitHandler = async e => {
    e.preventDefault();

    dispatch(emailSignInStart({ email, password }));
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(signInWithGoogleStart());
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form action="" onSubmit={formSubmitHandler}>
        <FormInput
          label="Email"
          type="text"
          required
          onChange={inputChangeHandler}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={inputChangeHandler}
          name="password"
          value={password}
        />
        <div className="btn-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
}
export default SignInForm;
