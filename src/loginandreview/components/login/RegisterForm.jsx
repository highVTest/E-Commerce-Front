import {
  Button,
  FileInput,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { sendMail, verifyEmail } from "../../../api/v1/auth/auth.js";
import { modals } from "@mantine/modals";
import { uploadImage } from "../../../api/v1/image/image.js";
import { buyerSignUp } from "../../../api/v1/buyer/buyer.js";
import DaumPost from "../../../Components/DaumPost.jsx";

const RegisterForm = () => {
  const [isOk, setIsOk] = useState(false); // 이메일 인증번호가 발송 될 때
  const [authMin, setAuthMin] = useState(5);
  const [authSec, setAuthSec] = useState(0);
  const [pass, setPass] = useState(false);

  const [address, setAddress] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState("");
  const [buyerId, setBuyerId] = useState(-1);

  const timerRef = useRef();

  const authTimer = () => {
    let min = 5;
    let sec = 0;

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (min == 0 && sec == 0) {
        clearInterval(timerRef.current);
        setIsOk(false);
        setAuthMin(5);
        setAuthSec(0);
      } else if (sec == 0) {
        min--;
        sec = 59;
        setAuthMin(min);
        setAuthSec(sec);
      } else if (0 < sec < 60) {
        sec--;
        setAuthSec(sec);
      }
    }, 1000);
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nickname = formData.get("nickname");
    const password = formData.get("password");
    const PhoneNumber = formData.get("PhoneNumber");
    const fullAddr = address;

    if (pass == false) {
      alert("이메일 인증을 완료 해주세요");
      return;
    }

    try {
      const data = await buyerSignUp(
        buyerId,
        nickname,
        password,
        email,
        imageUrl,
        PhoneNumber,
        fullAddr
      );

      alert("회원가입이 완료됐습니다.");
      navigate("/login/buyer");
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
  };

  const sendEamil = async () => {
    try {
      if (email == "") {
        alert("이메일을 입력해주세요");
        return;
      }
      const data = await sendMail(email, "BUYER");
      authTimer();
      alert(data.data.msg + "\n5분 이내에 인증해주세요");
      setIsOk(true);
    } catch (e) {
      const message = e.response.data.errorMessage;
      alert(message);
    }
  };

  const authConfirm = async () => {
    try {
      const data = await verifyEmail(email, "BUYER", auth);
      if (data.data.isApproved == false) {
        alert("이메일 인증에 실패 했습니다.\n다시 시도해주세요");
      } else {
        setBuyerId(data.data.id);
        alert("이메일 인증에 성공했습니다.");
        setAuth("");
        setPass(true);
        setIsOk(false);
      }
    } catch (e) {}
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (file.size == 0) {
      alert("이미지를 선택해주세요");
      return;
    }

    try {
      const dataImage = await uploadImage("test", file);
      setImageUrl(dataImage.data.imageUrl);
      alert("이미지가 등록됐습니다.");
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          name="nickname"
        />
        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          name="password"
        />
        <div style={{ display: "flex", alignItems: "ce" }}>
          <TextInput
            label="이메일"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ width: 500 }}
          />
          <Button
            color="black"
            style={{ width: 100, marginTop: "24px", marginLeft: "5px" }}
            fullWidth
            variant="filled"
            onClick={sendEamil}
            type="button"
          >
            인증
          </Button>
        </div>

        {isOk ? (
          <>
            <div style={{ display: "flex" }}>
              <TextInput
                label="이메일 인증번호"
                placeholder="인증번호를 입력하세요"
                value={auth}
                onChange={(e) => {
                  setAuth(e.target.value);
                }}
                style={{ width: 500 }}
              />
              <Button
                color="black"
                style={{ width: 100, marginTop: "25px", marginLeft: "5px" }}
                fullWidth
                variant="filled"
                type="button"
                onClick={authConfirm}
              >
                확인
              </Button>
            </div>
            <Text fw={700} style={{ marginTop: "-15px" }}>
              남은 시간 : {authMin}분 {authSec}초
            </Text>
          </>
        ) : (
          <div style={{ display: "none" }}>
            <TextInput
              label="이메일 인증번호"
              placeholder="인증번호를 입력하세요"
              value={auth}
              onChange={(e) => {
                setAuth(e.target.value);
              }}
              style={{ width: 500 }}
            />
            <Button
              color="black"
              style={{ width: 100, marginTop: "25px", marginLeft: "5px" }}
              fullWidth
              variant="filled"
              type="button"
              onClick={authConfirm}
            >
              확인
            </Button>
          </div>
        )}

        <TextInput
          label="휴대전화번호"
          placeholder="휴대전화번호를 입력하세요"
          name="PhoneNumber"
        />
      </Stack>
      <div style={{ marginTop: "25px" }}>
        <DaumPost address={address} setAddress={setAddress}></DaumPost>
      </div>
      <Button
        color="black"
        fullWidth
        type="submit"
        style={{ marginTop: "25px" }}
      >
        회원 가입
      </Button>
    </form>
  );
};

export default RegisterForm;
