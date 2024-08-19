import {
  Button,
  Stack,
  Textarea,
  TextInput,
  Modal,
} from "@mantine/core";
import "../css/ProductForm.css";
import { useDisclosure } from "@mantine/hooks";
import {useState}from "react";


const ProductUpdateModal = ({ product, handleUpdateProduct }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] =useState([product.name]);
  const [description, setDescription] =useState([product.description]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");

    await handleUpdateProduct(product.id, name,description);
    close();
  };

  return (
    <>
      <Modal
        title="상품 정보 변경"
        className="product-container"
        opened={opened}
        onClose={close}
        size="lg"
      >
        <div>
          <form onSubmit={handleProductSubmit}>
            <Stack>
              <TextInput
                label="상품명"
                placeholder="상품 이름을 입력하세요"
                defaultValue={name}
                name="name"
                className="input-field"
              />
              <Textarea
                label="상품 설명"
                placeholder="상품 설명을 입력하세요"
                defaultValue={description}
                name="description"
                className="input-field"
                autosize
                minRows={8}
                maxRows={8}
              />
              <Button color="black" fullWidth type="submit">
                저장
              </Button>
            </Stack>
          </form>
        </div>
      </Modal>
      <Button color="black" onClick={open} className="update-btn">
        상품 수정
      </Button>
    </>
  );
};

export default ProductUpdateModal;
