import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DaumPost from "../../Components/DaumPost";

const ProfileModal = ({
  address,
  setAddress,
  setExtraAddr,
  extraAddr,
  detailAddr,
  setDetailAddr,
  sellerUpdateInfo,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleSellerProfileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nickname = formData.get("nickname");
    const phoneNumber = formData.get("phoneNumber");
    const fullAddr = address + ` ${detailAddr}`;

    // console.log(nickname);
    // console.log(phoneNumber);
    // console.log(fullAddr);

    await sellerUpdateInfo(nickname, phoneNumber, fullAddr);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
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
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <DaumPost
              address={address}
              setAddress={setAddress}
              extraAddr={extraAddr}
              setExtraAddr={setExtraAddr}
              detailAddr={detailAddr}
              setDetailAddr={setDetailAddr}
            ></DaumPost>
          </div>
          <Button color="black" type="submit" fullWidth mt="md">
            변경
          </Button>
        </form>
      </Modal>

      <Button color="black" onClick={open}>
        프로필 수정하기
      </Button>
    </>
  );
};

export default ProfileModal;
