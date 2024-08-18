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
  const [loading, setLoading] = useState(false);

  const getSearchProducts = async (
    keyword,
    sortBy,
    orderBy,
    page,
    size = 9
  ) => {
    console.log("키워드 >> ", keyword);
    setLoading(true);
    const data = await searchByRedis(keyword, sortBy, orderBy, page, size);
    setLoading(false);
    console.log(data);
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
      loading={loading}
    ></SearchProductsForm>
  );
};

export default SearchPage;
