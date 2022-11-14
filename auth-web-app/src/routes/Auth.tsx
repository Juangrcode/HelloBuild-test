// React
import { useContext, useEffect } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

import AppContext from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Auth = ({ children }: any) => {
  const [loggedUser] = useLocalStorage<string>('loggedUser', '');
  const { setLogged }: any = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    if (loggedUser) {
      setLogged(loggedUser);
    }
  }, [location]);

  return children;
};

export default Auth;
