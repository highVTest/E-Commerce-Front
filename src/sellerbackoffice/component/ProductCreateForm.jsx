import { Button, Stack, Textarea, TextInput, FileInput } from "@mantine/core";
import { useState } from "react";
import "./css/ProductForm.css";
import { Link } from "react-router-dom";

const ProductCreateForm = ({ handleCreateProduct }) => {
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const description = formData.get("description");

    await handleCreateProduct(name, price, quantity, description);
    window.location.href = "/product-list";
  };

  return (
    <div>
      <div className="product-container">
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
                <TextInput
                  label="가격"
                  placeholder="상품 가격을 입력하세요"
                  name="price"
                  className="input-field"
                />
                <TextInput
                  label="수량"
                  placeholder="상품 수량을 입력하세요"
                  name="quantity"
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
                <Button fullWidth color="indigo" type="submit">
                  저장
                </Button>
              </Stack>
            </form>
            <Link to="/product-list">
              <Button>목록으로</Button>
            </Link>
          </div>
          {/*
                <div className="image-area">
                    <h2>상품 이미지 등록</h2>
                    <div className="image-grid">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <div key={index} className="image-slot"></div>
                        ))}
                    </div>
                    <form onSubmit={handleImageSubmit}>
                        <FileInput
                            label="이미지"
                            placeholder="이미지를 선택해주세요"
                            name="file"
                        />
                        <Button
                            color="lime.4"
                            autoContrast
                            type= "submit"
                        >
                        이미지 추가하기</Button>
                    </form>
                </div>
                */}
        </div>
      </div>
    </div>
  );
};

export default ProductCreateForm;
