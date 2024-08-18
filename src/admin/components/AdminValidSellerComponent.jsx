import { Button, Container, Grid, Image, Stack } from "@mantine/core";
import "../../sellerbackoffice/component/css/SellerInfoForm.css";
import "../../sellerbackoffice/component/css/ProductForm.css";
import {
  getSellerBySellerId,
  promotePendingSeller,
} from "../../api/v1/admin/admin.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminValidSellerComponent = ({ token }) => {
  const params = useParams();
  const [seller, setSeller] = useState(null);
  const [clicked, setClicked] = useState(false);
  const sellerId = params.id;

  const getSellerData = async () => {
    const data = await getSellerBySellerId(token, sellerId);
    console.log(data.data);
    setSeller(data.data);
  };

  const promote = async () => {
    try {
      if (clicked === false) {
        setClicked(true);
        await promotePendingSeller(token, sellerId);
        alert("판매자 승인이 완료 되었습니다");
        window.location.href = "/admin/seller-accept";
      } else return null;
    } catch (e) {
      alert(e.response.data.errorMessage);
    }

    setClicked(false);
  };

  useEffect(() => {
    getSellerData();
  }, []);

  return (
    <div>
      <div
        className="seller"
        style={{ display: "flex", width: "100%", flexDirection: "column" }}
      >
        <h1>판매자 상세 정보</h1>
        <div className="info-box" style={{ width: "100%" }}>
          <h2>Seller Info</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="image-container">
                <Image
                  className="seller-img"
                  radius="md"
                  style={{ marginBottom: "5px" }}
                  h={120}
                  w={120}
                  fit="crop"
                  src={seller?.profileImage}
                  fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "15px",
                }}
              >
                <div className="seller-info">
                  <Stack
                    align="stretch"
                    justify="center"
                    style={{ marginLeft: "50px" }}
                  >
                    <Grid
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "left" }}
                      >
                        <b>이름</b>
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          style={{
                            alignContent: "center",
                            textAlign: "left",
                          }}
                        >
                          {seller?.nickname}
                        </Container>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "left" }}
                      >
                        <b>이메일</b>
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          style={{
                            alignContent: "center",
                            textAlign: "left",
                          }}
                        >
                          {seller?.email}
                        </Container>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "left" }}
                      >
                        <b>전화번호</b>
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          style={{
                            alignContent: "center",
                            textAlign: "left",
                          }}
                        >
                          {seller?.phoneNumber}
                        </Container>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "left" }}
                      >
                        <b>주소</b>
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          style={{
                            alignContent: "center",
                            textAlign: "left",
                          }}
                        >
                          {seller?.address}
                        </Container>
                      </Grid.Col>
                    </Grid>
                  </Stack>
                </div>
              </div>
            </div>
            <Button color="black" onClick={promote}>해당 판매자 승인하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminValidSellerComponent;
