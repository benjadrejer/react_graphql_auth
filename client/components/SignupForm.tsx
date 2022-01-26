import React from 'react';
import AuthForm from './AuthForm';
import { useMutation } from '@apollo/client';
import SIGNUP_MUTATION from '../mutations/Signup';

const SignupForm: React.FC = () => {
  const [signupMutation, { loading, error, data }] =
    useMutation(SIGNUP_MUTATION);

  return (
    <div>
      <h3>Signup</h3>
      <AuthForm onSubmit={signupMutation} error={error} />
    </div>
  );
};

export default SignupForm;
