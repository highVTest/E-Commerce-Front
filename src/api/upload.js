import axios from "axios";

export const getPresignedUrl = async (fileName) => {
    const response = await axios.get(`http://localhost:3000/upload?fileName=${fileName}`)

    return response.data.presignedUrl;


}