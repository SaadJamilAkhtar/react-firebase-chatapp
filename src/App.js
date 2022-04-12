import './App.css';
import {GoogleAuthProvider, getAuth, signOut, signInWithPopup} from 'firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth";
import React, {useRef, useState} from "react";
import {auth, firestore} from "./config/config";
import ChatRoom from "./Components/ChatRoom";

const provider = new GoogleAuthProvider()

function App() {

    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1>React Firebase Chat</h1>
                <SignOut/>
            </header>

            <section>
                {user ? <ChatRoom/> : <SignIn/>}
            </section>

        </div>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(userDetails => console.log(userDetails));
    }

    return (
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    );
}

function SignOut() {
    return auth.currentUser && (
        <button className={'sign-out'} onClick={() => signOut(auth)}>Sign Out</button>
    )
}




export default App;
