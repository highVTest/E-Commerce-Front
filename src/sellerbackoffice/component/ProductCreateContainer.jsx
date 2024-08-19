import { useEffect } from "react";

import ProductCreateForm from "./ProductCreateForm";

import { createProduct } from "../../api/v1/product/product";
import { uploadImage } from "../../api/v1/image/image";

const ProductCreateContainer = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("토큰이 없습 니다");
    window.location.href = "/login/seller";
  } else if (role !== "SELLER") {
    alert("권한이 없습 니다");
    window.location.href = "/login/seller";
  }

  const handleCreateProduct = async (
    name,
    price,
    quantity,
    description,
    imageUrl
  ) => {
    try {
      await createProduct(token, name, price, quantity, description, imageUrl);
      alert("상품 추가 완료!");
    } catch (e) {
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      if (message == "Seller is not authorized to create a product") {
        alert("아직 판매자 승인이 안됐습니다.");
      } else {
        alert(message);
        return "sameProduct";
      }
    }
  };

  const imageUpload = async (file) => {
    try {
      const data = await uploadImage(token, file);
      return data.data.imageUrl;
    } catch (e) {
      if (e.response.data.errorMessage == "Maximum upload size exceeded") {
        alert("이미지는 최대 5MB까지 가능합니다.");
      }
      return "None";
    }
  };

  const isReLogin = (message) => {
    if (message === "Access Denied") {
      alert("다시 로그인 해주세요");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <ProductCreateForm
        handleCreateProduct={handleCreateProduct}
        imageUpload={imageUpload}
      ></ProductCreateForm>
    </div>
  );
};

export default ProductCreateContainer;
