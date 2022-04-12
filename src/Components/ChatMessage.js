import React from 'react';
import {auth} from "../config/config";

function ChatMessage(props) {
    const {text, uid, photoURL} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL ? photoURL : './avatar.png'}/>
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage;