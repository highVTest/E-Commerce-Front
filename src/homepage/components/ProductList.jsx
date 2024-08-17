import { Grid, Card, Image, Button, NumberFormatter } from "@mantine/core";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import "../../index.css";

const ProductList = ({ products, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{width:"100%"}}>
    <Grid mt="md">
      {products.length != 0 ? (
        products.map((product) => (
          <Grid.Col span={4} key={product.id}>
            <Link to={`/product/${product.id}`} style={{ marginTop: 0 }}>
              <Card shadow="sm">
                <div className="product-card" style={{padding:"0", maxWidth:"200px"}}>
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
                    <p style={{ margin: "0" }}>가격 : </p>
                    <NumberFormatter
                      value={product.price}
                      thousandSeparator
                      suffix="원"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AiFillHeart style={{ color: "red", fontSize: "20px" }} />
                      <p style={{ margin: "0" }}>{product.likes}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </Grid.Col>
        ))
      ) : (
        <div className="display-center"> No Data </div>
      )}
    </Grid>
    </div>
  );
};

export default ProductList;
