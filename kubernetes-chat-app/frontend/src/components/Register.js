import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { Box, Input, Button, Heading, VStack, Alert, AlertTitle } from "@chakra-ui/react";

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState("info");
    const navigate = useNavigate();  // ✅ `useNavigate()`를 여기서 사용

    const handleRegister = async () => {
        try {
            const response = await register(username, password);
            if (response.message === "User registered successfully") {
                localStorage.setItem("user", JSON.stringify({ username }));  // ✅ 사용자 정보 저장
                onRegister();
                navigate("/rooms");  // ✅ 회원가입 성공 후 방 목록으로 이동
            } else {
                setStatus("error");
                setMessage("❌ 회원가입 실패");
            }
        } catch (error) {
            console.error("❌ 회원가입 요청 실패:", error);
            setStatus("error");
            setMessage("❌ 회원가입 요청 실패");
        }
    };

    return (
        <Box bg="white" p={6} rounded="md" shadow="md" width="400px">
            <Heading size="lg" mb={4} textAlign="center">Register</Heading>

            {message && (
                <Alert status={status} mb={4}>
                    <AlertTitle>{message}</AlertTitle>
                </Alert>
            )}

            <VStack spacing={4}>
                <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} size="lg" />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" />
                <Button colorScheme="green" width="full" onClick={handleRegister}>Register</Button>
            </VStack>
        </Box>
    );
};

export default Register;
