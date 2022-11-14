import { Repository } from './Repository.model';
import { User } from './User.model';

export interface UserToken {
  user?: User;
  token?: string;
}

export interface State {
  user: UserToken;
  repositories: Repository[];
  repositoriesFav: Repository[];
}

export interface UseInitialState {
  state: State;
  signIn: (payload: User) => Promise<true | undefined>;
  signUp: (payload: User) => Promise<true | undefined>;
  setLogged: (payload: any) => void;
  setLogout: () => void;
  setRepositories: (userId: string, token: string) => Promise<any>;
  setCreateRepository: (repository: Repository, token: string) => Promise<any>;
  setUpdateRepository: (repositoryId: string, repository: Repository, token: string) => Promise<any>;
}
