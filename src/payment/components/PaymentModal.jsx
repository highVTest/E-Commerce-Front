import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, TextInput, Fieldset, Card, Image, Text} from '@mantine/core';
import "../css/PaymentModal.css"
import {useEffect, useState} from "react";
import {buyerPayment} from "../../api/v1/orders/orders.js";
import {getMyProfile} from "../../api/v1/buyer/buyer.js";

// eslint-disable-next-line react/prop-types
function PaymentModal({totalPrice, paymentData, cartIdList, token}) {

    const [opened, { open, close }] = useDisclosure(false);
    const [buyerData, setBuyerData] = useState([]);
    const reqPayment = async () =>{
        try{
            await buyerPayment(token, cartIdList, [])
            alert("결제가 완료 되었습니다")
            close()
        }catch (error){
            alert(error)
        }
    }

    const getBuyerData = async () =>{
        let data = await getMyProfile(token)
        setBuyerData(data.data);
    }

    useEffect(() => {
        getBuyerData()
    })


    return (
        <>
            <Modal opened={opened} onClose={close} title="결제 정보" centered style={{padding:'10px'}}>
                <Fieldset legend="배송 정보" disabled style={{fontWeight: "bold"}}>
                    <TextInput label="주문자" placeholder={buyerData.nickname}/>
                    <TextInput label="휴대폰 번호" placeholder={buyerData.phoneNumber} mt="md"/>
                    <TextInput label="배송지" placeholder={buyerData.address} mt="md"/>
                </Fieldset>
                <Fieldset legend="주문 상품" disabled fw={1000}>
                    {
                        // eslint-disable-next-line react/prop-types
                        paymentData.map((item) => {
                            return (
                                <>
                                    <Card
                                        shadow="sm"
                                        padding="xxs"
                                        component="a"
                                        target="_blank"
                                    >
                                        <div className="field-set">
                                            <Card
                                                shadow="none"
                                                padding="lg"
                                                component="a"
                                            >
                                                <Image
                                                    src={item.productImage}
                                                    h={100}
                                                    alt="No way!"
                                                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                                />
                                            </Card>
                                            <div>
                                                <Text fw={1000} size="lg" mt="md">
                                                    {item.productName}
                                                </Text>
                                                <Text mt="xs" c="dimmed" size="sm">
                                                    {item.productPrice}
                                                </Text>
                                            </div>
                                        </div>
                                    </Card>
                                </>
                            )
                        })
                    }
                </Fieldset>
                <Fieldset disabled fw={1000}>
                    <div className="payment-set">
                        <Text mt="xs" size="lg" fw={500}>
                            총 주문 금액
                        </Text>
                        <Text mt="xs" size="lg" fw={1000}>
                            {totalPrice} 원
                        </Text>
                    </div>
                </Fieldset>
                <div>
                    <Button onClick={reqPayment} style={{margin: "10px", float: "right"}}>결제 하기</Button>
                    <Button onClick={close} style={{margin: "10px", float: "right"}}>닫기</Button>
                </div>
            </Modal>

            <Button onClick={open}>결제 하기</Button>
        </>
    );
}

export default PaymentModal;