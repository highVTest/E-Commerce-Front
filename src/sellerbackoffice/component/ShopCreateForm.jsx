import { Button, FileInput, TextInput } from "@mantine/core";
import { useState } from "react";

const ShopCreateForm = ({ createShop, imageUpload }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addShop = async (e) => {
    e.preventDefault();

    if (name.length == 0) {
      alert("가게명을 지정해주세요");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const file = formData.get("File");

    if (file.size != 0) {
      const data = await imageUpload(file);
      await createShop(name, description, data);
    } else {
      await createShop(name, description, "");
    }
  };

  const addImage = async (file, name, description) => {
    await imageUpload(file);
    await createShop(name, description, image);
  };

  return (
    <div>
      <form className="login-section" onSubmit={addShop}>
      <h1 style={{width:300, textAlign:"left"}}>상점 등록</h1>
        <TextInput
          label="가게명"
          placeholder="가게명을 입력해주세요"
          style={{ width: "30%" }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextInput
          label="가게 소개"
          placeholder="소개할 문구를 입력해주세요"
          style={{ width: "30%" }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <FileInput
          label="이미지"
          placeholder="이미지를 선택해 주세요"
          name="File"
          style={{ width: "30%" }}
        />
        <Button variant="filled" type="submit" style={{ width: "30%" }}>
          가게 생성하기
        </Button>
      </form>
    </div>
  );
};

export default ShopCreateForm;
