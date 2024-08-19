import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./SellerProductList";

import { deleteProduct, updateProduct } from "../../api/v1/product/product";
import {
  changeQuantity,
  changePrice,
  getSellerProducts,
} from "../../api/v1/seller-backoffice/inventoryManagement";

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) {
    window.location.href = "/login/seller";
    alert("No Token");
  } else if (role !== "SELLER") {
    window.location.href = "/login/seller";
    alert("권한이 없습니다");
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(token, productId);
      getSellersAllProduct(0, 10);
    } catch (e) {
      const message = e.response.data["errorMessage"];
      alert(message);
    }
  };

  const getSellersAllProduct = async (page, size) => {
    try {
      const data = await getSellerProducts(token, page, size);
      setProducts(data.data.content);
      setResult(data.data);
    } catch (e) {
      const message = e.response.data["errorMessage"];
      alert(message);
    }
  };

  const handleUpdateProduct = async (productId, name, description) => {
    try {
      await updateProduct(token, productId, name, description);
      getSellersAllProduct(0, 10);
    } catch (e) {
      const message = e.response.data.errorMessage;
      alert(message);
    }
  };

  const handleProductPrice = async (productId, price) => {
    try {
      await changePrice(token, productId, price);
      getSellersAllProduct(0, 10);
    } catch (e) {
      const message = e.response.data["errorMessage"];
      alert(message);
    }
  };

  const handleProductQuantity = async (productId, quantity) => {
    try {
      await changeQuantity(token, productId, quantity);
      getSellersAllProduct(0, 10);
    } catch (e) {
      const message = e.response.data["errorMessage"];
      alert(message);
    }
  };

  useEffect(() => {
    getSellersAllProduct(0, 10);
  }, []);

  return (
    <div>
      <ProductList
        products={products}
        handleProductPrice={handleProductPrice}
        handleProductQuantity={handleProductQuantity}
        handleDeleteProduct={handleDeleteProduct}
        token={token}
        result={result}
        getSellersAllProduct={getSellersAllProduct}
        handleUpdateProduct={handleUpdateProduct}
      ></ProductList>
    </div>
  );
};

export default ProductListContainer;
