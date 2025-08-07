import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_POSTS_REQUEST } from './types';
import { fetchPosts } from '../../api/posts';
import { fetchPostsSuccess, fetchPostsFailure } from './actions';

function parseTotalFromHeaders(headers: any) {
    // Попробуйте несколько вариантов заголовков — в API может быть X-Total-Count или X-Total
    const totalHeader = headers['x-total-count'] || headers['x-total'] || headers['X-Total-Count'] || headers['X-Total'];
    return totalHeader ? parseInt(totalHeader, 10) : 0;
}

function* doFetchPosts(action: any): any {
    const { page, limit } = action.payload;
    try {
        const resp = yield call(fetchPosts, page, limit);
        const items = resp.data;
        const total = parseTotalFromHeaders(resp.headers || {});
        yield put(fetchPostsSuccess(items, page, limit, total));
    } catch (e: any) {
        const msg = e?.message || 'Ошибка загрузки постов';
        yield put(fetchPostsFailure(msg));
    }
}

export default function* postsSaga() {
    yield takeLatest(FETCH_POSTS_REQUEST, doFetchPosts);
}