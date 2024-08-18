import {
  Button,
  Container,
  Grid,
  Image,
  Modal,
  Rating,
  Stack,
} from "@mantine/core";
import "../../sellerbackoffice/component/css/SellerInfoForm.css";

import "../../sellerbackoffice/component/css/ProductForm.css";
import { useDisclosure } from "@mantine/hooks";
import { getAllUserShopInfo } from "../../api/v1/seller-backoffice/sellerInfo.js";
import { useEffect, useState } from "react";

const BuyerShopInfo = ({ product }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [shopData, setShopData] = useState([]);

  const getAllUserShopInfoData = async () => {
    const data = await getAllUserShopInfo(product.shopId);
    setShopData(data.data);
  };

  useEffect(() => {
    const getAllUserShopInfoData = async () => {
      const data = await getAllUserShopInfo(product.shopId);

      setShopData(data.data);
    };
    getAllUserShopInfoData();
  }, []);

  return (
    <div>
      <Modal opened={opened} onClose={close} size="auto" title="상점 정보">
        <div>
          <div>
            <div className="info-box" style={{border:"1px solid", margin:"15px",padding:"15px",borderRadius:"8px", borderColor:"#dadada"}}>
              <h2>{shopData.name}</h2>
              <div
                className="shop"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div
                  className="image-container"
                  style={{ alignItems: "center" }}
                >
                  <Image
                    className="seller-img"
                    radius="md"
                    h={150}
                    w={150}
                    fit="crop"
                    src={shopData.shopImage}
                    style={{margin:"15px"}}
                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                  />
                </div>
                <hr color="#efefef" style={{margin:"15px"}}/>
                <div>
                  <div style={{ margin: "20px", width: "300px" }}>
                    <Stack style={{ textAlign: "left", gap:"10px" }}>
                      <b>평점</b>
                      <Rating
                        value={shopData.rate}
                        fractions={2}
                        readOnly
                        size="md"
                        style={{marginLeft:"15px"}}
                      />
                      <b>상점 소개</b>
                      <div>&emsp;{shopData.description}</div>
                      <b>판매자 이름</b>
                      <div>&emsp;{shopData.sellerName}</div>
                      <b>판매자 이메일</b>
                      <div>&emsp;{shopData.sellerEmail}</div>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Button onClick={open}>
        상점 정보
      </Button>
    </div>
  );
};

export default BuyerShopInfo;
