import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

//    create user with email and password
   const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password); 
   }
//    log in user
   const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
   }
//   log out
   const logOut = () => {
    return signOut(auth);
   }
//   observer user auth state
   useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        // stop observing while unmounting
        return ()=>{
            return unsubcribe;
        }
   },[]);


    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        loading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;