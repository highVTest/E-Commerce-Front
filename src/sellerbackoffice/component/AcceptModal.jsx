import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Button,
    TextInput,
    Text,
} from "@mantine/core";
import { useState } from "react";
import {requestComplainAccept} from "../../api/v1/orders/orders.js";


// eslint-disable-next-line react/prop-types
function AcceptModal({token, data, shopId}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [typing, setTyping] = useState(null)

    const setContent = (data) => {
        setTyping(data)
    }

    const reqReject = async () => {
        try {
            await requestComplainAccept(token, shopId ,data.orderMasterId, typing)
            alert("승인 요청이 완료 되었습니다")
            window.location.reload()
        }catch (e){
            alert(e.response.data.errorMessage)
        }

    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="승인 요청"
                centered
                size="lg"
                style={{ padding: "10px" }}
            >
                <div style={{display:"flex", alignItems:"center"}}>
                    <Text>승인 사유 : </Text>
                    <TextInput
                        style={{marginLeft:"20px", width:"500px"}}
                        onChange={(e)=>{setContent(e.target.value)}}
                    ></TextInput>
                </div>
                <div style={{display:"flex", alignItems:"center", margin:"10px"}}>
                    <div style={{width:"85%"}}></div>
                    <Button color="black" onClick={reqReject}>승인 요청</Button>
                </div>
            </Modal>
            <Button color="black" style={{marginLeft: "10px", width: "100px"}} onClick={open}>승인 하기</Button>
        </>
    );
}

export default AcceptModal;