import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // 📌 라우팅을 위한 useNavigate 추가
import { Box, Button, Heading, Input, VStack, List, ListItem } from "@chakra-ui/react";
import { getChatRooms, createChatRoom } from "../services/api";

const ChatRoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState("");
    const navigate = useNavigate();  // ✅ useNavigate 훅 사용

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const data = await getChatRooms();
        setRooms(data);
    };

    const handleCreateRoom = async () => {
        if (newRoomName.trim() !== "") {
            const data = await createChatRoom(newRoomName);
            setRooms([...rooms, data]);
            setNewRoomName("");
        }
    };

    return (
        <Box p={6} bg="white" rounded="md" shadow="md" width="400px">
            <Heading size="lg" mb={4}>Chat Rooms</Heading>
            <VStack spacing={4}>
                <List spacing={3} width="full">
                    {rooms.map((room) => (
                        <ListItem
                            key={room.id}
                            p={2}
                            bg="gray.100"
                            rounded="md"
                            cursor="pointer"
                            _hover={{ bg: "gray.200" }}
                            onClick={() => navigate(`/chat/${room.id}`)}  // ✅ 클릭 시 해당 채팅방으로 이동
                        >
                            {room.name}
                        </ListItem>
                    ))}
                </List>
                <Input
                    placeholder="New room name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                />
                <Button colorScheme="blue" onClick={handleCreateRoom}>
                    Create Room
                </Button>
            </VStack>
        </Box>
    );
};

export default ChatRoomList;
