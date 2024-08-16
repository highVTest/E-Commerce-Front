import {
  Button,
  FileInput,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router-dom";
import "./css/ProductForm.css";
import SellerNavComponent from "./SellerNavComponent.jsx";
import { useState } from "react";

const ProductCreateForm = ({ handleCreateProduct, imageUpload }) => {
  const [click, setClick] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (name == "") {
      alert("상품명을 입력해주세요");
      return;
    }

    if (price <= 0) {
      alert("가격이 1원 보다 작을 수 없습니다.");
      return;
    }

    if (quantity <= 0) {
      alert("수량이 1개 보다 적을 수 없습니다.");
      return;
    }

    if (click == true) {
      return;
    }
    setClick(true);

    if (file.size != 0) {
      const imageUrl = await imageUpload(file);

      await handleCreateProduct(name, price, quantity, description, imageUrl);
    } else {
      await handleCreateProduct(name, price, quantity, description, "");
    }

    setClick(false);
    window.location.href = "/product-list";
  };

  return (
    <div className="seller">
      <SellerNavComponent />
      <div className="product-container">
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <NumberInput
                  label="가격"
                  placeholder="상품 가격을 입력하세요"
                  name="price"
                  className="input-field"
                  value={price}
                  onChange={(e) => {
                    setPrice(e);
                  }}
                />
                <NumberInput
                  label="수량"
                  placeholder="상품 수량을 입력하세요"
                  name="quantity"
                  className="input-field"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e);
                  }}
                />

                <Textarea
                  label="상품 설명"
                  placeholder="상품 설명을 입력하세요"
                  name="description"
                  className="input-field"
                  autosize
                  minRows={8}
                  maxRows={8}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <FileInput
                  className="input-field"
                  label="이미지"
                  placeholder="이미지를 선택해주세요"
                  name="file"
                />

                <Button color="gray" fullWidth type="submit">
                  저장
                </Button>
              </Stack>
            </form>
            <Link to="/product-list">
              <Button color="gray" style={{ marginTop: "20px" }}>
                목록으로
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreateForm;
