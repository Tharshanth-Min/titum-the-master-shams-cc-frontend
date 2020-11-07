import axios from 'axios';
import store from './_store';
import * as actions from './_store/actions';

const token = localStorage.getItem('access_token');
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(actions.authLogout());
    }
    return Promise.reject(error);
  },
);

export default axios;
