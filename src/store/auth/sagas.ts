import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './types';
import { login } from '../../api/auth';
import Cookies from 'js-cookie';
import { loginSuccess, loginFailure } from './actions';

function* doLogin(action: any): any {
    const { email, password } = action.payload;
    try {
        const resp = yield call(login, email, password);
        const { access_token, refresh_token } = resp.data;

        Cookies.set('accessToken', access_token);
        Cookies.set('refreshToken', refresh_token);

        yield put(loginSuccess(access_token, refresh_token));
        window.location.href = '/manage/posts';
    } catch (e: any) {
        const msg = e?.response?.data?.message || e.message || 'Ошибка логина';
        yield put(loginFailure(msg));
    }
}

export default function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, doLogin);
}