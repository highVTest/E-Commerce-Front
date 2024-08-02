import axios from "axios";

export const authClient = axios.create({
    //baseURL: import.meta.env.VITE_AUTH_URL,
    baseURL: "https://moneyfulpublicpolicy.co.kr", //테스트용이기 때문에 벡엔드와 연결시에 변동이 필요함.
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});

// export const reviewClient = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         "Access-Control-Allow-Orgin": "*"
//     },
// });
//
// reviewClient().interceptors.request.use((config) => {
//     console.log("config : >>", config);
// });
//
// reviewClient().interceptors.response.use((response) => {
//     console.log("response: >>", response);
// });