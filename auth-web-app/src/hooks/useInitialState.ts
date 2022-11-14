import { useEffect, useState } from 'react';
import { User } from '../models/User.model';
import { loginUser, registerUser } from '../services/auth';
import useLocalStorage from './useLocalStorage';

import Swal from 'sweetalert2';
import { createRepository, getRepositoriesByUser, updateRepository } from '../services/repositories';
import { Repository } from '../models/Repository.model';

type UserToken = {
  user?: User;
  token?: string;
};

interface State {
  user: UserToken;
  repositories: Repository[];
  repositoriesFav: Repository[];
}

const useInitialState = () => {
  const [state, setState] = useState<State>({ user: {}, repositories: [], repositoriesFav: [] });
  const [loggedUser, setLoggedUser] = useLocalStorage<string>('loggedUser', '');

  const setRepositoriesFav = () => {
    console.log({ state });
    setState({
      ...state,
      repositoriesFav: state.repositories.filter((repository: Repository) => repository.isFavorite),
    });
  };

  const setLogged = (payload: any) => {
    console.log({ payload });
    setState({ ...state, user: payload });
    setLoggedUser(payload);

    console.log({ state });
  };

  const signIn = async (payload: User) => {
    console.log({ payload });
    const { data, success, message } = await loginUser(payload);
    console.log({ data });

    if (!data && !success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        footer: 'Something went wrong!',
      });
    } else {
      setState({
        ...state,
        user: data,
      });

      setLoggedUser(data);
      Swal.fire({
        icon: 'success',
        title: '¡Inicio sesión con éxito!',
        showConfirmButton: false,
        timer: 2000,
      });
      return true;
    }
  };

  const signUp = async (payload: User) => {
    const { data, success, message } = await registerUser(payload);

    if (!data && !success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        footer: 'Something went wrong!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Registro éxitoso!',
        showConfirmButton: false,
        timer: 2000,
      });

      return true;
    }
  };

  const setLogout = () => {
    setLoggedUser('');
    window.localStorage.removeItem('loggedUser');

    setState({ ...state, user: {} });
  };

  const setRepositories = async (userId: string, token: string) => {
    const { data, success, message } = await getRepositoriesByUser(userId, token);

    if (!data && !success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        footer: 'Error al consultar los repositorios del usuario!',
      });
    } else {
      setState({
        ...state,
        repositories: data,
      });
    }
    setRepositoriesFav();
  };

  const setCreateRepository = async (repository: Repository, token: string) => {
    const { data, success, message } = await createRepository(repository, token);

    if (!data && !success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        footer: 'Something went wrong!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Repositorio creado éxitoso!',
        showConfirmButton: false,
        timer: 2000,
      });

      return true;
    }
  };

  const setUpdateRepository = async (repositoryId: string, repository: Repository, token: string) => {
    delete repository?._id;
    delete repository?.user;

    const { data, success, message } = await updateRepository(repositoryId, repository, token);

    if (!data && !success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        footer: 'Something went wrong!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Repositorio actualizado con éxitoso!',
        showConfirmButton: false,
        timer: 2000,
      });
      return true;
    }
    setRepositoriesFav();
  };

  useEffect(() => {
    setRepositoriesFav();
  }, []);

  return {
    state,
    signIn,
    signUp,
    setLogged,
    setLogout,
    setRepositories,
    setCreateRepository,
    setUpdateRepository,
    setRepositoriesFav,
  };
};
export default useInitialState;
