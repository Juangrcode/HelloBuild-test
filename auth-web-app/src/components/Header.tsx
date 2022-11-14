// import { useContext } from 'react';
import { Link, useNavigate } from '@reach/router';
// import AppContext from '../context/AppContext';
import '../styles/components/Header.css';

import profile from '../assets/icons/profile.png';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import PrimaryButton from './PrimaryButton';

type Props = {};

const Header: React.FC<Props> = () => {
  const { state, setLogout }: any = useContext(AppContext);
  // const history = useNavigate();
  const { user } = state;

  const handleLogout = () => {
    setLogout();
    // history('/login');
  };

  return (
    <div className="Header">
      <div className="Header__container container">
        <h1 className="Header-title">
          <Link to="/login">HELLOBUILD TEST</Link>
        </h1>
        <div className="Header-profile flex gap-8 items-center">
          <Link to="/profile">
            <img src={profile} alt="profile icon" />
            {!user.user ? <h5>Perfil</h5> : <h5>{user.user?.username}</h5>}
          </Link>
          {user?.user && <PrimaryButton text="Cerrar sesión" type="button" onClick={handleLogout} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
