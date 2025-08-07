export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const REFRESH_TOKEN_SUCCESS = 'auth/REFRESH_TOKEN_SUCCESS';

export interface AuthState {
    accessToken?: string | null;
    refreshToken?: string | null;
    loading: boolean;
    error?: string | null;
}