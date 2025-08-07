import api from './axiosInstance';

export interface Post {
    id: number;
    title: string;
    body: string;
}

export const fetchPosts = (page = 1, limit = 10) => {
    return api.get<Post[]>('/manage/posts', { params: { page, limit } });
};