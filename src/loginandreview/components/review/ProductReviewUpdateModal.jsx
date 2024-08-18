import { Button, Modal, NumberInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const ProductReviewUpdateModal = ({
  review_id,
  review_rate,
  review_content,
  updateReview,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [rate, setRate] = useState(review_rate);
  const [content, setContent] = useState(review_content);

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
            await updateReview(review_id, rate, content);
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
          setRate(review_rate);
          setContent(review_content);
          open();
        }}
      >
        리뷰 수정
      </Button>
    </>
  );
};

export default ProductReviewUpdateModal;
