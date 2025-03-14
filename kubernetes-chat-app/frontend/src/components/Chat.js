import React, { useState, useEffect } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8000/ws");
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

       return () => {
        newSocket.close();
       };
    }, []);

    const sendMessage = () => {
        if (socket&& input.trim() !== ""){
            socket.send(input);
            setInput("")
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((msg,index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
           
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
export default Chat;