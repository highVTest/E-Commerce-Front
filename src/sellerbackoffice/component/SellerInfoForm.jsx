import {
  Button,
  Container,
  FileInput,
  Grid,
  Group,
  Image,
  PasswordInput,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import "./css/SellerInfoForm.css";
import SellerNavComponent from "./SellerNavComponent.jsx";
import DaumPost from "../../Components/DaumPost.jsx";
import { useState } from "react";
import ProfileModal from "./ProfileModal.jsx";
import "./css/ProductForm.css";

const SellerInfoForm = ({
  shop,
  seller,
  sellerUpdateInfo,
  sellerUpdateShopInfo,
  sellerChangePassword,
  updateSellerInfoImage,
  updateShopInfoImage,
  addImage,
  desc,
  setDesc,
}) => {
  const [address, setAddress] = useState("");
  const [extraAddr, setExtraAddr] = useState("");
  const [detailAddr, setDetailAddr] = useState("");

  const handleUpdateShopInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get("description");

    await sellerUpdateShopInfo(description);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPW");

    sellerChangePassword(oldPassword, newPassword, confirmPassword);
  };

  const shopImageUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (file.size == 0) {
      alert("이미지를 선택해주세요");
      return;
    }

    const image = await addImage(file);
    await updateShopInfoImage(image);
  };

  const sellerImageUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (file.size == 0) {
      alert("이미지를 선택해주세요");
      return;
    }

    const image = await addImage(file);
    await updateSellerInfoImage(image);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="seller">
        <SellerNavComponent />
        <div className="sellerinfo-container">
          <h1>내정보 수정</h1>

          <div className="info-box">
            <h2>Seller Info</h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="image-container" style={{ marginTop: "20px" }}>
                <Image
                  className="seller-img"
                  radius="md"
                  h={150}
                  w={150}
                  fit="crop"
                  src={seller?.profileImage}
                  fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                />
                <Group style={{ marginTop: 15 }}>
                  <Button
                    w={150}
                    fullWidth
                    color="gray"
                    autoContrast
                    onClick={() => {
                      modals.open({
                        title: "프로필 이미지 수정",
                        children: (
                          <>
                            <form onSubmit={sellerImageUpdate}>
                              <FileInput
                                label="이미지"
                                placeholder="이미지를 선택해주세요"
                                name="file"
                              />
                              <br />
                              <Button color="gray" fullWidth type="submit">
                                변경하기
                              </Button>
                              <Button
                                color="gray"
                                fullWidth
                                onClick={() => modals.closeAll()}
                                mt="md"
                              >
                                취소
                              </Button>
                            </form>
                          </>
                        ),
                      });
                    }}
                  >
                    이미지 변경
                  </Button>
                </Group>
                <Button
                  w={150}
                  fullWidth
                  color="gray"
                  autoContrast
                  style={{ marginTop: "15px" }}
                  onClick={() => {
                    updateSellerInfoImage("");
                  }}
                >
                  이미지 삭제
                </Button>
              </div>
              <div>
                <div className="seller-info" style={{ width: "450px" }}>
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
                        style={{ alignContent: "center", textAlign: "center" }}
                      >
                        이름 :
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          h={50}
                          bg="var(--mantine-color-gray-light)"
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {seller.nickname}
                        </Container>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "center" }}
                      >
                        이메일 :
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          h={50}
                          bg="var(--mantine-color-gray-light)"
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {seller.email}
                        </Container>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "center" }}
                      >
                        전화번호 :
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          h={50}
                          bg="var(--mantine-color-gray-light)"
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {seller.phoneNumber}
                        </Container>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "center" }}
                      >
                        주소 :
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          h={50}
                          bg="var(--mantine-color-gray-light)"
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {seller.address}
                        </Container>
                      </Grid.Col>
                    </Grid>
                  </Stack>
                  {/* <label>
                  이름 : <span>{seller.nickname}</span>
                </label>
                <label>
                  이메일 : <span>{seller.email}</span>
                </label>

                <label>
                  전화번호 : <span>{seller.phoneNumber}</span>
                </label>

                <label>
                  주소 : <span>{seller.address}</span>
                </label> */}
                </div>

                <div className="info-container">
                  <ProfileModal
                    address={address}
                    setAddress={setAddress}
                    extraAddr={extraAddr}
                    setExtraAddr={setExtraAddr}
                    detailAddr={detailAddr}
                    setDetailAddr={setDetailAddr}
                    sellerUpdateInfo={sellerUpdateInfo}
                  ></ProfileModal>

                  <Button
                    color="gray"
                    style={{ marginLeft: "25px" }}
                    onClick={() => {
                      modals.open({
                        title: "비밀번호 수정",
                        children: (
                          <>
                            <form onSubmit={handleUpdatePassword}>
                              <PasswordInput
                                label="현재 비밀번호"
                                placeholder="현재 비밀번호를 입력해주세요"
                                withAsterisk
                                name="oldPassword"
                              />
                              <PasswordInput
                                label="새 비밀번호"
                                placeholder="현재 비밀번호를 입력해주세요"
                                withAsterisk
                                name="newPassword"
                              />
                              <PasswordInput
                                label="확인 비밀번호"
                                placeholder="확인 비밀번호를 입력해주세요"
                                withAsterisk
                                name="confirmPW"
                              />
                              <Button color="gray" fullWidth type="submit">
                                변경하기
                              </Button>
                              <Button
                                color="gray"
                                fullWidth
                                onClick={() => modals.closeAll()}
                                mt="md"
                              >
                                취소
                              </Button>
                            </form>
                          </>
                        ),
                      });
                    }}
                  >
                    비밀번호 수정하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="info-box">
            <div></div>
            <h2>Shop Info</h2>
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
                  src={shop?.shopImage}
                  fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                  style={{ marginTop: 15 }}
                />
                <Group style={{ marginTop: 15 }}>
                  <Button
                    w={150}
                    fullWidth
                    color="gray"
                    autoContrast
                    onClick={() => {
                      modals.open({
                        title: "가게 이미지 수정",
                        children: (
                          <>
                            <form onSubmit={shopImageUpdate}>
                              <FileInput
                                label="이미지"
                                placeholder="이미지를 선택해주세요"
                                name="file"
                              />
                              <br />
                              <Button fullWidth type="submit">
                                변경하기
                              </Button>
                              <Button
                                fullWidth
                                onClick={() => modals.closeAll()}
                                mt="md"
                              >
                                취소
                              </Button>
                            </form>
                          </>
                        ),
                      });
                    }}
                  >
                    이미지 변경
                  </Button>
                </Group>
                <Button
                  w={150}
                  fullWidth
                  color="gray"
                  autoContrast
                  style={{ marginTop: "15px" }}
                  onClick={() => {
                    updateShopInfoImage("");
                  }}
                >
                  이미지 삭제
                </Button>
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
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "center" }}
                      >
                        상점명 :
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          h={50}
                          bg="var(--mantine-color-gray-light)"
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {shop.name}
                        </Container>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col
                        span={4}
                        style={{ alignContent: "center", textAlign: "center" }}
                      >
                        평점 :
                      </Grid.Col>
                      <Grid.Col span={8}>
                        <Container
                          fluid
                          h={50}
                          bg="var(--mantine-color-gray-light)"
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {shop.rate}
                        </Container>
                      </Grid.Col>
                    </Grid>
                  </Stack>
                  {/* <div className="input-group">
                    <label>상점명</label>
                    <span>:{shop.name}</span>
                    <label>평점</label>
                    <span>{shop.rate}</span>
                  </div> */}
                </div>
                <div>
                  <form
                    onSubmit={handleUpdateShopInfo}
                    style={{ marginTop: "20px" }}
                  >
                    <Textarea
                      label="상점 설명"
                      placeholder="상점 설명을 입력하세요"
                      name="description"
                      className="input-field"
                      autosize
                      minRows={8}
                      maxRows={8}
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                    <Button fullWidth color="gray" type="submit">
                      저장
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfoForm;
