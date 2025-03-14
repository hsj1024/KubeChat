import API_BASE_URL from "../config";

export async function login(username, password) {
    const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({username, password}),
    });
    return response.json();
}

export async function register(username, password) {
    const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({username, password}),

    });
    return response.json();
    
}