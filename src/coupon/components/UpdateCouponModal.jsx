import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Modal,
  Button,
  TextInput,
  Fieldset,
  Card,
  Image,
  Text,
  NativeSelect,
  NumberInput,
} from "@mantine/core";
import "../../payment/css/PaymentModal.css";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import { createCoupon, updateCoupon } from "../../api/v1/coupon/coupon.js";

// eslint-disable-next-line react/prop-types
function UpdateCouponModal({ token, coupon }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [discountPolicy, setDiscountPolicy] = useState("정책을 선택해 주세요");
  const [discount, setDiscount] = useState(coupon.discount);
  const [expiredAt, setExpiredAt] = useState(coupon.expiredAt);
  const [quantity, setQuantity] = useState(coupon.quantity);

  const handlerDiscountPolicy = () => {
    if (discountPolicy === "할인율 설정") {
      return (
        <NumberInput
          style={{ marginTop: "5px" }}
          min={1}
          max={40}
          description="할인율은 최대 40% 까지 설정이 가능힙니다"
          label="할인율 설정"
          placeholder="할인율을 설정해주세요"
          onChange={(value) => {
            setDiscount(value);
          }}
        />
      );
    } else if (discountPolicy === "가격 설정") {
      return (
        <NumberInput
          style={{ marginTop: "5px" }}
          min={1}
          max={50000}
          description="할인율은 최대 50000원 까지 설정이 가능힙니다"
          label="가격 설정"
          placeholder="가격을 설정해 주세요"
          value={discount}
          onChange={(value) => {
            setDiscount(value);
          }}
        />
      );
    } else {
      return null;
    }
  };
  const dataDiscountPolicy = () => {
    if (discountPolicy === "할인율 설정") {
      return "DISCOUNT_RATE";
    } else if (discountPolicy === "가격 설정") {
      return "DISCOUNT_PRICE";
    } else return "DISCOUNT_RATE";
  };

  const reqUpdateCoupon = async () => {

    try {
      const data = {
        discountPolicy: dataDiscountPolicy(),
        discount: discount,
        expiredAt: expiredAt,
        quantity: quantity,
      };
      await updateCoupon(token, data, coupon.couponId);

      alert("쿠폰 업데이트가 완료 되었습니다");
      window.location.reload();
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
  };

  const handleDateChange = (value) => {
    if (value) {
      const formattedDate = value.toISOString(); // ISO 8601 형식
      setExpiredAt(formattedDate);
    } else {
      setExpiredAt(null);
    }
  };
  

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="쿠폰 생성"
        centered
        style={{ padding: "10px" }}
      >
        <Fieldset legend="쿠폰 정보 등록" fw={500}>
          <TextInput
            label="쿠폰 이름"
            placeholder="쿠폰 이름을 입력하세요"
            disabled
            value={coupon.couponName}
          />
          <DateInput
            valueFormat="DD/MM/YYYY HH:mm:ss"
            label="만료 기한"
            placeholder="만료 시간을 입력하세요"
            onChange={handleDateChange}
          />
          <NativeSelect
            label="쿠폰 정책"
            data={["정책을 선택해 주세요", "할인율 설정", "가격 설정"]}
            onChange={(e) => {
              setDiscountPolicy(e.target.value);
            }}
          />
          {handlerDiscountPolicy()}
          <NumberInput
            style={{ marginTop: "5px" }}
            label="쿠폰 수량 설정"
            placeholder="쿠폰 수량을 입력하세요"
            value={quantity}
            onChange={(value) => {
              setQuantity(value);
            }}
          />
        </Fieldset>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",gap:"5px",marginRight:"2px",marginTop:"10px"}}>
          <Button
          color="black" 
            onClick={reqUpdateCoupon}
          >
            쿠폰 업데이트 하기
          </Button>
          <Button
          color="black" 
            onClick={close}
            variant="outline"
          >
            닫기
          </Button>
        </div>
      </Modal>

      <Button color="black" onClick={open}>
        쿠폰 수정
      </Button>
    </>
  );
}

export default UpdateCouponModal;
