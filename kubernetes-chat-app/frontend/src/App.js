import React from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

function App () {
  
  return (
    <AuthProvider>
      <div>
        <Login/>
        <Register/>
        <Chat/>
      </div>
    </AuthProvider>
  );
}

export default App;