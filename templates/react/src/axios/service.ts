import axios from 'axios';
import userStore from '@/stores/user';
import { customHistory } from '@/routes/RootRouter';
import { getTokenByRefreshToken } from './user';

const service = axios.create({
  baseURL: '/api/v1',
  withCredentials: true
});

service.interceptors.request.use(
  config => {
    if (userStore.info?.accessToken) {
      config.headers.Authorization = `Bearer ${userStore.info.accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
  ,
);

service.interceptors.response.use(
  response => response.data,
  async error => {
    if (error.response.status === 401) {
      if (userStore.info?.refreshToken) {
        try {
          const { accessToken, refreshToken } = await getTokenByRefreshToken(userStore.info.refreshToken);
          userStore.setInfo({
            accessToken,
            refreshToken,
          });
          const next = await service(error.response.config);
          return next;
        } catch {
          userStore.setInfo(null);
          customHistory.push('/login');
        }
      } else {
        userStore.setInfo(null);
        customHistory.push('/login');
      }
    }
    return Promise.reject(error);
  },
);

export default service;