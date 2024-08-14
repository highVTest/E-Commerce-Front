import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Button, NativeSelect,
} from "@mantine/core";
import {useState} from "react";
import {updateProductsDelivery} from "../../api/v1/orders/orders.js";


// eslint-disable-next-line react/prop-types
function UpdateDeliveryModal({token, shopId, orderMasterId}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [getEnum , setEnum] = useState("ORDERED");

    const orderStatusToEnum = (orderStatus) => {
        switch (orderStatus) {
            case "주문 취소":
                return setEnum("ORDER_CANCELED");

            case "주문 접수":
                return setEnum("ORDERED");

            case "상품 준비 중":
                return setEnum("PRODUCT_PREPARING");

            case "상품 배달 준비 중":
                return setEnum("DELIVERY_PREPARING");

            case "상품 배달 중":
                return setEnum("SHIPPING");

            case "상품 배달 완료":
                return setEnum("DELIVERED");

        }
    }

    const setUpdateProductsDelivery = async () => {
        try {
            await updateProductsDelivery(token, orderMasterId, shopId, getEnum);
            alert("상태 변경이 완료 되었습니다")
            window.location.reload();
        }catch (e) {
            alert(e.response.data.errorMessage)
        }

    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="배송 상태를 변경하시겠습니까??"
                centered
                size="lg"
                style={{ padding: "10px" }}
            >
                <div style={{display:"flex", alignItems:"center", margin:"10px"}}>
                    <div></div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                        <NativeSelect label="주문 상태를 선택해 주세요"
                                      data={['주문 접수', '주문 취소', '상품 준비 중', "상품 배달 준비 중", "상품 배달 중", "상품 배달 완료"]}
                                      style={{width:"500px"}}
                                      onChange={(e) => orderStatusToEnum(e.currentTarget.value)}/>
                        <Button style={{marginLeft: "10px", marginTop: "29px"}} onClick={setUpdateProductsDelivery}>적용</Button>
                    </div>
                </div>
            </Modal>
            <Button style={{marginLeft: "10px", width: "120px"}} color="grey" onClick={open}>배송 상태 변경</Button>
        </>
    );
}

export default UpdateDeliveryModal;
