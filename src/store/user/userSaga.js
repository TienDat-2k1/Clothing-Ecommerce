import { call, all, takeLatest, put } from 'redux-saga/effects';
import {
  createAuthUserEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase';
import { signUpSuccess, signInSuccess } from './userSLice';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    console.log('catch me roi con dau?', error);
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {}
}

export function* signInAfterSignUp({ payload: { user, additionalDetail } }) {
  console.log('run?');
  yield call(getSnapshotFromUserAuth, user, additionalDetail);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess({ user, additionalDetail: { displayName } }));
  } catch (error) {}
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {}
}

export function* onSignUpSuccess() {
  yield takeLatest('user/signUpSuccess', signInAfterSignUp);
}

export function* onSignUpStart() {
  yield takeLatest('user/signUpStart', signUp);
}
function* onEmailSignInStart() {
  yield takeLatest('user/emailSignInStart', signInWithEmail);
}
function* onSignInWithGoogle() {
  yield takeLatest('user/signInWithGoogleStart', signInWithGoogle);
}

export function* userSaga() {
  yield all([
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onEmailSignInStart),
    call(onSignInWithGoogle),
  ]);
}
