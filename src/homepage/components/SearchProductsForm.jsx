import { Button, Container, Pagination } from "@mantine/core";
import ProductList from "./ProductList";
import SearchPageBar from "./SearchPageBar";
import { useEffect, useState } from "react";
import SearchBarContainer from "../components/SearchBarContainer";

const SearchProductsForm = ({
  result,
  products,
  param,
  getSearchProducts,
  isLoading,
}) => {
  const key = param.keyword;
  const sort = param.orderby.split(",");

  const [activePage, setPage] = useState(1);

  useEffect(() => {
    const movePage = (page) => {
      if (result?.number == page - 1) {
        return;
      }

      getSearchProducts(key, sort[0], sort[1], page - 1, 9);
    };

    movePage(activePage);
  }, [activePage]);

  return (
    <>
      <SearchPageBar
        param={param}
        getSearchProducts={getSearchProducts}
      ></SearchPageBar>
      <Container>
        <ProductList products={products} isLoading={isLoading}></ProductList>
      </Container>

      <div style={{ marginTop: "50px" }} className="display-center">
        <Pagination
          value={activePage}
          onChange={setPage}
          total={result?.totalPages}
        />
      </div>
    </>
  );
};

export default SearchProductsForm;
