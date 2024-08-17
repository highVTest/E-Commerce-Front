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
    <div>
      <div className="seller">
        <SellerNavComponent />
        <div className="sellerinfo-container" style={{width:"100%",marginLeft:"20px"}}>
          <h1>내정보 수정</h1>
          <div style={{marginLeft:"15px"}}>
            <div style={{width:"100%"}}>
              <h2>Seller Info</h2>
              <div style={{ display: "flex", flexDirection:"row", alignItems:"center",margin:"15px", justifyContent:"space-between"}}>
                <div className="image-container" >
                  <Image
                    className="seller-img"
                    radius="md"
                    style={{marginBottom:"5px"}}
                    h={120}
                    w={120}
                    fit="crop"
                    src={seller?.profileImage}
                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                  />
                  <div style={{display: "flex", padding:"0",flexDirection:"column",justifyContent: "space-around",gap:"5px"}}>
                    <Group>
                      <Button
                        fullWidth
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
                                  <Button fullWidth type="submit">
                                    변경하기
                                  </Button>
                                  <Button
                                    variant="outline"
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
                      fullWidth
                      autoContrast
                      variant="outline"
                      onClick={() => {
                        updateSellerInfoImage("");
                      }}
                    >
                      이미지 삭제
                    </Button>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"100%",gap:"15px"}}>
                  <div className="seller-info" >
                    <Stack
                      align="stretch"
                      justify="center"
                      style={{marginLeft:"50px"}}
                    >
                      <Grid style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <Grid.Col
                          span={4}
                          style={{ alignContent: "center", textAlign: "left" }}
                        ><b>이름</b>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Container
                            fluid
                            style={{ alignContent: "center",textAlign: "left",}}
                          >
                            {seller.nickname}
                          </Container>
                        </Grid.Col>
                      </Grid>
                      <Grid>
                        <Grid.Col
                          span={4}
                          style={{ alignContent: "center", textAlign: "left" }}
                        ><b>이메일</b>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Container
                            fluid
                            style={{alignContent: "center",textAlign: "left",}}
                          >
                            {seller.email}
                          </Container>
                        </Grid.Col>
                      </Grid>
                      <Grid>
                        <Grid.Col
                          span={4}
                          style={{ alignContent: "center", textAlign: "left" }}
                        ><b>전화번호</b>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Container
                            fluid
                            style={{ alignContent: "center",textAlign: "left",}}
                          >
                            {seller.phoneNumber}
                          </Container>
                        </Grid.Col>
                      </Grid>
                      <Grid>
                        <Grid.Col
                          span={4}
                          style={{ alignContent: "center", textAlign: "left" }}
                        ><b>주소</b>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Container
                            fluid
                            style={{alignContent: "center",textAlign: "left",}}
                          >
                            {seller.address}
                          </Container>
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </div>

                  <div className="info-container" style={{display:"flex", flexDirection:"row",justifyContent:"flex-end"}}>
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

            <div style={{width:"100%", marginTop:"50px"}}>
              <h2>Shop Info</h2>
              <div style={{ display: "flex", flexDirection:"row", alignItems:"center",margin:"15px", justifyContent:"space-between"}}>
                <div className="image-container" style={{ display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between"}}>
                  <Image
                    className="seller-img"
                    radius="md"
                    h={120}
                    w={120}
                    fit="crop"
                    style={{marginBottom:"5px"}}
                    src={shop?.shopImage}
                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                  />
                    <div style={{display: "flex", padding:"0",flexDirection:"column",justifyContent: "space-around",gap:"5px"}}>
                      <Group>
                        <Button
                          fullWidth
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
                      fullWidth
                      autoContrast
                      variant="outline"
                      onClick={() => {
                        updateShopInfoImage("");
                      }}
                    >
                      이미지 삭제
                    </Button>
                    </div>
                  </div>


                <div  style={{ width: "100%" }}>
                  <div className="shop-info" style={{marginLeft:"50px"}}>
                    <Stack
                      align="stretch"
                      justify="center"
                      gap="md"
                    >
                      <Grid>
                        <Grid.Col
                          span={4}
                          style={{ alignContent: "center", textAlign: "left" }}
                        >
                          <b>상점명</b>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Container
                            fluid
                            style={{alignContent: "center",textAlign: "left",}}
                          >
                            {shop.name}
                          </Container>
                        </Grid.Col>
                      </Grid>
                      <Grid>
                        <Grid.Col
                          span={4}
                          style={{ alignContent: "center", textAlign: "left" }}
                        >
                          <b>평점</b>
                        </Grid.Col>
                        <Grid.Col span={8}>
                          <Container
                            fluid
                            style={{alignContent: "center",textAlign: "left"}}
                          >
                            {shop.rate}
                          </Container>
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </div>
                  <div>
                    <form
                      onSubmit={handleUpdateShopInfo}
                      style={{marginLeft:"50px", marginTop:"20px"}}>

                      <p style={{textAlign:"left"}}><b>상점 설명</b></p>
                      <Textarea
                        placeholder="상점 설명을 입력하세요"
                        name="description"
                        className="input-field"
                        autosize
                        minRows={3}
                        maxRows={3}
                        value={desc}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                      <Button fullWidth type="submit">
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
    </div>
  );
};

export default SellerInfoForm;
