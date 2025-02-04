import "../css/PaymentModal.css";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, TextInput } from "@mantine/core";
import { buyerRequestComplain } from "../../api/v1/orders/orders.js";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function RefundModal({ orderMasterId, shopId }) {
  // console.log(shopId);
  const token = localStorage.getItem("token");
  const [opened, { open, close }] = useDisclosure(false);
  const [refundReason, setRefundReason] = useState("");

  const [click, setClick] = useState(false);

  const reqReject = async () => {
    if (refundReason.length == 0) {
      alert("이유를 입력해주세요");
      return;
    }

    if (click == true) {
      return;
    }
    setClick(true);
    try {
      await buyerRequestComplain(
        token,
        shopId,
        orderMasterId,
        "REFUND",
        refundReason
      );
      alert("환불 요청이 완료 되었습니다");
      setClick(false);
      close();
      window.location.reload();
    } catch (error) {
      alert(error);
      setClick(false);
    }
  };

  const handleInputChange = (e) => {
    setRefundReason(e.target.value);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="환불 요청"
        centered
        style={{ padding: "10px" }}
      >
        <TextInput
          label="환불 사유"
          placeholder="환불 사유를 작성해 주세요"
          value={refundReason}
          onChange={handleInputChange}
        />
        <div style={{ display: "flex" }}>
          <div style={{ width: "70%" }}></div>
          <Button
          color="black" 
            onClick={reqReject}
            style={{ marginTop: "10px" }}
          >
            환불 요청 하기
          </Button>
        </div>
      </Modal>

      <Button color="black" onClick={open}>
        환불 요청
      </Button>
    </>
  );
}

export default RefundModal;
