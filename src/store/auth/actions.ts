import * as types from './types';

export const loginRequest = (email: string, password: string) => ({
    type: types.LOGIN_REQUEST,
    payload: { email, password },
});
export const loginSuccess = (accessToken: string, refreshToken: string) => ({
    type: types.LOGIN_SUCCESS,
    payload: { accessToken, refreshToken },
});
export const loginFailure = (error: string) => ({
    type: types.LOGIN_FAILURE,
    payload: error,
});
export const logout = () => ({ type: types.LOGOUT });
export const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS });
export const refreshTokenSuccess = (accessToken: string, refreshToken: string) => ({
    type: types.REFRESH_TOKEN_SUCCESS,
    payload: { accessToken, refreshToken },
});