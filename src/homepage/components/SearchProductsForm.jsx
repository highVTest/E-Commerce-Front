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
  loading,
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
        <ProductList products={products} loading={loading}></ProductList>
      </Container>
      <div style={{ marginTop: "50px" }} className="display-center">
        <Pagination
          color="black"
          value={activePage}
          onChange={setPage}
          total={result?.totalPages}
        />
      </div>
    </>
  );
};

export default SearchProductsForm;
