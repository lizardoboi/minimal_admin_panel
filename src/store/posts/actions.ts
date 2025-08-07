import * as types from './types';

export const fetchPostsRequest = (page = 1, limit = 10) => ({ type: types.FETCH_POSTS_REQUEST, payload: { page, limit } });
export const fetchPostsSuccess = (items: any[], page: number, limit: number, total: number) => ({ type: types.FETCH_POSTS_SUCCESS, payload: { items, page, limit, total } });
export const fetchPostsFailure = (error: string) => ({ type: types.FETCH_POSTS_FAILURE, payload: error });