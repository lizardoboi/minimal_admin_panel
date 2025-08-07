import api from './axiosInstance';

export interface LoginResp {
    access_token: string;
    refresh_token: string;
    access_expired_at: number;
    refresh_expired_at: number;
}

export const login = (email: string, password: string) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return api.post<LoginResp>('/auth/token-generate', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};