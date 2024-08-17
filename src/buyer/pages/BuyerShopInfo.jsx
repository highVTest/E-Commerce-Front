import {
  Button,
  Container,
  Grid,
  Image,
  Modal,
  Rating,
  Stack,
} from "@mantine/core";
import "../../sellerbackoffice/component/css/SellerInfoForm.css";

import "../../sellerbackoffice/component/css/ProductForm.css";
import { useDisclosure } from "@mantine/hooks";
import { getAllUserShopInfo } from "../../api/v1/seller-backoffice/sellerInfo.js";
import { useEffect, useState } from "react";

const BuyerShopInfo = ({ product }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    const getAllUserShopInfoData = async () => {
      const data = await getAllUserShopInfo(product.shopId);

      setShopData(data.data);
    };
    getAllUserShopInfoData();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={1100}
        style={{ display: "flex" }}
      >
        <div>
          <div>
            <h1 style={{ margin: "0 auto" }}>상점 정보</h1>
            <div className="info-box">
              <div></div>
              <div
                className="shop"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div className="image-container">
                  <Image
                    className="seller-img"
                    radius="md"
                    h={150}
                    w={150}
                    fit="crop"
                    src={shopData.shopImage}
                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                    style={{ marginTop: 15 }}
                  />
                </div>

                <div>
                  <div className="shop-info" style={{ width: "450px" }}>
                    <Stack
                      // bg="var(--mantine-color-body)"
                      align="stretch"
                      justify="center"
                      gap="md"
                    >
                      <Grid>
                        <Grid.Col span={12}>
                          <Container
                            fluid
                            h={50}
                            bg="var(--mantine-color-white)"
                            style={{
                              alignContent: "center",
                              textAlign: "center",
                            }}
                          >
                            {shopData.name}
                          </Container>
                        </Grid.Col>
                      </Grid>
                      <Grid>
                        <Grid.Col
                          span={4}
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          평점 :
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Rating
                            value={shopData.rate}
                            fractions={2}
                            readOnly
                            size="lg"
                          />
                        </Grid.Col>
                        <Grid.Col
                          span={4}
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          상점 소개 :
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Container
                            fluid
                            h={50}
                            bg="var(--mantine-color-white)"
                            style={{
                              alignContent: "center",
                              textAlign: "center",
                            }}
                          >
                            {shopData.description}
                          </Container>
                        </Grid.Col>
                      </Grid>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>
                          <div
                            className="seller-info"
                            style={{ width: "450px" }}
                          >
                            <Stack
                              h={300}
                              // bg="var(--mantine-color-body)"
                              align="stretch"
                              justify="center"
                              gap="md"
                            >
                              <Grid>
                                <Grid.Col
                                  span={4}
                                  style={{
                                    alignContent: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  판매자 이름 :
                                </Grid.Col>
                                <Grid.Col span={8}>
                                  <Container
                                    fluid
                                    h={50}
                                    bg="var(--mantine-color-white)"
                                    style={{
                                      alignContent: "center",
                                      textAlign: "center",
                                    }}
                                  >
                                    {shopData.sellerName}
                                  </Container>
                                </Grid.Col>
                              </Grid>
                              <Grid>
                                <Grid.Col
                                  span={4}
                                  style={{
                                    alignContent: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  판매자 이메일 :
                                </Grid.Col>
                                <Grid.Col span={8}>
                                  <Container
                                    fluid
                                    h={50}
                                    bg="var(--mantine-color-white)"
                                    style={{
                                      alignContent: "center",
                                      textAlign: "center",
                                    }}
                                  >
                                    {shopData.sellerEmail}
                                  </Container>
                                </Grid.Col>
                              </Grid>
                            </Stack>
                          </div>
                        </div>
                      </div>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Button
        color="gray"
        onClick={open}
        style={{ marginTop: "16px", marginLeft: "10px" }}
      >
        싱점 정보 보기
      </Button>
    </>
  );
};

export default BuyerShopInfo;
