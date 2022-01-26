import React, { useContext, useState, useEffect } from 'react';
import firebase, { auth } from '../firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {useNavigate} from "react-router-dom";


const AuthContext = React.createContext();
// export { AuthContext };

export function useAuth() {
    const abc = useContext(AuthContext);
    return abc;
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    async function signup({name, surname, email, password}) {
        const data = {name, surname, email, password};
        debugger;
        const createdUser = await auth.createUserWithEmailAndPassword(email, password);
        // const createdUser1 = await auth.currentUser;
        debugger;
        const firestore = getFirestore();
        const docRef = await addDoc(collection(firestore, "users"), {
            userId: createdUser.user.uid,
            email: email,
            firstName: name,
            lastName: surname,
        });
        debugger;
        return createdUser;
    }

    async function setAuthToken() {
        const authToken = await auth.currentUser.getIdToken();
        setToken(authToken);
    }

    async function getAuthToken() {
        if (!token) {
            await setAuthToken();
        }

        return token;
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        debugger;
        return currentUser.updatePassword(password);
    }

    async function handleLogout() {
        try {
            await logout();
            navigate("/login", {replace: true});
        } catch (e) {
            console.log(`Failed to log out ${e.message}`);
        }
    }

    useEffect(() => {
        // debugger;
        const userState = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return userState;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        setAuthToken,
        getAuthToken,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
