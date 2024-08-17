import {Link} from "react-router-dom";
import {Button, Image,} from "@mantine/core";

const AdminPage = () => {
    return (
        <div>
            <div className="product-backoffice-top-bar">
                <Link to="/product-create">
                    <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                        승인 대기 판매자 관리
                    </Button>
                </Link>
                <Link to="/seller/coupon">
                    <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                        블랙 리스트 관리
                    </Button>
                </Link>
            </div>
            <div>
                <div className="product-item" key={1}>
                    <div className="image">
                        <Image
                            className="product-image"
                            radius="md"
                            h={150}
                            w={150}
                            fit="crop"
                            // src="https://ifh.cc/g/xQTG2b.png"
                            fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                            style={{marginRight: 15}}
                        />
                    </div>
                    <div className="product-info">
                        <h2>이름</h2>
                        <p>가격: 몰라 원</p>
                        <p>수량: 몰라 개</p>
                    </div>
                    <div className="product-actions">
                        <p>등록 시간 : 몰라 </p>
                        <Button
                            color="gray"
                            className="update-btn">
                            가격 수정
                        </Button>
                        <Button
                            color="gray"
                            className="update-btn">
                            수량 수정
                        </Button>
                        <Button
                            color="gray"
                            className="update-btn">
                            상품 삭제
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;