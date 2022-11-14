interface Config {
  apiKeyToken: string;
  authApi: string;
}
const config: Config = {
  apiKeyToken: process.env.REACT_APP_API_KEY_TOKEN || '',
  authApi: 'http://localhost:3000',
};

export default config;
