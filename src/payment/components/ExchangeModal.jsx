import "../css/PaymentModal.css";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, TextInput } from "@mantine/core";
import { buyerRequestComplain } from "../../api/v1/orders/orders.js";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function ExchangeModal({ orderMasterId, shopId }) {
  const token = localStorage.getItem("token");
  const [opened, { open, close }] = useDisclosure(false);
  const [refundReason, setRefundReason] = useState("");

  const [click, setClick] = useState(false);

  const reqReject = async () => {
    if (refundReason.length == 0) {
      alert("이유를 작성해주세요");
      return;
    }

    if (click == true) {
      return;
    }
    try {
      setClick(true);
      await buyerRequestComplain(
        token,
        shopId,
        orderMasterId,
        "EXCHANGE",
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
        title="교환 요청"
        centered
        style={{ padding: "10px" }}
      >
        <TextInput
          label="교환 사유"
          placeholder="교환 사유를 작성해 주세요"
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
            교환 요청 하기
          </Button>
        </div>
      </Modal>

      <Button color="black" onClick={open}>
        교환 요청
      </Button>
    </>
  );
}

export default ExchangeModal;
