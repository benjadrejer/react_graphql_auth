import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import { IUser } from 'components/Header';
import UserContext from './hooks/userContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            Welcome to GraphQL / Password / Mongodb / Express-session Auth
          </div>
        }
      />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

const Root: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <App>
            <Router />
          </App>
        </BrowserRouter>
      </UserContext.Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
