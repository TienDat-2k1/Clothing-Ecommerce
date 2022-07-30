import { all, call } from '@redux-saga/core/effects';
import categorySaga from './category/categorySaga';
import { userSaga } from './user/userSaga';
export function* rootSaga() {
  yield all([call(userSaga), call(categorySaga)]);
}
