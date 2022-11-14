// React
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';

// Authentication
import Auth from './Auth';
import AuthRoute from './AuthRoute';

import Layout from '../components/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Repositories from '../pages/Repositories';
import NotFound from '../pages/NotFound';

const App = () => {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Auth>
          <Layout>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<AuthRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-repository" element={<Repositories />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Auth>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
