import service from './service';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  refreshToken: string;
  accessToken: string;
}

export function login(params: LoginRequest) {
  return service<LoginResponse>({
    method: 'GET',
    url: '/login',
    params
  });
}

export function getTokenByRefreshToken(refreshToken: string) {
  return service<LoginResponse>({
    method: 'GET',
    url: '/refreshToken',
    params: {
      refreshToken
    }
  });
}