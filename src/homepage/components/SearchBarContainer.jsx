import { Button, NativeSelect, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBarContainer = () => {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("검색 기준");
  const [asc, setAsc] = useState("정렬 기준");
  const navigate = useNavigate();

  const searchKeyword = () => {
    let order = "";
    let dsc = "";

    if (keyword == "") {
      alert("검색어를 입력해주세요");
      return;
    }

    if (orderBy == "검색 기준" || orderBy == "시간") {
      setOrderBy("시간");
      order = "createdAt";
    } else {
      setOrderBy("가격");
      order = "price";
    }

    if (asc == "정렬 기준" || asc == "내림차순") {
      setAsc("내림차순");
      dsc = "DESC";
    } else {
      setAsc("오름차순");
      dsc = "ASC";
    }

    navigate(`/product/${keyword}/${order},${dsc}`);
  };
  return (
    <>
      <div style={{display: "flex",marginTop: "30px",gap:"10px",justifyContent: "space-between",width:"100%"}}>
        <TextInput
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          style={{ width: "100%" }}
        />
        <Button
        color="black" 
          style={{minWidth:"80px"}}
          variant="filled"
          onClick={searchKeyword}
        >검색
        </Button>
        <NativeSelect
        style={{minWidth:"120px"}}
          data={["검색 기준", "시간", "가격"]}
          value={orderBy}
          onChange={(e) => {
            setOrderBy(e.target.value);
          }}
        />
        <NativeSelect
        style={{minWidth:"120px"}}
          data={["정렬 기준", "오름차순", "내림차순"]}
          value={asc}
          onChange={(e) => {
            setAsc(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default SearchBarContainer;
