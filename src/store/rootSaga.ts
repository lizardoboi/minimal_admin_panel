import { all } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import postsSaga from './posts/sagas';

export default function* rootSaga() {
    yield all([authSaga(), postsSaga()]);
}