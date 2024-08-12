import { Button, Container } from "@mantine/core";
import ProductList from "./ProductList";
import SearchPageBar from "./SearchPageBar";
import { useState } from "react";

const SearchProductsForm = ({
  result,
  products,
  totalPages,
  param,
  getSearchProducts,
}) => {
  const [wait, setWait] = useState(false);

  const key = param.keyword;
  const sort = param.orderby.split(",");

  const movePage = async (page) => {
    if (result.number == page) {
      return;
    }

    if (wait == true) {
      return;
    }

    setWait(true);
    await getSearchProducts(key, sort[0], sort[1], page, 9);
    setWait(false);
  };
  return (
    <>
      <SearchPageBar
        param={param}
        getSearchProducts={getSearchProducts}
      ></SearchPageBar>
      <Container size={800} mt="xl">
        <ProductList products={products}></ProductList>
      </Container>

      <div style={{ marginTop: "20px" }}>
        {totalPages.map((page) => {
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
        })}
      </div>
    </>
  );
};

export default SearchProductsForm;
