import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1kuyMRzjjDABfEC3gVkHuNqbsbG-fDBE',
  authDomain: 'clothing-ecommerce-db-92df9.firebaseapp.com',
  projectId: 'clothing-ecommerce-db-92df9',
  storageBucket: 'clothing-ecommerce-db-92df9.appspot.com',
  messagingSenderId: '907662297193',
  appId: '1:907662297193:web:254e8bcc11870beedb3af8',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);

  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoriesMap = querySnapshot.docs.reduce((acc, curr) => {
    const { title, items } = curr.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoriesMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'user', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data exists
  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating  the user', error.message);
    }
  }
  // return
  return userDocRef;
};

export const createAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback);
