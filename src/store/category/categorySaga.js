import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase';
import { fetchCategoriesError, fetchCategoriesSuccess } from './categorySlice';

function* fetchCategories() {
  try {
    const categories = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesError(error));
  }
}

function* onFetchCategories() {
  yield takeLatest('categories/fetchCategoriesStart', fetchCategories);
}

export default function* categorySaga() {
  yield all([call(onFetchCategories)]);
}
