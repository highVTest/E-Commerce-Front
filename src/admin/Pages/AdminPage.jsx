import {Link} from "react-router-dom";
import {Button, Image,} from "@mantine/core";
import {getSellerLists} from "../../api/v1/admin/admin.js";
import {useEffect, useState} from "react";

const AdminPage = () => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const [sellerList, setSellerList] = useState([]);

    if (!token) {
        alert("로그인을 해주세요");
        window.location.href = "/login/admin"
    }else if(role !== "ADMIN"){
        alert("권한이 없습니다");
        window.location.href = "/login/admin"
    }



    const getSellerListData = async () => {
        const data = await getSellerLists(token);
        console.log(data.data)
        setSellerList(data.data);
    }

    useEffect(() => {
        getSellerListData()
    },[])

    return (
        <div>
            <div className="product-backoffice-top-bar">
                <Link to="/admin/seller-accept">
                    <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                        승인 대기 판매자 관리
                    </Button>
                </Link>
                <Link to="/admin/black-list">
                    <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                        블랙 리스트 관리
                    </Button>
                </Link>
            </div>
            <div>
                {
                    sellerList.map((seller) => {
                        return (
                            <>
                                {
                                    (seller.activeStatus === "PENDING") ?
                                        <div className="product-item" key={seller.id}>
                                            <div className="image">
                                                <Image
                                                    className="product-image"
                                                    radius="md"
                                                    h={150}
                                                    w={150}
                                                    fit="crop"
                                                    src={seller.profileImage}
                                                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                                    style={{marginRight: 15}}
                                                />
                                            </div>
                                            <div className="product-info">
                                                <h2>{seller.nickname}</h2>
                                                <p>{seller.email}</p>
                                                <p>{seller.phoneNumber}</p>
                                                <p>{seller.address}</p>
                                            </div>
                                            <div className="product-actions">
                                                <Link to={`/admin/seller-accept/${seller.id}`}>
                                                    <Button
                                                        color="gray"
                                                        className="update-btn">
                                                        상세 정보 보기
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>: null
                                }
                            </>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminPage;