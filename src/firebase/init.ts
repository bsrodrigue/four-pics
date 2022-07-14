import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "four-pics-anime.firebaseapp.com",
    projectId: "four-pics-anime",
    storageBucket: "four-pics-anime.appspot.com",
    messagingSenderId: "631346840242",
    appId: "1:631346840242:web:d1eabee4a90a9392a07fab"
};

export const app = initializeApp(firebaseConfig);
