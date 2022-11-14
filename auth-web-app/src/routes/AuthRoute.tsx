import { useEffect, useState } from 'react';

import { Router } from '@reach/router';
import NotFound from '../pages/NotFound';

const AuthRoute = (props: any) => {
  console.log({ props });
  const { location, user } = props;

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setIsAuth(true);
    }
  }, [location?.pathname, user]);

  return (
    <>
      {isAuth ? (
        <Router {...props} />
      ) : (
        <Router>
          <NotFound default />
        </Router>
      )}
    </>
  );
};

export default AuthRoute;
