import { Button, Container, Pagination } from "@mantine/core";
import ProductList from "./ProductList";
import SearchPageBar from "./SearchPageBar";
import { useEffect, useState } from "react";

const SearchProductsForm = ({ result, products, param, getSearchProducts }) => {
  const key = param.keyword;
  const sort = param.orderby.split(",");

  const [activePage, setPage] = useState(1);

  useEffect(() => {
    const movePage = async (page) => {
      if (result.number == page) {
        return;
      }

      await getSearchProducts(key, sort[0], sort[1], page, 9);
    };

    movePage(activePage);
  }, [activePage]);

  return (
    <>
      <SearchPageBar
        param={param}
        getSearchProducts={getSearchProducts}
      ></SearchPageBar>
      <Container size={800} mt="xl">
        <ProductList products={products}></ProductList>
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
