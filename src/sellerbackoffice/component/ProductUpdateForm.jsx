import {
  Button,
  Stack,
  Textarea,
  TextInput,
  FileInput,
  Modal,
} from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./css/ProductForm.css";
import SellerNavComponent from "./SellerNavComponent.jsx";
import { useDisclosure } from "@mantine/hooks";

const ProductUpdateForm = ({ productId, handleUpdateProduct }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");

    await handleUpdateProduct(productId, name, description);
    window.location.reload();
  };

  return (
    <>
      <Modal
        className="product-container"
        opened={opened}
        onClose={close}
        size="lg"
      >
        <h1>상품 등록</h1>
        <div className="box">
          <div className="form-area">
            <h2>상품 정보 등록</h2>
            <form className="product-form" onSubmit={handleProductSubmit}>
              <Stack>
                <TextInput
                  label="상품명"
                  placeholder="상품 이름을 입력하세요"
                  name="name"
                  className="input-field"
                />
                <Textarea
                  label="상품 설명"
                  placeholder="상품 설명을 입력하세요"
                  name="description"
                  className="input-field"
                  autosize
                  minRows={8}
                  maxRows={8}
                />
                <Button color="gray" fullWidth type="submit">
                  저장
                </Button>
              </Stack>
            </form>
            <Link to="/product-list">
              <Button color="gray" style={{ margin: "20px", float: "right" }}>
                목록으로
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
      <Button onClick={open} color="gray" className="update-btn" fullWidth>
        상품 수정
      </Button>
    </>
  );
};

export default ProductUpdateForm;
