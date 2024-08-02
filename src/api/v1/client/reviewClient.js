import axios from "axios";

export const reviewClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Access-Control-Allow-Orgin": "*"
    },
});

// reviewClient().interceptors.request.use((config) => {
//     console.log("config : >>", config);
// });
//
// reviewClient().interceptors.response.use((response) => {
//     console.log("response: >>", response);
// });

