import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Button,
    TextInput,
    Text,
} from "@mantine/core";
import { useState } from "react";
import {requestComplainReject} from "../../api/v1/orders/orders.js";


// eslint-disable-next-line react/prop-types
function RejectModal({token, data, shopId}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [typing, setTyping] = useState(null)

    const setContent = (data) => {
        setTyping(data)
    }

    const reqReject = async () => {
        try {
            await requestComplainReject(token, shopId ,data.orderMasterId, data.products[0].complainStatus.split("_")[0], typing)
            alert("거절 요청이 완료되었습니다")
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
                title="환불 거절 요청"
                centered
                size="lg"
                style={{ padding: "10px" }}
            >
                <div style={{display:"flex", alignItems:"center"}}>
                    <Text>거절 사유 &emsp;</Text>
                    <TextInput
                        style={{marginLeft:"20px", width:"500px"}}
                        onChange={(e)=>{setContent(e.target.value)}}
                    ></TextInput>
                </div>
                <div style={{display:"flex", alignItems:"center", margin:"10px"}}>
                    <div style={{width:"85%"}}></div>
                    <Button color="black" onClick={reqReject}>거절 요청</Button>
                </div>
            </Modal>
            <Button color="black" style={{marginLeft: "10px", width: "100px"}} variant="outline" onClick={open}>거절 하기</Button>
        </>
    );
}

export default RejectModal;
