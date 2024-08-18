import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, NumberInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { updateReview } from "../../../api/v1/review/review.js";

const ReviewUpdateModal = ({ token, productId, reviewId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [content, setContent] = useState("");
  const [rate, setRate] = useState(0);

  const [click, setClick] = useState(false);

  const getUpdateReview = async () => {
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
      window.location.reload();
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
