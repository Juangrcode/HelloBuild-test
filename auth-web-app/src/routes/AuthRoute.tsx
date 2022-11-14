// React
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppContext from '../context/AppContext';

const AuthRoute = ({ children, redirectTo = '/' }: any) => {
  const {
    state: { user },
  }: any = useContext(AppContext);

  if (!user.user) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default AuthRoute;
