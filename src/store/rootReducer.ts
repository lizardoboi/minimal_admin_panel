import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import postsReducer from './posts/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;