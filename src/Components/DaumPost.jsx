import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
// import style from "./DaumPost.module.css";

const DaumPost = ({ address, setAddress }) => {
  const [zoneCode, setZoneCode] = useState("");

  const postcodeScriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let localAddress = data.sido + " " + data.sigungu;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      // setExtraAddr(extraAddress);
    }

    setAddress(fullAddress);
    setZoneCode(data.zonecode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <TextInput
          disabled
          placeholder="우편번호"
          value={zoneCode}
          onChange={(e) => {
            setZoneCode(e.target.value);
          }}
        />

        <Button
          color="black"
          style={{ width: 100, marginLeft: "10px" }}
          fullWidth
          variant="filled"
          type="button"
          onClick={handleClick}
        >
          주소검색
        </Button>
      </div>
      <div style={{ marginTop: "15px" }}></div>
      <TextInput
        placeholder="주소"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <div style={{ marginTop: "15px" }}></div>
      {/* <div style={{ display: "flex" }}>
        <TextInput
          placeholder="상세주소"
          value={detailAddr}
          onChange={(e) => {
            setDetailAddr(e.target.value);
          }}
        />
        <TextInput
          disabled
          placeholder="참고항목"
          style={{ width: 150, marginLeft: "10px" }}
          value={extraAddr}
          onChange={(e) => {
            setExtraAddr(e.target.value);
          }}
        />
      </div> */}
    </>
  );
};

export default DaumPost;
