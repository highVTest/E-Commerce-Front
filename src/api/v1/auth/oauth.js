// import axios from "axios";
// import app from "../../../App.jsx";
//
// const client_id = "32bacd91452402d211e69c4291c7f4a9"
//
// //카카오 사용자 정보 요청 API = POST 요청 보내는 API
// app.post("/oauth/kakao", async (req, res) => {
//     let token = "";
//
//     const {code, pathname} = req.body;
//
//     try {
//         const response = await axios.post(
//             "https://kauth.kakao.com/oauth/token",
//             `grant_type=authorization_code&client_id=${client_id}&redirect_uri=${pathname}&code=${code}`,
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
//                 },
//             }
//         );
//
//         token = response.data.access_token;
//     } catch (error) {
//         console.log("error :>>", error);
//     }
//
//     console.log("/", token);
//     try {
//         const response = await axios.get("https://kauth.kakao.com/v2/user/me", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         const user = response.data;
//
//         console.log("/", user);
//
//         res.status(200).json({
//             success: true,
//             user,
//             token,
//         });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     });
const CLIENT_ID =import.meta.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = import.meta.env.REACT_APP_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;



