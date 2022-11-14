import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

import profile from '../assets/icons/profile-black.png';
import { Repository } from '../models/Repository.model';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { UseInitialState } from '../models/InitialState.model';

type Props = {};

const Profile: React.FC<Props> = () => {
  const {
    state: { user, repositories, repositoriesFav },
    setRepositories,
    setUpdateRepository,
  }: UseInitialState | any = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setRepositories(user.user?.id, user.token);
    }
  }, []);

  const handleCreateRepository = () => {
    navigate('/create-repository');
  };

  const handleClickUpdateRepository = (e: React.ChangeEvent<HTMLInputElement>, repository: Repository) => {
    setUpdateRepository(repository._id, { ...repository, isFavorite: e.target?.checked }, user.token);
  };

  return (
    <div className="w-[500px] m-auto p-20 shadow-2xl text-center">
      <h2 className="text-2xl p-4 font-bold">Perfil</h2>
      <img className="m-auto w-[80px] my-4 " src={profile} alt="profile icon" />
      {user && (
        <>
          <h3>
            Nombre de usuario: <strong>{user.user?.username}</strong>
          </h3>
          <h3>
            Repositorios: <strong>{repositories.length}</strong>
          </h3>
          <h3>
            Repositorios favoritos: <strong>{repositoriesFav.length}</strong>
          </h3>
        </>
      )}
      <hr />
      <h2 className="text-2xl p-4 font-bold">Repositorios</h2>
      <table className="w-full">
        <tr className="border-2">
          <td>#</td>
          <td>Nombre</td>
          <td>Favorito</td>
        </tr>
        {repositories.map((repository: Repository, index: number) => (
          <tr className="border-2" key={repository._id}>
            <td>{index + 1}</td>
            <td>{repository.name}</td>
            <td>
              <label htmlFor="isFavorite"></label>
              <input
                className="w-4 h-4 min-w-[20px] mr-2"
                type="checkbox"
                name="isFavorite"
                id="isFavorite"
                defaultChecked={repository.isFavorite}
                onChange={(e) => handleClickUpdateRepository(e, repository)}
              />
            </td>
          </tr>
        ))}
      </table>

      <div className="mt-8">
        <PrimaryButton text="Crear repositorio" type="button" onClick={handleCreateRepository} />
      </div>
    </div>
  );
};

export default Profile;
