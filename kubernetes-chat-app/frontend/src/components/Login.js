import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { Box, Input, Button, Heading, VStack, Alert, AlertTitle } from "@chakra-ui/react";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState("info");
    const navigate = useNavigate();  // ✅ `useNavigate()`를 여기서 사용

    const handleLogin = async () => {
        console.log("🔍 로그인 요청 시작...");
        try {
            const response = await login(username, password);
            console.log("✅ 로그인 응답:", response);

            if (response.message === "User authenticated") {
                localStorage.setItem("user", JSON.stringify({ username }));  // ✅ 사용자 정보 저장
                onLogin();
                navigate("/rooms");  // ✅ 로그인 성공 후 방 목록으로 이동
            } else {
                setStatus("error");
                setMessage("❌ 로그인 실패: 잘못된 자격증명");
            }
        } catch (error) {
            console.error("❌ 로그인 요청 실패:", error);
            setStatus("error");
            setMessage("❌ 로그인 요청 실패");
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
            <Box bg="white" p={6} rounded="md" shadow="md" width="400px">
                <Heading size="lg" mb={4} textAlign="center">Login</Heading>

                {message && (
                    <Alert status={status} mb={4}>
                        <AlertTitle>{message}</AlertTitle>
                    </Alert>
                )}

                <VStack spacing={4}>
                    <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} size="lg" />
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" />
                    <Button colorScheme="blue" width="full" onClick={handleLogin}>Login</Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Login;
