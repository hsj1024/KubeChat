import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Input, Button, VStack, Heading, Text, Flex } from "@chakra-ui/react";

const Chat = ({ username }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!roomId || !username) return;

    console.log(`🔗 Connecting to room ${roomId} as ${username}...`);

    if (socketRef.current) {
      socketRef.current.close();
    }

    // ✅ WebSocket URL에 username을 포함해서 보냄
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}/${username}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log(`✅ Connected to room ${roomId} as ${username}`);
    };

    socket.onmessage = (event) => {
      try {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage.username && receivedMessage.message) {
          setMessages((prev) => [...prev, receivedMessage]); // ✅ 기존 메시지 유지
        } else {
          console.warn("⚠ Invalid message format received:", receivedMessage);
        }
      } catch (error) {
        console.error("❌ JSON Parsing Error:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log(`❌ WebSocket Closed for room ${roomId}`);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        console.log(`🔴 Disconnected from room ${roomId}`);
      }
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const chatMessage = JSON.stringify({ message });  // ✅ username을 서버에서 처리
      console.log(`📤 Sending message:`, chatMessage);

      socketRef.current.send(chatMessage);
      setMessage("");
    } else {
      console.error("❌ WebSocket is not open. Unable to send message.");
    }
  };

  return (
    <Box bg="gray.50" p={6} rounded="md" shadow="md" maxWidth="800px" mx="auto">
      {/* 상단: 채팅방 정보 & 뒤로 가기 버튼 */}
      <Flex mb={4} align="center">
        <Button colorScheme="gray" size="sm" onClick={() => navigate("/rooms")}>
          ⬅ Back
        </Button>
        <Heading size="md" mx="auto">Chat Room: {roomId}</Heading>
        <Text fontSize="sm" color="gray.600">👤 {username}</Text>
      </Flex>

      {/* 채팅 메시지 영역 */}
      <VStack spacing={4} align="stretch" height="400px" overflowY="auto" border="1px solid" borderColor="gray.300" p={4} borderRadius="md" bg="white">
        {messages.map((msg, index) => (
          <Box
            key={index}
            p={3}
            borderRadius="md"
            bg={msg.username === username ? "blue.100" : "gray.100"}
            alignSelf={msg.username === username ? "flex-end" : "flex-start"}
            maxWidth="75%"
          >
            <Text fontSize="sm" fontWeight="bold">{msg.username}</Text>
            <Text>{msg.message}</Text>
          </Box>
        ))}
      </VStack>

      {/* 메시지 입력창 */}
      <Flex mt={4}>
        <Input
          flex="1"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button ml={2} colorScheme="blue" onClick={sendMessage}>
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default Chat;
