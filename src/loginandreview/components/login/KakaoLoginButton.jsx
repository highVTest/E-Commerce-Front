import {REDIRECT_URI} from "../../../constants.js";

const KakaoLoginButton = () => {
    const loginWithKakao = () => {
        window.Kakao.Auth.authorize({
            redirectUri: REDIRECT_URI
        });
    };
    return (
        <button onClick={loginWithKakao} style={{all: "unset"}}>
            <img
                src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
            />
            </button>
    )
}

export default KakaoLoginButton