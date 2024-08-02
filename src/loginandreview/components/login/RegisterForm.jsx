import {Button, PasswordInput, Stack, TextInput} from "@mantine/core";
import {register} from "../../../api/v1/client/auth.js";
import {useNavigate} from "react-router-dom";


const RegisterForm = () => {
    const navigate = useNavigate(); //로그인 후 지정한 주소로 이동 아마 메인페이지?
    const handleSubmit =async (event) => {
        console.log("버튼 누름");
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const ID = formData.get("Id")
        const nickname = formData.get("nickname");
        const password = formData.get("password");
        const Email = formData.get("Email");
        const PhoneNumber = formData.get("PhoneNumber");
        const address = formData.get("address");



        console.log(Email, password);

        const data = await register(ID,nickname,password,Email,PhoneNumber,address);



        alert(data.message);
        navigate("/login");
    };

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <Stack gap="md"> <TextInput
                label="ID"
                placeholder="ID를 입력하세요"
                name = "Id"/>
                <TextInput
                    label="NICKNAME"
                    placeholder="닉네임을 입력하세요"
                    name = "nickname"/>
                <PasswordInput
                    label="PASSWORD"
                    placeholder="비밀번호를 입력하세요"
                    name="password"
                />
                <TextInput
                    label="EMAIL"
                    placeholder="이메일을 입력하세요"
                    name="Email"
                />
                <TextInput
                    label="PHONENUMBER"
                    placeholder="전화번호를 입력하세요"
                    name="PhoneNumber"
                />
                <TextInput
                    label="ADDRESS"
                    placeholder="주소를 입력하세요"
                    name="address"
                />
                <Button fullWidth type="submit">
                    REGISTER
                </Button>
            </Stack>
        </form>
    );

};

export default RegisterForm