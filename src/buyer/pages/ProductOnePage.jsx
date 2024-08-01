import { useParams } from "react-router-dom";

const ProductOnePage = () => {
  const params = useParams();
  console.log(params.id);

  return <div>상품 단일 페이지 {params.id}</div>;
};

export default ProductOnePage;
