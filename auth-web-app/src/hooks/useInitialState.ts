import { useState } from 'react';
import { loginUser, registerUser } from '../services/auth';
import useLocalStorage from './useLocalStorage';

import Swal from 'sweetalert2';
import { createRepository, getRepositoriesByUser, updateRepository } from '../services/repositories';

import { User } from '../models/User.model';
import { Repository } from '../models/Repository.model';
import { State } from '../models/InitialState.model';

const initialStateValues = { user: {}, repositories: [], repositoriesFav: [] };

const useInitialState = () => {
  const [state, setState] = useState<State>(initialStateValues);
  const [loggedUser, setLoggedUser, removeValue] = useLocalStorage<string>('loggedUser', '');

  const setLogged = (payload: any) => {
    setState({ ...state, user: payload });
  };

  const signIn = async (payload: User) => {
    const { data, success, message } = await loginUser(payload);

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
    removeValue('loggedUser');
    setState(initialStateValues);
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
        repositoriesFav: data.filter((repository: Repository) => repository.isFavorite),
      });
    }
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

      if (state.user.user?.id) setRepositories(state.user.user.id, token);

      return true;
    }
  };

  const setUpdateRepository = async (repositoryId: string, repository: Repository, token: string) => {
    delete repository._id;
    delete repository.user;

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

      if (state.user.user?.id) setRepositories(state.user.user.id, token);

      return true;
    }
  };

  return {
    state,
    signIn,
    signUp,
    setLogged,
    setLogout,
    setRepositories,
    setCreateRepository,
    setUpdateRepository,
  };
};
export default useInitialState;
