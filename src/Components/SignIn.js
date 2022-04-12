import React from 'react';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../config/config";

const provider = new GoogleAuthProvider()

function SignIn() {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(userDetails => console.log(userDetails));
    }

    return (
        <button className="sign-in" onClick={signInWithGoogle}>
            <div className="img">
                <img src="./google.png" alt=""/>
            </div>
            <div className={'sign-in-text'}>
                Sign in with Google
            </div>
        </button>
    );
}

export default SignIn;