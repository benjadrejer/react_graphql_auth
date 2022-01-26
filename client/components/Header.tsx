import React, { useContext, useEffect } from 'react';
import USER_QUERY from '../queries/CurrentUser';
import LOGOUT_QUERY from '../mutations/Logout';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../hooks/userContext';

export interface IUser {
  email: string;
  id: string;
}

const Header: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { error, loading, data } = useQuery<{ me: IUser }>(USER_QUERY);
  const navigate = useNavigate();
  const [
    logoutMutation,
    { error: logoutError, loading: logoutLoading, data: logoutData },
  ] = useMutation(LOGOUT_QUERY);

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  const onLogoutClick = async () => {
    const _ = await logoutMutation({
      refetchQueries: [{ query: USER_QUERY }],
    });
    setUser(null);
    navigate('/');
  };

  const renderButtons = () => {
    if (loading || error) {
      return null;
    }
    if (user) {
      return (
        <React.Fragment>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <a onClick={onLogoutClick}>Logout</a>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </React.Fragment>
    );
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  );
};

export default Header;
