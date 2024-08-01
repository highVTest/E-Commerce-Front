import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {REDIRECT_URI} from "../constants.js";

const RedirectPage = () => {
    const [searchParams] = useSearchParams();

    const code = searchParams.get("code");

    useEffect(() => {
        if (!code) return
        const getSocialLoginInfo = async () => {
            const response = await axios.post(import.meta.env.VITE_KAKAO_LOGIN_URL, {
                code,
                pathname: REDIRECT_URI,
            });
            console.log("response.data :>>", response.data);
        };

        getSocialLoginInfo();
    }, [code]);

    return <div>Code: {code}</div>;
};

export default RedirectPage