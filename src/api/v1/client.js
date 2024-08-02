import axios from "axios";

const client = axios.create({
    baseURL: 'https://api.example.com',
    headers: { 'Content-Type': 'application/json' }
})

client.get("/api/v1")
    .then(r=> r.data)

export default client