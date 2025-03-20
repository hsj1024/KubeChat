import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ChatRoomList from "./components/ChatRoomList";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login onLogin={() => setUser(JSON.parse(localStorage.getItem("user")))} />} />
            <Route path="/register" element={<Register onRegister={() => setUser(JSON.parse(localStorage.getItem("user")))} />} />
            {user && (
              <>
                <Route path="/rooms" element={<ChatRoomList />} />
                <Route path="/chat/:roomId" element={<Chat username={user?.username} />} />
              </>
            )}
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
