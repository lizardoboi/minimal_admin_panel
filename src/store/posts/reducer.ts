import * as types from './types';

const initialState: types.PostsState = {
    items: [],
    loading: false,
    page: 1,
    limit: 10,
    total: 0,
    error: undefined,
};

export default function postsReducer(
    state = initialState,
    action: any
): types.PostsState {
    switch (action.type) {
        case types.FETCH_POSTS_REQUEST:
            return { ...state, loading: true, error: undefined };
        case types.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items,
                page: action.payload.page,
                limit: action.payload.limit,
                total: action.payload.total,
                error: undefined,
            };
        case types.FETCH_POSTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}