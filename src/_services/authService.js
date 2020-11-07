import Http from '../Http';
import * as action from '../_store/actions';
const API_URL = process.env.REACT_APP_API_URL;

export function login(credentials) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${API_URL}/auth/login`, credentials)
      .then((res) => {
        dispatch(action.authLogin(res.data));
        return resolve();
      })
      .catch((err) => {
        const { status, errors } = err.response.data;
        const data = {
          status,
          errors,
        };
        return reject(data);
      });
  });
}

export function register(credentials) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${API_URL}/register`, credentials)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, errors } = err.response.data;
        const data = {
          status,
          errors,
        };
        return reject(data);
      });
  });
}


