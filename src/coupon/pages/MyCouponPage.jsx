import { Button, Grid, Group, Stack, Text, Fieldset } from "@mantine/core";
import {
  deleteBuyerCoupon,
  getBuyerCouponList,
} from "../../api/v1/coupon/coupon.js";
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
const MyCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const token = localStorage.getItem("token");

  const [click, setClick] = useState(false);

  const getBuyerCoupon = async () => {
    const data = await getBuyerCouponList(token);
    // console.log(data.data);
    setCoupons(data.data);
  };

  const getDeleteBuyerCoupon = async (couponId) => {
    if (click == true) {
      return;
    }
    setClick(true);
    try {
      await deleteBuyerCoupon(token, couponId);
      alert("쿠폰 삭제가 완료 되었습니다");
      setClick(false);
      getBuyerCoupon();
    } catch (e) {
      alert(e.response.data.errorMessage);
      setClick(false);
    }
  };

  useEffect(() => {
    getBuyerCoupon();
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
        내 쿠폰 목록
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
          {coupons.map((coupon) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Grid
                style={{
                  backgroundColor: "beige",
                  height: "280px",
                  justifyContent: "center",
                }}
                key={coupon.couponId}
              >
                <Fieldset style={{ marginLeft: "20px", marginTop: "30px" }}>
                  <Grid></Grid>
                  <Group
                    gap="xs"
                    grow
                    style={{ margin: "10px", width: "1080px", height: "200px" }}
                  >
                    <Grid.Col span={9}>
                      <Stack align="flex-start" justify="center" gap="md">
                        <Text fw={1000} size="xl">
                          {coupon.couponName}{" "}
                        </Text>
                        {coupon.discountPolicy === "DISCOUNT_RATE" ? (
                          <Text fw={800} size="lg">
                            {coupon.discount} % 할인
                          </Text>
                        ) : (
                          <Text fw={800} size="lg">
                            {coupon.discount} 원 할인
                          </Text>
                        )}
                        <Text fw={800} size="lg" mt="md">
                          만료 시간 : {coupon.expiredAt.split("-")[0]} 년{" "}
                          {coupon.expiredAt.split("-")[1]} 월{" "}
                          {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Button
                        color="gray"
                        // fullWidth
                        mt="md"
                        radius="md"
                        style={{ width: "100px", height: "50px" }}
                        onClick={() => {
                          getDeleteBuyerCoupon(coupon.couponId);
                        }}
                      >
                        삭제 하기
                      </Button>
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

export default MyCouponPage;
