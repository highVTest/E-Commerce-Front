import { Button, Image, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import "./css/ProductList.css";
import { Link } from "react-router-dom";
import CreateCouponModal from "../../coupon/components/CreateCouponModal.jsx";
import ProductUpdateForm from "./ProductUpdateForm.jsx";
import SellerNavComponent from "./SellerNavComponent.jsx";

const ProductList = ({
  token,
  products,
  handleProductPrice,
  handleProductQuantity,
  handleDeleteProduct,
}) => {
  const handlePrice = async (e, productId) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const price = formData.get("price");
    await handleProductPrice(productId, Number(price));
    window.location.reload();
  };

  const handleQuantity = async (e, productId) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const quantity = formData.get("quantity");
    await handleProductQuantity(productId, Number(quantity));
    window.location.reload();
  };

  const handleDelete = async (productId) => {
    await handleDeleteProduct(productId);
    window.location.reload();
  };

  return (
      <div className="seller">
        <SellerNavComponent/>
        <div className="product-list">
          <h1>상품 목록</h1>
          <div className="product-backoffice-top-bar">
            <Link to="/product-create">
              <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                상품 생성
              </Button>
            </Link>
          </div>
          {products.map((product, index) => (
              <div className="product-item" key={index}>
                <div className="image">
                  <Image
                      className="product-image"
                      radius="md"
                      h={150}
                      w={150}
                      fit="crop"
                      src="https://ifh.cc/g/xQTG2b.png"
                      //   src={product.image}
                      fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                      style={{marginRight: 15}}
                  />
                </div>
                <div className="product-info">
                  <h2>{product.name}</h2>
                  <p>가격: {product.price} 원</p>
                  <p>수량: {product.quantity} 개</p>
                </div>
                <div className="product-actions">
                  <p>등록 시간 : {product.createdAt}</p>
                  <ProductUpdateForm/>
                  <Button
                      color="gray"
                      className="update-btn"
                      onClick={() => {
                        modals.open({
                          title: "가격 수정",
                          children: (
                              <>
                                <form onSubmit={(e) => handlePrice(e, product.id)}>
                                  <TextInput
                                      label="가격"
                                      placeholder="가격을 입력해주세요"
                                      name="price"
                                      className="price"
                                  />
                                  <Button fullWidth type="submit">
                                    변경하기
                                  </Button>
                                  <Button
                                      fullWidth
                                      onClick={() => modals.closeAll()}
                                      mt="md"
                                  >
                                    취소
                                  </Button>
                                </form>
                              </>
                          ),
                        });
                      }}
                  >
                    가격 수정
                  </Button>
                  <Button
                      color="gray"
                      className="update-btn"
                      onClick={() => {
                        modals.open({
                          title: "재고 수정",
                          children: (
                              <>
                                <form onSubmit={(e) => handleQuantity(e, product.id)}>
                                  <TextInput
                                      label="수량"
                                      placeholder="수량을 입력해주세요"
                                      name="quantity"
                                      className="quantity"
                                  />
                                  <Button fullWidth type="submit">
                                    변경하기
                                  </Button>
                                  <Button
                                      fullWidth
                                      onClick={() => modals.closeAll()}
                                      mt="md"
                                  >
                                    취소
                                  </Button>
                                </form>
                              </>
                          ),
                        });
                      }}
                  >
                    수량 수정
                  </Button>
                  <CreateCouponModal product={product} token={token}/>
                  <Button
                      color="gray"
                      className="update-btn"
                      onClick={() => {
                        modals.open({
                          title: "상품 삭제",
                          children: (
                              <>
                                <Button
                                    fullWidth
                                    onClick={() => {
                                      handleDelete(product.id);
                                    }}
                                >
                                  YES
                                </Button>
                                <Button
                                    fullWidth
                                    onClick={() => modals.closeAll()}
                                    mt="md"
                                >
                                  NO
                                </Button>
                              </>
                          ),
                        });
                      }}
                  >
                    상품 삭제
                  </Button>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default ProductList;
