const config = {
  HOST: process.env.HOST ? process.env.HOST : 'http://localhost',
  API_PORT: process.env.API_PORT ? process.env.API_PORT : '3000',
};

export const getApiUrl = () => {
  return `${config.HOST}:${config.API_PORT}`;
};

export default config;
