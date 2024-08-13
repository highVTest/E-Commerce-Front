import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DaumPost from "../../Components/DaumPost";

const BuyerProfileModal = ({
  address,
  setAddress,
  setExtraAddr,
  extraAddr,
  detailAddr,
  setDetailAddr,
  buyerChangeProfile,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleProfileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nickname = formData.get("nickname");
    const fullAddr = address + ` ${detailAddr}`;
    const phone = formData.get("phoneNumber");

    if (nickname.length == 0) {
      alert("닉네임을 입력해주세요!");
      return;
    }

    await buyerChangeProfile(nickname, fullAddr, phone);
    window.location.reload();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <form onSubmit={handleProfileChange}>
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
          <Button type="submit" fullWidth mt="md">
            변경
          </Button>
        </form>
      </Modal>

      <Button
        onClick={() => {
          open();
          setAddress("");
          setExtraAddr("");
          setDetailAddr("");
        }}
      >
        프로필 수정하기
      </Button>
    </>
  );
};

export default BuyerProfileModal;
