import { useParams } from "react-router";
import { searchByRedis } from "../../api/v1/product/productSearch";
import { useEffect, useState } from "react";
import SearchProductsForm from "../components/SearchProductsForm";

const SearchPage = () => {
  const param = useParams();
  const key = param.keyword;
  const sort = param.orderby.split(",");

  const [result, setResult] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchProducts = async (
    keyword,
    sortBy,
    orderBy,
    page,
    size = 9
  ) => {
    setIsLoading(true);
    const data = await searchByRedis(keyword, sortBy, orderBy, page, size);
    setIsLoading(false);
    setProducts(data.data.content);
    setResult(data.data);
  };

  useEffect(() => {
    getSearchProducts(key, sort[0], sort[1], 0, 9);
  }, []);

  return (
    <SearchProductsForm
      result={result}
      products={products}
      param={param}
      getSearchProducts={getSearchProducts}
      isLoading={isLoading}
    ></SearchProductsForm>
  );
};

export default SearchPage;
