import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';
import { store } from '../store';
import { logoutSuccess, refreshTokenSuccess } from '../store/auth/actions';

const api = axios.create({
    baseURL: 'https://rest-test.machineheads.ru',
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function subscribeToken(cb: (token: string) => void) {
    subscribers.push(cb);
}

function onRefreshed(token: string) {
    subscribers.forEach((cb) => cb(token));
    subscribers = [];
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const access = Cookies.get('accessToken');
    if (access) {
        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders;
        }
        config.headers['Authorization'] = `Bearer ${access}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (!originalRequest) return Promise.reject(error);

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    subscribeToken((token: string) => {
                        if (!originalRequest.headers) {
                            originalRequest.headers = {} as AxiosRequestHeaders;
                        }
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;

                        // Создаем новый объект запроса без _retry
                        const requestConfig = { ...originalRequest };
                        delete (requestConfig as any)._retry;

                        api(requestConfig as InternalAxiosRequestConfig)
                            .then(response => resolve(response))
                            .catch(err => reject(err));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refresh = Cookies.get('refreshToken');
            if (!refresh) {
                console.warn('No refresh token available, logging out');
                store.dispatch(logoutSuccess());
                isRefreshing = false;
                return Promise.reject(error);
            }

            try {
                console.log('Refreshing token with refresh token:', refresh);

                const resp = await axios.post(
                    'https://rest-test.machineheads.ru/auth/refresh',
                    null,
                    { headers: { Authorization: `Bearer ${refresh}` } }
                );

                if (!resp.data || !resp.data.accessToken) {
                    throw new Error('Invalid refresh response: missing accessToken');
                }

                const { accessToken, refreshToken } = resp.data;

                Cookies.set('accessToken', accessToken);
                if (refreshToken) {
                    Cookies.set('refreshToken', refreshToken);
                }

                store.dispatch(refreshTokenSuccess(accessToken, refreshToken));
                onRefreshed(accessToken);

                if (!originalRequest.headers) {
                    originalRequest.headers = {} as AxiosRequestHeaders;
                }
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Создаем новый объект запроса без _retry
                const requestConfig = { ...originalRequest };
                delete (requestConfig as any)._retry;

                return api(requestConfig as InternalAxiosRequestConfig);
            } catch (e) {
                console.error('Failed to refresh token:', e);
                store.dispatch(logoutSuccess());
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
