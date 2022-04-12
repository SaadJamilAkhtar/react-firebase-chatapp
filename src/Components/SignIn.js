import React from 'react';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../config/config";

const provider = new GoogleAuthProvider()

function SignIn() {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(userDetails => console.log(userDetails));
    }

    return (
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    );
}

export default SignIn;