import { useContext, useRef } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import AppContext from '../context/AppContext';

import { useNavigate } from 'react-router-dom';
import { UseInitialState } from '../models/InitialState.model';

type Props = {};

const Repositories: React.FC<Props> = () => {
  const {
    state: { user },
    setCreateRepository,
  }: UseInitialState | any = useContext(AppContext);
  const form: React.MutableRefObject<any> = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData(form.current);
    const buyer = {
      name: formData.get('name'),
      isFavorite: Boolean(formData.get('isFavorite')),
      user: user && user.user?.id,
    };

    if (user) {
      const res = setCreateRepository(buyer, user.token);
      if (res) {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="w-[500px] m-auto p-20 shadow-2xl text-center">
      <h2 className="text-2xl font-medium p-8">CREAR REPOSITORIO</h2>
      <form ref={form} className="flex justify-center items-center flex-col">
        <label htmlFor="name">
          <input type="text" name="name" placeholder="Nombre del repositorio *" />
        </label>
        <label htmlFor="isFavorite" className="py-4 flex items-center">
          <input className="w-4 h-4 min-w-[20px] mr-2" type="checkbox" name="isFavorite" />
          Favorito
        </label>
        <PrimaryButton text="Crear" onClick={handleSubmit} type="button" />
      </form>
    </div>
  );
};

export default Repositories;
