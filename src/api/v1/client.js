import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_HIGH_V_URL,
    headers: {
      "Access-Control-Allow-Origin": "*", // CORS
    },
});