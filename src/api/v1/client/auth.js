import {authClient} from "./client.js";

export const register = async (id, Email, password, nickname, ) => {
    const response = await authClient.post("/register", {id, Email, password, nickname});

    return response.data;
};

export const login = async (Email, password) => {
    const response = await authClient.post("/login", {Email,password});

    return response.data;
};

export const getUserInfo = async (token) => {
    const response = await authClient.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`,

        },
    });

    return response.data;
}
