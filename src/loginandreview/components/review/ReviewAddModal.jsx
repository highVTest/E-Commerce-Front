import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, NumberInput, Textarea } from "@mantine/core";

const ReviewAddModal = ({
  rate,
  setRate,
  content,
  setContent,
  addReview,
  situation,
  updateReview,
  reviewId,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={situation == "추가" ? "리뷰 추가" : "리뷰 수정"}
      >
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
          fullWidth
          onClick={() => {
            if (situation == "추가") {
              addReview();
            } else {
              updateReview(reviewId);
            }
          }}
          mt="md"
        >
          {situation == "추가" ? "추가하기" : "수정하기"}
        </Button>
      </Modal>
      <Button
        onClick={() => {
          setContent("");
          setRate(0);
          open();
        }}
      >
        {situation == "추가" ? "리뷰 추가" : "리뷰 수정"}
      </Button>
    </>
  );
};

export default ReviewAddModal;
