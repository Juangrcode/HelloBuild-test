import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

import profile from '../assets/icons/profile-black.png';
import { Repository } from '../models/Repository.model';
import PrimaryButton from '../components/PrimaryButton';

type Props = {
  path: string;
};

const Profile: React.FC<Props> = () => {
  const {
    state: { user, repositories, repositoriesFav },
    setRepositories,
    setUpdateRepository,
    setRepositoriesFav,
  }: any = useContext(AppContext);

  useEffect(() => {
    console.log({ user, repositories });
    if (user) {
      setRepositories(user.user?.id, user.token);
    }
    setRepositoriesFav();
  }, []);

  const handleCreateRepository = () => {
    // history.push('/create-repository');
  };

  const handleClickUpdateRepository = (e: React.ChangeEvent<HTMLInputElement>, repository: Repository) => {
    console.log({ e, repository });

    setUpdateRepository(repository._id, { ...repository, isFavorite: Boolean(e.target?.value) }, user.token);
    setRepositoriesFav();
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
