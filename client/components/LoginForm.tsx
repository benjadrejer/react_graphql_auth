import React from 'react';
import AuthForm from './AuthForm';
import { useMutation } from '@apollo/client';
import LOGIN_MUTATION from '../mutations/Login';

const LoginForm: React.FC = () => {
  const [loginMutation, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  return (
    <div>
      <h3>Login</h3>
      <AuthForm onSubmit={loginMutation} error={error} />
    </div>
  );
};

export default LoginForm;
