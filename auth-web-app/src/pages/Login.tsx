import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import AppContext from '../context/AppContext';
import { UseInitialState } from '../models/InitialState.model';
import { User } from '../models/User.model';

type Props = {};

const Login: React.FC<Props> = () => {
  const { signIn }: UseInitialState | any = useContext(AppContext);
  const form: React.MutableRefObject<any> = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData(form.current);
    const buyer: User = {
      username: String(formData.get('username')),
      password: String(formData.get('password')),
    };
    const res = await signIn(buyer);

    if (res) {
      navigate('/profile');
    }
  };

  return (
    <div className="Login">
      <div className="Login__container container flex justify-center items-center w-full h-full ">
        <div className="Card w-[500px] m-auto p-20 shadow-2xl text-center">
          <h2 className="text-2xl font-medium p-8">INICIA SESIÓN</h2>
          <form ref={form} className="flex justify-center items-center flex-col">
            <label htmlFor="username">
              <input type="text" name="username" placeholder="Nombre de usuario *" />
            </label>
            <label htmlFor="password" className="py-4">
              <input type="password" name="password" placeholder="Contraseña *" />
            </label>
            <PrimaryButton text="Inicia sesión" onClick={handleSubmit} type="button" />
          </form>
          <p className="pt-4">
            ¿No tienes cuenta?,
            <Link to="/register">
              <strong> Registrate</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
