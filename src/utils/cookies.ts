import Cookies from 'js-cookie';

export const setTokens = (access: string, refresh: string) => {
    Cookies.set('accessToken', access);
    Cookies.set('refreshToken', refresh);
};

export const clearTokens = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
};