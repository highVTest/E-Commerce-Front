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
  const [totalPages, setTotalPages] = useState([]);

  const getSearchProducts = async (
    keyword,
    sortBy,
    orderBy,
    page,
    size = 9
  ) => {
    const data = await searchByRedis(keyword, sortBy, orderBy, page, size);
    console.log(data);
    setProducts(data.data.content);
    setResult(data.data);

    setTotalPages(Array.from({ length: data.data.totalPages }, (v, i) => i));
  };

  useEffect(() => {
    getSearchProducts(key, sort[0], sort[1], 0, 9);
  }, []);

  return (
    <SearchProductsForm
      result={result}
      products={products}
      totalPages={totalPages}
      param={param}
      getSearchProducts={getSearchProducts}
    ></SearchProductsForm>
  );
};

export default SearchPage;
