import { Button, TextInput, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {useState}from "react";

const PriceChangeModal = ({ product, handleProductPrice }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [price, setPrice] =useState([product.price])

  const handlePrice = async (e, productId) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const price = formData.get("price");
    await handleProductPrice(productId, Number(price));
    close();
  };

  return (
    <>
      <Modal title="상품 가격 변경" opened={opened} onClose={close} size="sm">
        <div>
          <form onSubmit={(e) => handlePrice(e, product.id)}>
            <TextInput
              label="가격"
              placeholder="가격을 입력해주세요"
              defaultValue={price}
              name="price"
              className="price"
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
        가격 수정
      </Button>
    </>
  );
};
export default PriceChangeModal;