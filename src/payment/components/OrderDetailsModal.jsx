import "../css/PaymentModal.css";
import { useDisclosure } from "@mantine/hooks";
import { Button, Card, Fieldset, Image, Modal, NumberFormatter, Text } from "@mantine/core";
import RefundModal from "./RefundModal.jsx";
import ExchangeModal from "./ExchangeModal.jsx";

// eslint-disable-next-line react/prop-types
function OrderDetailsModal({ orderShopDetails, orderMasterId }) {
  const [opened, { open, close }] = useDisclosure(false);

  const setColor = () => {
    // eslint-disable-next-line react/prop-types
    if (orderShopDetails[0].productsOrders[0].orderStatus !== "PENDING") {
      return { backgroundColor: "#37d237" };
    } else {
      return { backgroundColor: "#d93337" };
    }

    // eslint-disable-next-line no-unreachable
    return { backgroundColor: "grey" };
  };

  const setOrderStatus = () => {
    // eslint-disable-next-line react/prop-types
    switch (orderShopDetails[0].productsOrders[0].orderStatus) {
      case "ORDER_CANCELED":
        return "주문이 취소 되었습니다";

      case "ORDERED":
        return "주문이 접수 되었습니다";

      case "PRODUCT_PREPARING":
        return "상품 준비 중 입니다";

      case "DELIVERY_PREPARING":
        return "상품이 배달 준비 중입니다";

      case "SHIPPING":
        return "상품이 배달 중 입니다";

      case "DELIVERED":
        return "상품이 배달 되었습니다";

      case "PENDING": {
        // eslint-disable-next-line react/prop-types
        switch (orderShopDetails[0].productsOrders[0].complainStatus) {
          case "REFUND_REQUESTED":
            return "환불 요청 되었습니다";

          case "REFUNDED":
            return "환불이 완료 되었습니다";

          case "REFUND_REJECTED":
            return "환불이 거절 되었습니다";

          case "EXCHANGE_REQUESTED":
            return "교환 요청 되었습니다";

          case "EXCHANGED":
            return "교환이 완료 되었습니다";

          case "EXCHANGE_REJECTED":
            return "교환이 거절 되었습니다";
        }
      }
    }
  };

  // console.log(orderShopDetails)
  // eslint-disable-next-line no-unused-vars
  const exChangeRefundRequest = () => {
    // eslint-disable-next-line react/prop-types
    switch (orderShopDetails[0].productsOrders[0].orderStatus) {
      // eslint-disable-next-line react/prop-types
      case "ORDERED":
        return (
          <RefundModal
            orderMasterId={orderMasterId}
            shopId={orderShopDetails[0].shopId}
          />
        );
      // eslint-disable-next-line react/prop-types
      case "PRODUCT_PREPARING":
        return (
          <RefundModal
            orderMasterId={orderMasterId}
            shopId={orderShopDetails[0].shopId}
          />
        );
      case "DELIVERED":
        return (
          <>
            {/* eslint-disable-next-line react/prop-types */}
            <ExchangeModal
              orderMasterId={orderMasterId}
              shopId={orderShopDetails[0].shopId}
            />
            {/* eslint-disable-next-line react/prop-types */}
            <RefundModal
              orderMasterId={orderMasterId}
              shopId={orderShopDetails[0].shopId}
            />
          </>
        );
      default:
        return (
          <Button color="black"  size="xs">
            환불 및 교환이 불가능 합니다
          </Button>
        );
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="주문 내역 정보"
        centered
        style={{ padding: "10px" }}
      >
        <div className="order-status" style={{display:"flex",justifyContent:"space-between"}}>
          <div>{setOrderStatus()}</div>
          <div className="order-circle" style={setColor()}></div>
          {exChangeRefundRequest()}
        </div>
        {
          // eslint-disable-next-line react/prop-types
          orderShopDetails[0].productsOrders.map((it, i) => {
            return (
              <>
                <Fieldset disabled fw={1000} key={i} style={{ padding:"15px",margin:"0",marginTop:"10px"}}>
                  <div className="field-set">
                    <Card shadow="none" padding="lg" component="a">
                      <Image
                        src={it.productImageUrl}
                        h={120}
                        w={120}
                        alt="No way!"
                        fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                      />
                    </Card>
                    <div>
                      <h2>{it.productName}</h2>
                      <h3>{it.productQuantity} 개</h3>
                      <h3>
                        <NumberFormatter thousandSeparator value={it.productPrice} suffix=" 원" />
                      </h3>
                    </div>
                  </div>
                </Fieldset>
              </>
            );
          })
        }
      </Modal>

      <Button color="black" onClick={open}>
        주문 내역 상세 정보 보기
      </Button>
    </>
  );
}

export default OrderDetailsModal;
