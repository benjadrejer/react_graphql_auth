import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from './userContext';

const useAuth = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return user;
}

export default useAuth;