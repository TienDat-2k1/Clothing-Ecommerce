import { createContext, useEffect, useState } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
