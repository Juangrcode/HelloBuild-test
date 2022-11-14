// React
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Header.css';

import profile from '../assets/icons/profile.png';
import PrimaryButton from './PrimaryButton';
import { UseInitialState } from '../models/InitialState.model';

type Props = {};

const Header: React.FC<Props> = () => {
  const { state, setLogout }: UseInitialState | any = useContext(AppContext);
  const navigate = useNavigate();
  const { user } = state;

  const handleLogout = () => {
    setLogout();
    navigate('/');
  };

  return (
    <div className="Header">
      <div className="Header__container container">
        <h1 className="Header-title">
          <Link to={user.user ? '/profile' : '/login'}>HELLOBUILD GITHUB</Link>
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
