import axios from 'axios';

const Error: {[key: string]: number} = {
  UNAUTHORIZED: 401,
}

function createAPI(onUnauthorized: () => void) {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  function onSuccess(response) {
    return response;
  }

  function onFail(err) {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  }

  api.interceptors.response.use(onSuccess, onFail);

  return api;
}

export {createAPI};
