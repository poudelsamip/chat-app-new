import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthProvider = createContext({});

const MainProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState();

  const loginWithGoogle = async () => {
    try {
      const userData = await signInWithPopup(auth, googleProvider);
      const userExists = await getDoc(doc(db, "users", userData.user.uid));
      if (userExists.exists()) {
        return;
      }
      await setDoc(doc(db, "users", userData.user.uid), {
        uid: userData.user.uid,
        displayName: userData.user.displayName,
        email: userData.user.email,
        photoURL: userData.user.photoURL,
      });
      await setDoc(doc(db, "userChats", userData.user.uid), {});
      setCurrUser(userData.user);
    } catch (err) {
      alert(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrUser(null);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthProvider.Provider value={{ loginWithGoogle, currUser, logOut }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default MainProvider;
