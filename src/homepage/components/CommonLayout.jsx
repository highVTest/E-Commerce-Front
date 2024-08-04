import React from "react";
import { Box } from "@mantine/core";
import SearchBar from "../components/SearchBar"; // 경로 수정

const CommonLayout = ({ children }) => {
  return (
    <div>
      {/* 상단 회색 영역 */}
      {/* <Box sx={{ height: 100, backgroundColor: 'gray' }}></Box> */}

      {/* 검색창 영역 */}
      {/* <SearchBar /> */}

      {children}
    </div>
  );
};

export default CommonLayout;
