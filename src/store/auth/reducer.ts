import * as types from './types';
import Cookies from 'js-cookie';

const initialState: types.AuthState = {
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    loading: false,
    error: null,
};

export default function authReducer(state = initialState, action: any): types.AuthState {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case types.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case types.LOGOUT_SUCCESS:
            return { ...state, accessToken: null, refreshToken: null };
        case types.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        default:
            return state;
    }
}