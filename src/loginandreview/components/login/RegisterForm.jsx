import {
  Button,
  FileInput,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [extraAddr, setExtraAddr] = useState("");
  const [detailAddr, setDetailAddr] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState("");
  const [buyerId, setBuyerId] = useState(-1);

  const authTimer = () => {
    let min = 5;
    let sec = 0;
    const timer = setInterval(() => {
      if (min == 0 && sec == 0) {
        clearInterval(timer);
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

  const navigate = useNavigate(); //로그인 후 지정한 주소로 이동 아마 메인페이지?
  const handleSubmit = async (event) => {
    // console.log("버튼 누름");
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nickname = formData.get("nickname");
    const password = formData.get("password");
    // const Email = formData.get("Email");
    // const EmailAuth = formData.get("Email");
    const PhoneNumber = formData.get("PhoneNumber");
    // const address = formData.get("address");
    const fullAddr = address + ` ${detailAddr}`;
    // console.log(fullAddr);

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
      // console.log("dd>>", auth);
      const data = await verifyEmail(email, "BUYER", auth);
      // console.log(data);
      if (data.data.isApproved == false) {
        alert("이메일 인증에 실패 했습니다.\n다시 시도해주세요");
      } else {
        setBuyerId(data.data.id);
        alert("이메일 인증에 성공했습니다.");
        setAuth("");
        setPass(true);
        // clearInterval(timer);
        setIsOk(false);
      }
    } catch (e) {
    }
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
      // alert(e.data.msg);
    }

    // window.location.reload();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="NICKNAME"
          placeholder="닉네임을 입력하세요"
          name="nickname"
        />
        <PasswordInput
          label="PASSWORD"
          placeholder="비밀번호를 입력하세요"
          name="password"
        />
        <div style={{ display: "flex" }}>
          <TextInput
            label="EMAIL"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ width: 500 }}
          />
          <Button
            style={{ width: 100, marginTop: "30px" }}
            fullWidth
            variant="filled"
            color="grey"
            radius="md"
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
                label="EMAIL_AUTH"
                placeholder="인증번호를 입력하세요"
                value={auth}
                onChange={(e) => {
                  setAuth(e.target.value);
                }}
                style={{ width: 500 }}
              />
              <Button
                style={{ width: 100, marginTop: "30px" }}
                fullWidth
                variant="filled"
                color="grey"
                radius="md"
                type="button"
                onClick={authConfirm}
              >
                확인
              </Button>
            </div>
            <Text fw={700}>
              남은 시간 : {authMin}분 {authSec}초
            </Text>
          </>
        ) : (
          <div style={{ display: "none" }}>
            <TextInput
              label="EMAIL_AUTH"
              placeholder="인증번호를 입력하세요"
              value={auth}
              onChange={(e) => {
                setAuth(e.target.value);
              }}
              style={{ width: 500 }}
            />
            <Button
              style={{ width: 100, marginTop: "30px" }}
              fullWidth
              variant="filled"
              color="grey"
              radius="md"
              type="button"
              onClick={authConfirm}
            >
              확인
            </Button>
          </div>
        )}

        <TextInput
          label="PHONENUMBER"
          placeholder="전화번호를 입력하세요"
          name="PhoneNumber"
        />
        {/* <TextInput
          label="ADDRESS"
          placeholder="주소를 입력하세요"
          name="address"
        /> */}
      </Stack>
      <div style={{ marginTop: "25px" }}>
        <DaumPost
          address={address}
          setAddress={setAddress}
          extraAddr={extraAddr}
          setExtraAddr={setExtraAddr}
          detailAddr={detailAddr}
          setDetailAddr={setDetailAddr}
        ></DaumPost>
      </div>

      {/* <Button
          color="lime.4"
          autoContrast
          onClick={() => {
            modals.open({
              title: "프로필 수정",
              children: (
                <>
                  <form onSubmit={handleImageChange}>
                    <FileInput
                      label="이미지"
                      placeholder="이미지를 선택해주세요"
                      name="file"
                    />
                    <br />
                    <Button fullWidth type="submit">
                      등록하기
                    </Button>
                    <Button fullWidth onClick={() => modals.closeAll()} mt="md">
                      취소
                    </Button>
                  </form>
                </>
              ),
            });
          }}
        >
          이미지 등록하기
        </Button> */}
      <Button
        color="gray"
        fullWidth
        type="submit"
        style={{ marginTop: "25px" }}
      >
        REGISTER
      </Button>
    </form>
  );
};

export default RegisterForm;
