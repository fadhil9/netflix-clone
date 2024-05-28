
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB37alr9herPlYlPJ1ydQDwSj3PnqVPO_4",
  authDomain: "netflix-clone-9c45d.firebaseapp.com",
  projectId: "netflix-clone-9c45d",
  storageBucket: "netflix-clone-9c45d.appspot.com",
  messagingSenderId: "1094671880818",
  appId: "1:1094671880818:web:990eff336064428f2968eb"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code)
        
    }
}

const login = async(email, password)=>{
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code)
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signUp, logout};