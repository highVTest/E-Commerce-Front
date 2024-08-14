import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Fieldset,
  Image,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { deleteReview, getBuyerReviews } from "../../api/v1/review/review.js";
import ReviewUpdateModal from "../components/review/ReviewUpdateModal.jsx";
// eslint-disable-next-line react/prop-types
const MyReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const [click, setClick] = useState(false);

  const getMyReview = async () => {
    const data = await getBuyerReviews(token);
    console.log(data.data);
    setReviews(data.data);
  };

  const delReview = async (productId, reviewId) => {
    if (click == true) {
      return;
    }

    setClick(true);
    try {
      const data = await deleteReview(token, productId, reviewId);
      setClick(false);
      alert("리뷰 삭제가 완료됐습니다.");
      getMyReview();
    } catch (e) {
      setClick(false);
    }
  };

  useEffect(() => {
    getMyReview();
  }, []);

  return (
    <>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "black", to: "blue", deg: 100 }}
        style={{ textAlign: "center", fontSize: 50 }}
      >
        내 리뷰
      </Text>
      <ul>
        <Stack
          // h={shop.items.length == 1 ? 250 : 370}
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="xs"
          style={{ marginTop: "10px" }}
        >
          {reviews.map((review) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Grid
                style={{
                  backgroundColor: "beige",
                  height: "280px",
                  justifyContent: "center",
                }}
                key={review.id}
              >
                <Fieldset style={{ marginLeft: "20px", marginTop: "30px" }}>
                  <Grid></Grid>
                  <Group
                    gap="xs"
                    grow
                    style={{ margin: "10px", width: "1080px", height: "200px" }}
                  >
                    <Grid.Col span={3}>
                      <Image
                        src={review.productImage}
                        h={200}
                        w={200}
                        fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Stack align="flex-start" justify="center" gap="md">
                        <Text fw={1000} size="xl">
                          상품 명 : {review.productName}
                        </Text>
                        <Text fw={1000} size="xl">
                          내가 작성한 리뷰 : {review.content}{" "}
                        </Text>
                        <Text fw={1000} size="lg">
                          내가 준 평점 : {review.rate} 점
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Stack>
                        <ReviewUpdateModal
                          token={token}
                          reviewId={review.id}
                          productId={review.productId}
                        />
                        <Button
                          color="gray"
                          // fullWidth
                          mt="md"
                          radius="md"
                          style={{ width: "100px", height: "40px" }}
                          onClick={() => {
                            delReview(review.productId, review.id);
                          }}
                        >
                          삭제 하기
                        </Button>
                      </Stack>
                    </Grid.Col>
                  </Group>
                </Fieldset>
              </Grid>
            );
          })}
        </Stack>
      </ul>
    </>
  );
};

export default MyReviewPage;
