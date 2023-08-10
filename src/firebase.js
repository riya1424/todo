import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkIOZICEJQJziTG9YtCpvpYQG2I2JMYOs",
    authDomain: "todo-43298.firebaseapp.com",
    projectId: "todo-43298",
    storageBucket: "todo-43298.appspot.com",
    messagingSenderId: "663847397426",
    appId: "1:663847397426:web:54e62dd207afccf80ff42b",
    measurementId: "G-VMNMZBD6EC"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
