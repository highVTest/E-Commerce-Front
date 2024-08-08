import {
  TextInput,
  Textarea,
  Button,
  Image,
  Group,
  PasswordInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import "./css/SellerInfoForm.css";
import { Link } from "react-router-dom";

const SellerInfoForm = ({
  shop,
  seller,
  sellerUpdateInfo,
  sellerUpdateShopInfo,
  sellerChangePassword,
}) => {
  const handleSellerProfileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nickname = formData.get("nickname");
    const phoneNumber = formData.get("phoneNumber");
    const address = formData.get("address");

    await sellerUpdateInfo(nickname, phoneNumber, address);
  };

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

    sellerChangePassword(oldPassword, newPassword);
  };

  return (
    <div>
      <div className="sellerinfo-container">
        <Link to="/product-list" className="display-center">
          <Button w={150} fullWidth color="pink" autoContrast>
            상품 관리하기
          </Button>
        </Link>
        <h1>내정보 수정</h1>
        <div className="info-box">
          <h2>Seller Info</h2>
          <div className="image-container">
            <Image
              className="seller-img"
              radius="md"
              h={150}
              w={150}
              fit="crop"
              src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
            />
            <Group style={{ marginTop: 15 }}>
              <Button w={150} fullWidth color="pink" autoContrast>
                이미지 변경
              </Button>
            </Group>
            <div className="seller-info">
              <label>이름</label>
              <span>{seller.nickname}</span>
              <label>이메일</label>
              <span>{seller.email}</span>
              <label>전화번호</label>
              <span>{seller.phoneNumber}</span>
              <label>주소</label>
              <span>{seller.address}</span>
            </div>
          </div>
          <div className="info-container">
            <Button
              onClick={() => {
                modals.open({
                  title: "프로필 수정",
                  children: (
                    <>
                      <form onSubmit={handleSellerProfileChange}>
                        <TextInput
                          label="닉네임"
                          placeholder="닉네임을 입력해주세요"
                          name="nickname"
                        />
                        <TextInput
                          label="핸드폰번호"
                          placeholder="핸드폰번호를 입력해주세요"
                          name="phoneNumber"
                        />
                        <TextInput
                          label="주소"
                          placeholder="주소를 입력해주세요"
                          name="address"
                        />
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
              프로필 수정하기
            </Button>
            <Button
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
              비밀번호 수정하기
            </Button>
          </div>
        </div>
        <div className="info-box">
          <h2>Shop Info</h2>
          <div className="shop">
            <div className="image-container">
              <Image
                className="seller-img"
                radius="md"
                h={150}
                w={150}
                fit="crop"
                src={seller?.profileImage}
                fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                style={{ marginTop: 15 }}
              />
              <Group style={{ marginTop: 15 }}>
                <Button w={150} fullWidth color="pink" autoContrast>
                  이미지 변경
                </Button>
              </Group>
            </div>
            <div>
              <div className="shop-info">
                <div className="input-group">
                  <label>상점명</label>
                  <span>:{shop.name}</span>
                  <label>평점</label>
                  <span>{shop.rate}</span>
                </div>
              </div>
              <div>
                <form onSubmit={handleUpdateShopInfo}>
                  <Textarea
                    label="상점 설명"
                    placeholder="상점 설명을 입력하세요"
                    name="description"
                    className="input-field"
                    autosize
                    minRows={8}
                    maxRows={8}
                  />
                  <Button fullWidth color="pink" type="submit">
                    저장
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfoForm;
