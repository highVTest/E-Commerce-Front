import {
  Button,
  Container,
  FileInput,
  Grid,
  Group,
  Image,
  PasswordInput,
  Stack,
} from "@mantine/core";

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
    if (buyer?.profileImage == "") {
      alert("삭제할 이미지가 없습니다.");
      return;
    }
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
    <div className="buyer-info" style={{ width: "100%", alignItems: "none" }}>
      <h1>마이 페이지</h1>
      <div style={{ display: "flex", gap: "12px" }}>
        <div className="image-container">
          <Image
            radius="md"
            h={160}
            w={160}
            fit="contain"
            src={buyer?.profileImage}
            fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
            style={{ margin: "0", marginBottom: "10px" }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Button
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

            <Button variant="outline" autoContrast onClick={handleImageDelete}>
              이미지 삭제하기
            </Button>
          </div>
        </div>
        <div id="buyer-profile">
          <Stack>
            <div class="profile-txt-wrapper">
              <div class="profile-txt">
                <p class="profile-txt-title">이메일</p>
                <p class="profile-txt-data">{buyer?.email}</p>
              </div>
              <div class="profile-txt">
                <p class="profile-txt-title">닉네임</p>
                <p class="profile-txt-data">{buyer?.nickname}</p>
              </div>
              <div class="profile-txt">
                <p class="profile-txt-title">주소</p>
                <p class="profile-txt-data">{buyer?.address}</p>
              </div>
              <div class="profile-txt">
                <p class="profile-txt-title">번호</p>
                <p class="profile-txt-data">{buyer?.phoneNumber}</p>
              </div>
            </div>
            <Group class="buyer-profile-buttons">
              <BuyerProfileModal
                address={address}
                setAddress={setAddress}
                extraAddr={extraAddr}
                setExtraAddr={setExtraAddr}
                detailAddr={detailAddr}
                setDetailAddr={setDetailAddr}
                buyerChangeProfile={buyerChangeProfile}
              ></BuyerProfileModal>

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
                          <Button color="gray" fullWidth type="submit" mt="md">
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
                비밀번호 변경하기
              </Button>
            </Group>
          </Stack>
        </div>
      </div>

      <div class="buyer-options">
        <Link to="/buyer/cart">
          <Button
            fullWidth
            variant="light"
          >
            장바구니 바로가기
          </Button>
        </Link>
        <Link to="/orderDetails">
          <Button
            fullWidth
            variant="light"
          >
            주문 내역 보기
          </Button>
        </Link>
        <Link to="/buyer/favorite">
          <Button
            fullWidth
            variant="light"
          >
            찜 목록 바로가기
          </Button>
        </Link>

        <Link to="/buyer/coupon-list">
          <Button
            fullWidth
            variant="light"
          >
            쿠폰 목록 보기
          </Button>
        </Link>
        <Link to="/buyer/review-list">
          <Button
            fullWidth
            variant="light"
          >
            내 댓글 목록 보기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BuyerInfoForm;
