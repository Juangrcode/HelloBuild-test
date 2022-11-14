import { Router, Redirect } from '@reach/router';
import AppContext from '../context/AppContext';

import Auth from './Auth';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Repositories from '../pages/Repositories';

import useInitialState from '../hooks/useInitialState';
// import AuthRoute from './AuthRoute';
import NotFound from '../pages/NotFound';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const App = () => {
  const initialState = useInitialState();
  // const location = useLocation();
  const [loggedUser, setLoggedUser] = useLocalStorage<string>('loggedUser', '');

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    console.log({ loggedUser, initialState });
    if (initialState.state?.user && loggedUser) {
      setIsAuth(true);
      initialState.setLogged(loggedUser);
    }
  }, [initialState.state?.user, loggedUser]);

  return (
    <AppContext.Provider value={initialState}>
      {/* <Router> */}
      <Auth>
        <Layout>
          <Router>
            <Redirect from="/" to="/login" />
            <Login path="login" />
            <Register path="/register" />
            <Profile path="/profile" />
            <Repositories path="/create-repository" />
            <NotFound default />
          </Router>
        </Layout>
      </Auth>
      {/* </Router> */}
    </AppContext.Provider>
  );
};

export default App;
