import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config=
    {
        apiKey: "AIzaSyD4l-KJjzQKh4ymzE7SgsdfuBxT-Lp9b38",
        authDomain: "crwn-db-90c63.firebaseapp.com",
        databaseURL: "https://crwn-db-90c63.firebaseio.com",
        projectId: "crwn-db-90c63",
        storageBucket: "",
        messagingSenderId: "361505042171",
        appId: "1:361505042171:web:04629a10e04c9971bd0a5e",
        measurementId: "G-GT2R06BPY3"
      
};

export const createUserProfileDocument=async(userAuth, additionalData) =>{
    if(!userAuth) return;
    
    const userRef=firestore.doc(`users/${userAuth.uid}`);

    const snapShot= await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user',error.message);
        }
    }
    //console.log(snapShot);
    return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

