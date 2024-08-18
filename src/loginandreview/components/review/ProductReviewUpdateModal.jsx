import { Button, Modal, NumberInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const ProductReviewUpdateModal = (review, updateReview) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [rate, setRate] = useState(review.rate);
  const [content, setContent] = useState(review.content);

  return (
    <>
      <Modal opened={opened} onClose={close} title="리뷰 수정">
        <Textarea
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
        <Button
          color="black"
          fullWidth
          onClick={async () => {
            await updateReview(review.id, rate, content);
            close();
          }}
          mt="md"
        >
          수정하기
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

export default ProductReviewUpdateModal;
