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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>승인 대기 판매자 관리</h1>
          <div
            className="product-backoffice-top-bar"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: "5px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Link to="/admin/seller-accept">
              <Button color="black" >승인 대기 판매자 관리</Button>
            </Link>
            <Link to="/admin/black-list">
              <Button color="black" >블랙 리스트 관리</Button>
            </Link>
          </div>
        </div>
        <div>
          {sellerList.map((seller) => {
            return (
              <>
                {seller.activeStatus === "PENDING" ? (
                  <div className="product-item" key={seller.id}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <h2 style={{ margin: 0, marginBottom: "10px" }}>
                          {seller.nickname}
                        </h2>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "50px",
                          }}
                        >
                          <div className="image">
                            <Image
                              className="product-image"
                              radius="md"
                              h={120}
                              w={120}
                              fit="crop"
                              src={seller.profileImage}
                              fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                              style={{ margin: 0 }}
                            />
                          </div>
                          <div
                            className="product-info"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  width: "100px",
                                  fontWeight: 600,
                                }}
                              >
                                이메일
                              </p>
                              <p style={{ margin: 0 }}>{seller.email}</p>
                            </div>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  width: "100px",
                                  fontWeight: 600,
                                }}
                              >
                                전화번호
                              </p>
                              <p style={{ margin: 0 }}>{seller.phoneNumber}</p>
                            </div>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  width: "100px",
                                  fontWeight: 600,
                                }}
                              >
                                주소
                              </p>
                              <p style={{ margin: 0 }}>{seller.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-actions">
                      <Link to={`/admin/seller-accept/${seller.id}`}>
                        <Button color="black" className="update-btn">상세 정보 보기</Button>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    );
}

export default AdminPage;