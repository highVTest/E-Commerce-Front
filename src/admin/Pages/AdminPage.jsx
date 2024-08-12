import {Link} from "react-router-dom";
import {Button} from "@mantine/core";

const AdminPage = () => {
    return (
        <div className="product-backoffice-top-bar">
            <Link to="/product-create">
                <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                    승인 대기 판매자 관리
                </Button>
            </Link>
            <Link to="/product-create">
                <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                    탈퇴 대기 판매자 관리
                </Button>
            </Link>
            <Link to="/seller/coupon">
                <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                    블랙 리스트 관리
                </Button>
            </Link>
        </div>
    )
}

export default AdminPage;