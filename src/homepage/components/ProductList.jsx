import { Grid, Card, Image, Button, NumberFormatter } from "@mantine/core";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import "../../index.css";

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      </div>
    );
  }
  return (
    <div style={{ width: "100%" }}>
      <Grid mt="30px" id="product-grid-list">
        {products.length != 0 ? (
          products.map((product) => (
            <Grid.Col key={product.id}>
              <Link to={`/product/${product.id}`} style={{ marginTop: 0 }}>
                <div style={{ width: "100%" }}>
                  <Card>
                    <div className="product-card" style={{ padding: "0" }}>
                      <Image
                        src={product.productImage}
                        alt="상품 이미지"
                        fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                      />
                      <h2>{product.name}</h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <p style={{ margin: "0" }}>가격 : </p>
                          <NumberFormatter
                            value={product.price}
                            thousandSeparator
                            suffix="원"
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <AiFillHeart
                            style={{ color: "black", fontSize: "20px" }}
                          />
                          <p style={{ margin: "0" }}>{product.likes}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Link>
            </Grid.Col>
          ))
        ) : (
          <div>
            <h1 style={{ textAlign: "center", marginTop: "200px" }}>
              검색결과가 없습니다.
            </h1>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default ProductList;
