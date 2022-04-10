import './App.css';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {GoogleAuthProvider, getAuth, signOut, signInWithPopup} from 'firebase/auth';

import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import React from "react";
import env from "react-dotenv";
import {collection, query, limit, orderBy, getDocs} from "firebase/firestore";

const config = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId
}
const app = initializeApp(config)


const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider()

function App() {

    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header className="App-header">
                {user ? <ChatRoom/> : <SignIn/>}
            </header>
        </div>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(userDetails => console.log(userDetails));
    }

    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    );
}

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => signOut(auth)}>Sign Out</button>
    )
}

function ChatRoom() {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    const [messages] = useCollectionData(q, {idField: 'id'});
    console.log(messages)
    return (
        <>
            <div>
                {messages && messages.map((message, index) => (<ChatMessage key={index} message={message}/>))}
            </div>
        </>
    )
}

function ChatMessage(props) {
    const {text, uid} = props.message;
    return (
        <p>{text}</p>
    )
}

export default App;
