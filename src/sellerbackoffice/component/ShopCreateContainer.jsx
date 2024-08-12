import { useState } from "react";
import { uploadImage } from "../../api/v1/image/image";
import { postShop } from "../../api/v1/shop/shop";
import ShopCreateForm from "./ShopCreateForm";

const ShopCreateContainer = () => {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState("");

  const createShop = async (name, description, shopImage) => {
    try {
      const data = await postShop(token, name, description, shopImage);
      window.location.href = "/seller-info";
    } catch (e) {
      console.log(e);
    }
  };

  const imageUpload = async (file) => {
    try {
      const data = await uploadImage(token, file);
      return data.data.imageUrl;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ShopCreateForm
      createShop={createShop}
      imageUpload={imageUpload}
    ></ShopCreateForm>
  );
};

export default ShopCreateContainer;
