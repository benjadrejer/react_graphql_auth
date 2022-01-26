import {
  ApolloError,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import React, { useState, useContext, useEffect } from 'react';
import USER_QUERY from '../queries/CurrentUser';
import { useNavigate } from 'react-router-dom';
import UserContext from '../hooks/userContext';

interface IAuthFormProps {
  onSubmit: (options?: MutationFunctionOptions) => Promise<FetchResult>;
  error: ApolloError | undefined;
}

const AuthForm: React.FC<IAuthFormProps> = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [networkError, setNetworkError] = useState('');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await onSubmit({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query: USER_QUERY }],
      });
      if (data?.login) {
        setUser(data.login);
      } else if (data?.signup) {
        setUser(data.login);
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        setNetworkError(e.message);
        e.graphQLErrors.forEach((e) => console.log(e));
      } else if (e instanceof TypeError) {
        setNetworkError(e.message);
      } else if (e instanceof RangeError) {
        setNetworkError(e.message);
      } else if (e instanceof EvalError) {
        setNetworkError(e.message);
      } else if (typeof e === 'string') {
        setNetworkError(e);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <div className="row">
      <form className="col s6" onSubmit={handleSubmit}>
        <div className="input-field">
          {/* <label htmlFor="email">Email</label> */}
          <input
            placeholder="email"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          {/* <label htmlFor="password">Password</label> */}
          <input
            placeholder="password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error.message}</div>}
        {/* {networkError && <div className="error">{networkError}</div>} */}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
