import axios from 'axios';
import config from '../config';
import { Repository } from '../models/Repository.model';

const AUTH_API = config.authApi;

export const getRepositoriesByUser = async (userId: string, token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${AUTH_API}/api/repositories/${userId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { message: error, success: false };
  }
};

export const createRepository = async (repository: Repository, token: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${AUTH_API}/api/repositories`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: repository,
    });
    return response.data;
  } catch (error) {
    return { message: error, success: false };
  }
};

export const updateRepository = async (repositoryId: string, repository: Repository, token: string) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${AUTH_API}/api/repositories/${repositoryId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: repository,
    });
    return response.data;
  } catch (error) {
    return { message: error, success: false };
  }
};

export const deleteRepository = async (repositoryId: string, token: string) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${AUTH_API}/api/repositories/${repositoryId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { message: error, success: false };
  }
};
