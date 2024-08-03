import axios from "axios";

// const client = axios.create({
//     baseURL: 'https://api.example.com',
//     headers: { 'Content-Type': 'application/json' }
// })

// client.get("/api/v1")
//     .then(r=> r.data)


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_HIGH_V_URL,
    headers: {
      "Access-Control-Allow-Origin": "*", // CORS
    },
  });

// export default client