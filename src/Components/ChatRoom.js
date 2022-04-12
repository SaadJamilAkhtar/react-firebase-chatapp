import React, {useRef, useState} from 'react';
import {addDoc, collection, limit, orderBy, query, serverTimestamp} from "firebase/firestore";
import {auth, firestore} from "../config/config";
import {useCollectionData} from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

function ChatRoom() {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(q, {idField: 'id'});

    const [formData, setFormData] = useState('');
    const dummy = useRef();

    const sendMessage = async (e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;

        await addDoc(messagesRef, {
            text: formData,
            createdAt: serverTimestamp(),
            uid,
            photoURL
        })
        setFormData('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <>
            <main>
                {messages && messages.map((message, index) => (<ChatMessage key={index} message={message}/>))}
                <div ref={dummy}></div>
            </main>

            <form onSubmit={sendMessage}>
                <input
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                    placeholder="say something nice"
                />
                <button type="submit" disabled={!formData}>🕊️</button>
            </form>
        </>
    )
}

export default ChatRoom;