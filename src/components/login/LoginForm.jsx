import {Button, PasswordInput, Stack, TextInput} from "@mantine/core";


const LoginForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <Stack gap="md">
                <TextInput label="Email" placeholder="example@email.com"/>
                <PasswordInput label="Password" placeholder="비밀번호를 입력하세요"/>
                <Button fullWidth type="submit">로그인</Button>
            </Stack>
        </form>
    );

};

export default LoginForm