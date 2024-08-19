import { Button, Image, Pagination, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Link } from "react-router-dom";
import CreateCouponModal from "../../coupon/components/CreateCouponModal.jsx";
import ProductUpdateModal from "./modals/ProductUpdateModal.jsx";
import QuantityChangeModal from "./modals/QuantityChangeModal.jsx";
import PriceChangeModal from "./modals/PriceChangeModal.jsx";
import SellerNavComponent from "./SellerNavComponent.jsx";
import { useEffect, useState } from "react";

const ProductList = ({
  token,
  products,
  handleProductPrice,
  handleProductQuantity,
  handleDeleteProduct,
  result,
  getSellersAllProduct,
  handleUpdateProduct,
}) => {
  const [activePage, setPage] = useState(1);

  const handleDelete = async (productId) => {
    await handleDeleteProduct(productId);
    modals.closeAll();
  };

  useEffect(() => {
    getSellersAllProduct(activePage - 1, 10);
  }, [activePage]);

  return (
    <div>
      <div style={{ display: "flex", width: "100%" }}>
        <SellerNavComponent />
        <div className="body" style={{ marginLeft: "20px", width: "100%" }}>
          <div
            className="product-backoffice-top-bar"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>상품 목록</h1>
            <Link to="/product-create">
              <Button
                color="black"
                className="top-bar-btn"
                style={{ marginBottom: "10px" }}
              >
                상품 생성
              </Button>
            </Link>
          </div>

          {products.map((product, index) => (
            <div
              className="product-item"
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "25px",
              }}
            >
              <div className="image">
                <Image
                  className="product-image"
                  radius="md"
                  h={120}
                  w={120}
                  fit="crop"
                  style={{ margin: "0" }}
                  src={product.productImage}
                  fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width:"100%"
                }}
              >
                <div
                  className="product-info"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "25px",
                  }}
                >
                  <div>
                    <h2 style={{ margin: "0" }}>{product.name}</h2>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ margin: "0" }}>가격 &emsp;</p>
                        <p style={{ justifyContent: "flex-end", margin: "0" }}>
                          {product.price} 원
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ margin: "0" }}>수량 &emsp;</p>
                        <p style={{ justifyContent: "flex-end", margin: "0" }}>
                          {product.quantity} 개
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <Image w={40} h={40} src="/images/arrow.svg" />
                  </Link>
                </div>
                <div
                  className="product-actions"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <ProductUpdateModal
                    product={product}
                    handleUpdateProduct={handleUpdateProduct}
                  />
                  <QuantityChangeModal
                    product={product}
                    handleProductQuantity={handleProductQuantity}
                  />
                  <PriceChangeModal
                    product={product}
                    handleProductPrice={handleProductPrice}
                  />
                  <CreateCouponModal product={product} token={token} />
                  <Button
                    color="black"
                    variant="outline"
                    className="update-btn"
                    onClick={() => {
                      modals.open({
                        title: "상품 삭제",
                        children: (
                          <>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "10px",
                              }}
                            >
                              <Button
                                color="black"
                                fullWidth
                                onClick={() => {
                                  handleDelete(product.id);
                                }}
                              >
                                YES
                              </Button>
                              <Button
                                color="black"
                                fullWidth
                                variant="outline"
                                onClick={() => modals.closeAll()}
                              >
                                NO
                              </Button>
                            </div>
                          </>
                        ),
                      });
                    }}
                  >
                    상품 삭제
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="display-center" style={{ marginTop: "20px" }}>
            <Pagination
              color="black"
              value={activePage}
              onChange={setPage}
              total={result?.totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
