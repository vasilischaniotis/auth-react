import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
    apiKey: 'AIzaSyB9LiuoYMnMPVIdvuQcqY1i3d0uSOeQaGw',
    authDomain: 'auth-react-c6ff2.firebaseapp.com',
    projectId: 'auth-react-c6ff2',
    storageBucket: 'auth-react-c6ff2.appspot.com',
    messagingSenderId: '543039412557',
    appId: '1:543039412557:web:fd6c2d4b1c504e48b07f04',
});

export const auth = app.auth();
export default app;
