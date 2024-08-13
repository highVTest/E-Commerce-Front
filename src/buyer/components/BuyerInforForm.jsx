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
} from "@mantine/core";
import "./css/BuyerCss.css";

import { modals } from "@mantine/modals";
import { Link } from "react-router-dom";
import BuyerProfileModal from "./BuyerProfileModal";
import { useState } from "react";

const BuyerInfoForm = ({
  buyer,
  buyerChangeImage,
  buyerChangeProfile,
  buyerChangePassword,
}) => {
  const [address, setAddress] = useState("");
  const [extraAddr, setExtraAddr] = useState("");
  const [detailAddr, setDetailAddr] = useState("");
  const handleImageDelete = async () => {
    await buyerChangeImage(null);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (file.size == 0) {
      alert("이미지를 선택해주세요");
      return;
    }

    await buyerChangeImage(file);

    window.location.reload();
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nickname = formData.get("nickName");
    const address = formData.get("address");
    const phone = formData.get("phone");

    if (nickname.length == 0) {
      alert("닉네임을 입력해주세요!");
      return;
    }

    await buyerChangeProfile(nickname, address, phone);
    window.location.reload();
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const currentPW = formData.get("currentPW");
    const newPW = formData.get("newPW");
    const confirmPW = formData.get("confirmPW");

    await buyerChangePassword(currentPW, newPW, confirmPW);
  };

  return (
    <div className="buyer-info">
      <Grid style={{ width: 800, height: 350 }}>
        <Grid.Col span={6} style={{ paddingTop: 0, height: 350 }}>
          <Image
            className="profile-image"
            radius="md"
            h={180}
            w={250}
            fit="contain"
            src={buyer?.profileImage}
            fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
            style={{ marginTop: 15 }}
          />
          <Group style={{ marginLeft: 25, marginTop: 15 }}>
            <Button
              color="lime.4"
              autoContrast
              onClick={() => {
                modals.open({
                  title: "프로필 수정",
                  children: (
                    <>
                      <form onSubmit={handleImageChange}>
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
              이미지 변경하기
            </Button>

            <Button color="lime.4" autoContrast onClick={handleImageDelete}>
              이미지 삭제하기
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 350 }}>
          <Stack
            h={330}
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="xs"
          >
            <Grid>
              <Grid.Col
                span={3}
                style={{ alignContent: "center", textAlign: "center" }}
              >
                이메일
              </Grid.Col>
              <Grid.Col span={8}>
                <Container
                  fluid
                  h={50}
                  bg="var(--mantine-color-gray-light)"
                  style={{ alignContent: "center", textAlign: "center" }}
                >
                  {buyer?.email}
                </Container>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={3}
                style={{ alignContent: "center", textAlign: "center" }}
              >
                닉네임
              </Grid.Col>
              <Grid.Col span={8}>
                <Container
                  fluid
                  h={50}
                  bg="var(--mantine-color-gray-light)"
                  style={{ alignContent: "center", textAlign: "center" }}
                >
                  {buyer?.nickname}
                </Container>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col
                span={3}
                style={{ alignContent: "center", textAlign: "center" }}
              >
                주소
              </Grid.Col>
              <Grid.Col span={8}>
                <Container
                  fluid
                  h={50}
                  bg="var(--mantine-color-gray-light)"
                  style={{ alignContent: "center", textAlign: "center" }}
                >
                  {buyer?.address}
                </Container>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col
                span={3}
                style={{ alignContent: "center", textAlign: "center" }}
              >
                번호
              </Grid.Col>
              <Grid.Col span={8}>
                <Container
                  fluid
                  h={50}
                  bg="var(--mantine-color-gray-light)"
                  style={{ alignContent: "center", textAlign: "center" }}
                >
                  {buyer?.phoneNumber}
                </Container>
              </Grid.Col>
            </Grid>
            <Group style={{ marginLeft: "auto", marginRight: "auto" }}>
              <BuyerProfileModal
                address={address}
                setAddress={setAddress}
                extraAddr={extraAddr}
                setExtraAddr={setExtraAddr}
                detailAddr={detailAddr}
                setDetailAddr={setDetailAddr}
                buyerChangeProfile={buyerChangeProfile}
              ></BuyerProfileModal>
              {/* <Button
                onClick={() => {
                  modals.open({
                    title: "프로필 수정",
                    children: (
                      <>
                        <form onSubmit={handleProfileChange}>
                          <TextInput
                            label="닉네임"
                            placeholder="닉네임을 입력해주세요"
                            name="nickName"
                          />
                          <TextInput
                            label="주소"
                            placeholder="주소를 입력해주세요"
                            name="address"
                          />
                          <TextInput
                            label="핸드폰 번호"
                            placeholder="핸드폰 번호를 입력해주세요"
                            name="phone"
                          />
                          <Button fullWidth type="submit" mt="md">
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
                프로필 수정하기
              </Button> */}
              <Button
                onClick={() => {
                  modals.open({
                    title: "프로필 수정",
                    children: (
                      <>
                        <form onSubmit={handlePasswordChange}>
                          <PasswordInput
                            label="현재 비밀번호"
                            placeholder="현재 비밀번호를 입력해주세요"
                            withAsterisk
                            name="currentPW"
                          />
                          <PasswordInput
                            label="새 비밀번호"
                            placeholder="새 비밀번호를 입력해주세요"
                            withAsterisk
                            name="newPW"
                          />
                          <PasswordInput
                            label="확인 비밀번호"
                            placeholder="확인 비밀번호를 입력해주세요"
                            withAsterisk
                            name="confirmPW"
                          />
                          <Button fullWidth type="submit" mt="md">
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
                비밀번호 변경하기
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
      <Grid
        style={{
          height: 150,
          width: 800,
          marginTop: 0,
        }}
      >
        <Grid.Col span={4}>
          <Link to="/buyer/cart">
            <Button
              fullWidth
              variant="light"
              color="grape"
              style={{ height: 150, color: "black" }}
            >
              장바구니 바로가기
            </Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={4}>
          <Link to="/orderDetails">
            <Button
              fullWidth
              variant="light"
              color="rgba(93, 255, 5, 1)"
              style={{ height: 150, color: "black" }}
            >
              주문 내역 보기
            </Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={4}>
          <Link to="/buyer/favorite">
            <Button
              fullWidth
              variant="light"
              color="yellow"
              style={{ height: 150, color: "black" }}
            >
              찜 목록 바로가기
            </Button>
          </Link>
        </Grid.Col>
      </Grid>
      <Grid
        style={{
          height: 150,
          width: 800,
          marginTop: 0,
        }}
      >
        <Grid.Col span={6}>
          <Link to="/buyer/coupon-list">
            <Button
              fullWidth
              variant="light"
              color="rgba(19, 200, 70, 55)"
              style={{ height: 150, color: "black" }}
            >
              쿠폰 목록 보기
            </Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={6}>
          <Link to="/buyer/review-list">
            <Button
              fullWidth
              variant="light"
              color="rgba(200, 255, 5, 1)"
              style={{ height: 150, color: "black" }}
            >
              내 댓글 목록 보기
            </Button>
          </Link>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default BuyerInfoForm;
