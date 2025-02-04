import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, NumberInput, Textarea } from "@mantine/core";
import { useState } from "react";

const ReviewAddModal = ({ addReview }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [rate, setRate] = useState(0);
  const [content, setContent] = useState("");

  return (
    <>
      <Modal opened={opened} onClose={close} title="리뷰 추가">
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
            await addReview(rate, content);
            close();
          }}
          mt="md"
        >
          추가하기
        </Button>
      </Modal>
      <Button
        color="black"
        onClick={() => {
          setContent("");
          setRate(0);
          open();
        }}
      >
        리뷰 추가
      </Button>
    </>
  );
};

export default ReviewAddModal;
