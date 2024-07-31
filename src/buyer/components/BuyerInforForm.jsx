import {
  Button,
  Center,
  Container,
  FileInput,
  Grid,
  Group,
  Image,
  Modal,
  Stack,
} from "@mantine/core";
import "./css/BuyerCss.css";

import { changeImage } from "../../api/v1/buyer/buyer";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const BuyerInfoForm = ({ buyer, getBuyerDetail }) => {
  const token = localStorage.getItem("token");
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const handleImageDelete = async () => {
    const data = await changeImage(token, null);
    await getBuyerDetail(token);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (file.size == 0) {
      alert("이미지를 선택해주세요");
      return;
    }
    const data = await changeImage(token, file);

    window.location.reload();
  };

  return (
    <div className="buyer-info">
      <Grid style={{ width: 800, height: 500, backgroundColor: "blue" }}>
        <Grid.Col
          span={6}
          style={{ backgroundColor: "yellow", paddingTop: 0, height: 250 }}
        >
          <Image
            className="profile-image"
            radius="md"
            h={180}
            w={250}
            fit="contain"
            src={buyer?.profileImage}
            alt=""
            style={{ backgroundColor: "black", marginTop: 15 }}
          />
          <Group style={{ marginLeft: 25, marginTop: 15 }}>
            <>
              <Modal opened={opened} onClose={close} title="Authentication">
                <form onSubmit={handleImageChange}>
                  <FileInput
                    label="이미지"
                    placeholder="이미지를 선택해주세요"
                    name="file"
                  />
                  <Button fullWidth type="submit">
                    이미지 변경하기
                  </Button>
                </form>
              </Modal>

              <Button color="lime.4" autoContrast onClick={open}>
                이미지 변경하기
              </Button>
            </>

            <Button color="lime.4" autoContrast onClick={handleImageDelete}>
              이미지 삭제하기
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={6} style={{ backgroundColor: "red" }}>
          <Stack
            h={230}
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
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default BuyerInfoForm;
