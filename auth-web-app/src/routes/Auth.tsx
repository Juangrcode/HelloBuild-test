// React
import { useContext, useEffect } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

import AppContext from '../context/AppContext';

const Auth = ({ children }: any) => {
  const [loggedUser, setLoggedUser] = useLocalStorage<string>('loggedUser', '');
  const { state, setLogged }: any = useContext(AppContext);

  useEffect(() => {
    if (loggedUser) {
      setLogged(loggedUser);
    }
  }, [loggedUser]);

  return children;
};

export default Auth;
