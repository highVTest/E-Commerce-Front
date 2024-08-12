import { Button, Container, Pagination } from "@mantine/core";
import ProductList from "./ProductList";
import SearchPageBar from "./SearchPageBar";
import { useEffect, useState } from "react";

const SearchProductsForm = ({
  result,
  products,
  totalPages,
  param,
  getSearchProducts,
}) => {
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
        {/* {totalPages.map((page) => {
          return (
            <Button
              key={page}
              variant="outline"
              color="gray"
              onClick={() => {
                movePage(page);
              }}
            >
              {page + 1}
            </Button>
          );
        })} */}
      </div>
    </>
  );
};

export default SearchProductsForm;
