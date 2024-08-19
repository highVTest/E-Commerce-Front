import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DaumPost from "../../Components/DaumPost";
import { useState } from "react";

const ProfileModal = ({ sellerUpdateInfo, sellerInfo }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [address, setAddress] = useState(sellerInfo?.address);
  const [nickName, setNickName] = useState(sellerInfo?.nickname);
  const [phoneNumber, setPhoneNumber] = useState(sellerInfo?.phoneNumber);

  const handleSellerProfileChange = async (e) => {
    e.preventDefault();

    await sellerUpdateInfo(nickName, phoneNumber, address);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form onSubmit={handleSellerProfileChange}>
          <TextInput
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            name="nickname"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
          <TextInput
            label="핸드폰번호"
            placeholder="핸드폰번호를 입력해주세요"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <DaumPost address={address} setAddress={setAddress}></DaumPost>
          </div>
          <Button color="black" type="submit" fullWidth mt="md">
            변경
          </Button>
        </form>
      </Modal>

      <Button
        color="black"
        onClick={() => {
          setAddress(sellerInfo.address);
          setNickName(sellerInfo.nickname);
          setPhoneNumber(sellerInfo.phoneNumber);
          open();
        }}
      >
        프로필 수정하기
      </Button>
    </>
  );
};

export default ProfileModal;
