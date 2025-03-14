import React, { useState } from "react";
import { register } from "../services/api";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        const data = await register(username, password);
        alert(data.message);
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;