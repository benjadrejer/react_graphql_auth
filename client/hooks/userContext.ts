import { createContext } from 'react';
import { IUser } from '../components/Header';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const initialState: IUserContext = {
  user: null,
  setUser: () => {},
}

const UserContext = createContext<IUserContext>(initialState);

export default UserContext;