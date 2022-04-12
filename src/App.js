import './App.css';
import {useAuthState} from "react-firebase-hooks/auth";
import React from "react";
import {auth} from "./config/config";
import ChatRoom from "./Components/ChatRoom";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";


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


export default App;
