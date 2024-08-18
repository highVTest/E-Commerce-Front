import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, TextInput, Fieldset, Card, Image, Text} from '@mantine/core';
import "../css/PaymentModal.css"

function OrderStatus() {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="결제 정보" centered style={{padding:'10px'}}>
                <Fieldset legend="배송 정보" disabled style={{fontWeight: "bold"}}>
                    <TextInput label="주문자" placeholder="Your name"/>
                    <TextInput label="휴대폰 번호" placeholder="Email" mt="md"/>
                    <TextInput label="배송지" placeholder="Email" mt="md"/>
                </Fieldset>
                <Fieldset legend="주문 상품" disabled fw={1000}>
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
                                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                    h={100}
                                    alt="No way!"
                                />
                            </Card>
                            <div>
                                <Text fw={1000} size="lg" mt="md">
                                    상품 정보
                                </Text>
                                <Text mt="xs" c="dimmed" size="sm">
                                    2000 원
                                </Text>
                            </div>
                        </div>
                    </Card>
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
                                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                    h={100}
                                    alt="No way!"
                                />
                            </Card>
                            <div>
                                <Text fw={1000} size="lg" mt="md">
                                    상품 정보
                                </Text>
                                <Text mt="xs" c="dimmed" size="sm">
                                    2000 원
                                </Text>
                            </div>
                        </div>
                    </Card>
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
                                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                    h={100}
                                    alt="No way!"
                                />
                            </Card>
                            <div>
                                <Text fw={1000} size="lg" mt="md">
                                    상품 정보
                                </Text>
                                <Text mt="xs" c="dimmed" size="sm">
                                    2000
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Fieldset>
                <Fieldset disabled fw={1000}>
                    <div className="payment-set">
                        <Text mt="xs" size="lg" fw={500}>
                            총 주문 금액
                        </Text>
                        <Text mt="xs" size="lg" fw={1000}>
                            2000 원
                        </Text>
                    </div>
                </Fieldset>
                <div>
                    <Button color="black" style={{margin: "10px", float: "right"}}>결제 하기</Button>
                    <Button color="black" onClick={close} style={{margin: "10px", float: "right"}}>닫기</Button>
                </div>
            </Modal>

            <Button color="black" onClick={open}>결제 하기</Button>
        </>
    );
}

export default OrderStatus;