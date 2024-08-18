import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, NumberInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { updateReview } from "../../../api/v1/review/review.js";

const ReviewUpdateModal = ({
  token,
  productId,
  reviewId,
  review_content,
  review_rate,
  getMyReview,
  productName,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [click, setClick] = useState(false);
  const [content, setContent] = useState(review_content);
  const [rate, setRate] = useState(review_rate);

  const getUpdateReview = async () => {
    if (productName == "") {
      alert("삭제된 상품입니다.");
      close();
      return;
    }

    if (content.length == 0) {
      alert("내용을 입력해주세요");
      return;
    }

    if (click == true) {
      return;
    }

    try {
      setClick(true);
      await updateReview(token, productId, reviewId, rate, content);
      alert("리뷰 수정이 완료 되었습니다");
      setClick(false);
      await getMyReview();
      close();
    } catch (e) {
      setClick(false);
      alert(e);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="리뷰 수정">
        <TextInput
          label="내용"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <NumberInput
          label="평점"
          placeholder="평점을 입력해주세요"
          value={rate}
          onChange={(e) => {
            if (e >= 5) {
              setRate(5);
            } else if (e <= 0) {
              setRate(0);
            } else {
              setRate(e);
            }
          }}
        />
        <Button color="black" fullWidth onClick={getUpdateReview} mt="md">
          수정 하기
        </Button>
      </Modal>
      <Button
        color="black"
        onClick={() => {
          open();
        }}
      >
        리뷰 수정
      </Button>
    </>
  );
};

export default ReviewUpdateModal;
