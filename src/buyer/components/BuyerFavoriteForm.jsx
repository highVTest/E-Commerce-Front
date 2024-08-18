import { Card, Group, Image, Grid, Text, NumberFormatter } from "@mantine/core";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../../index.css";

const BuyerFavoriteForm = ({ favorites, buyerChangeFavorite }) => {
  const [wait, setWait] = useState(false);

  const handleHeart = async (productId) => {
    if (wait == true) {
      return;
    }
    setWait(true);
    await buyerChangeFavorite(productId);
    setWait(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <h1>찜 목록</h1>
      <Grid mt="30px" id="product-grid-list">
        {favorites.length != 0 ? (
          favorites.map((favorite) => {
            return (
              <Link
                to={`/product/${favorite.productId}`}
                style={{ marginTop: 0, textDecoration: "none" }}
              >
                <Card
                  key={favorite.productId}
                  className="card"
                  style={{ border: "1px solid #e2e2e2", borderRadius: "8px" }}
                >
                  <div className="product-card" style={{ padding: "0" }}>
                    <Image
                      src={favorite.productImageUrl}
                      alt="상품 이미지"
                      fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                    />
                    <h2>{favorite.productName}</h2>
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
                          value={favorite.productPrice}
                          thousandSeparator
                          suffix="원"
                        />
                      </div>
                      <div
                        onClick={() => handleHeart(favorite.productId)}
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
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
    </div>
  );
};

export default BuyerFavoriteForm;
