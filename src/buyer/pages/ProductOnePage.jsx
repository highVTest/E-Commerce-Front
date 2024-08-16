import { useParams } from "react-router-dom";

const ProductOnePage = () => {
  const params = useParams();

  return <div>상품 단일 페이지 {params.id}</div>;
};

export default ProductOnePage;
