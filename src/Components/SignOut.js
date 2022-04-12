import React from 'react';
import {auth} from "../config/config";
import {signOut} from "firebase/auth";

function SignOut() {
    return auth.currentUser && (
        <button className={'sign-out'} onClick={() => signOut(auth)}>Sign Out</button>
    )
}

export default SignOut;