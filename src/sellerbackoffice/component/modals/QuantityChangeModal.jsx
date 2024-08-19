import { Button, TextInput, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const QuantityChangeModal = ({ product, handleProductQuantity }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [quantity, setQuantity] = useState([product.quantity]);

  const handleQuantity = async (e, productId) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const quantity = formData.get("quantity");
    await handleProductQuantity(productId, Number(quantity));
    close();
  };

  return (
    <>
      <Modal title="상품 수량 변경" opened={opened} onClose={close} size="sm">
        <div>
          <form onSubmit={(e) => handleQuantity(e, product.id)}>
            <TextInput
              label="수량"
              placeholder="수량을 입력해주세요"
              defaultValue={quantity}
              name="quantity"
              className="quantity"
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <Button color="black" fullWidth type="submit">
                변경하기
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Button color="black" onClick={open} className="update-btn">
        수량 수정
      </Button>
    </>
  );
};
export default QuantityChangeModal;