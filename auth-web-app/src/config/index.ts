interface Config {
  apiKeyToken: string;
  authApi: string;
}
const config: Config = {
  apiKeyToken: process.env.REACT_APP_API_KEY_TOKEN || '',
  authApi: process.env.REACT_APP_AUTH_API || 'http://localhost:3000',
};

export default config;
