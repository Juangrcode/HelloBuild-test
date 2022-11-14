import axios from 'axios';
import config from '../config';
import { User } from '../models/User.model';

const API_KEY_TOKEN = config.apiKeyToken;
const AUTH_API = config.authApi;

export const loginUser = async ({ username, password }: User) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${AUTH_API}/api/auth/sign-in`,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username,
        password,
      },
      data: {
        apiKeyToken: API_KEY_TOKEN,
      },
    });

    return response.data;
  } catch (error: any) {
    return { message: error.response?.data.error, success: false };
  }
};

export const registerUser = async (payload: User) => {
  try {
    const response = await axios.post(`${AUTH_API}/api/auth/sign-up`, payload);

    return response.data;
  } catch (error: any) {
    return { message: error.response?.data.error, success: false };
  }
};
