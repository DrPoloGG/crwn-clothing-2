import { useState } from 'react';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utilities/firebase/firebase.utilities';

import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert ('Incorrect password!');
          break;
        case 'auth/user-not-found':
          alert ('Incorrect email!');
          break;
        default:
          console.log(error);
          break;
        }
        resetFormFields();
    }
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          required
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label='Password'
          required
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={ signInWithGoogle }>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
