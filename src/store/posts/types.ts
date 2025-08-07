export const FETCH_POSTS_REQUEST = 'posts/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE';

export interface PostsState {
    items: any[];
    loading: boolean;
    page: number;
    limit: number;
    total: number;
    error?: string;  // Добавил поле для ошибки, может быть undefined
}