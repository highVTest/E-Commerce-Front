import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DaumPost from "../../Components/DaumPost";
import { useState } from "react";

const BuyerProfileModal = ({ buyerChangeProfile, buyerInfo }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [nickName, setNickName] = useState(buyerInfo?.nickname);
  const [phoneNumber, setPhoneNumber] = useState(buyerInfo?.phoneNumber);
  const [address, setAddress] = useState(buyerInfo?.address);

  const handleProfileChange = async (e) => {
    e.preventDefault();

    await buyerChangeProfile(nickName, address, phoneNumber);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="프로필 수정">
        <form onSubmit={handleProfileChange}>
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
          setAddress(buyerInfo.address);
          setNickName(buyerInfo.nickname);
          setPhoneNumber(buyerInfo.phoneNumber);
          open();
        }}
      >
        프로필 수정하기
      </Button>
    </>
  );
};

export default BuyerProfileModal;
