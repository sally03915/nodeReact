// npm install socket.io-client
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3075");

const Chat = ()=>{
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit("message", message);
        setMessage("");
    };

    return (
      <div style={{margin:'10px' , backgroundColor:'#efefef'}} >
            <h2>실시간 채팅</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>보내기</button>
        </div>
    );
}

export default Chat;
