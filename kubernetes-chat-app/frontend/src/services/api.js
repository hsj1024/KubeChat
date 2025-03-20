import API_BASE_URL from "../config";

// 로그인 API
export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Failed to login");
    }

    return response.json();
}

// 회원가입 API
export async function register(username, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Failed to register");
    }

    return response.json();
}

// 채팅방 목록 가져오기
export async function getChatRooms() {
    const response = await fetch(`${API_BASE_URL}/chat/rooms`);
    if (!response.ok) {
        throw new Error("Failed to fetch chat rooms");
    }
    return response.json();
}

// 새로운 채팅방 생성
export async function createChatRoom(roomName) {
    const response = await fetch(`${API_BASE_URL}/chat/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  // ✅ JSON 요청임을 명시
        },
        body: JSON.stringify({ room_name: roomName })  // ✅ JSON 데이터로 전송
    });

    if (!response.ok) {
        throw new Error("Failed to create chat room");
    }

    return response.json();
}

