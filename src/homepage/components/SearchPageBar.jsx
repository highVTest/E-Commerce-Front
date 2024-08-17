import { Button, NativeSelect, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchPageBar = ({ param, getSearchProducts }) => {
  const key = param.keyword;
  const sort = param.orderby.split(",");

  const [keyword, setKeyword] = useState(`${key}`);
  const [orderBy, setOrderBy] = useState(`${sort[0]}`);
  const [asc, setAsc] = useState(`${sort[1]}`);

  const [wait, setWait] = useState(false);

  const searchKeyword = async () => {
    if (wait == true) {
      return;
    }

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
    setWait(true);
    await getSearchProducts(keyword, order, dsc, 0, 9);
    setWait(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          style={{ width: "500px" }}
        />
        <Button
          variant="filled"
          // color="rgba(118, 94, 255, 0.94)"
          color="gray"
          style={{ marginLeft: "15px" }}
          onClick={searchKeyword}
        >
          검색
        </Button>
        <NativeSelect
          data={["검색 기준", "시간", "가격"]}
          value={orderBy}
          onChange={(e) => {
            setOrderBy(e.target.value);
          }}
          style={{ marginLeft: "15px" }}
        />
        <NativeSelect
          data={["정렬 기준", "오름차순", "내림차순"]}
          value={asc}
          onChange={(e) => {
            setAsc(e.target.value);
          }}
          style={{ marginLeft: "15px" }}
        />
      </div>
    </>
  );
};

export default SearchPageBar;
