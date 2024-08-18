import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { deleteBlackList, getBlackLists } from "../../api/v1/admin/admin.js";

const BlackListPage = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("로그인을 해주세요");
    window.location.href = "/login/admin";
  } else if (role !== "ADMIN") {
    alert("권한이 없습니다");
    window.location.href = "/login/admin";
  }

  const [blackLists, setBlackLists] = useState([]);

  const getBlackListData = async () => {
    const data = await getBlackLists(token);

    console.log(data.data);

    setBlackLists(data.data);
  };

  const deleteBlackListBySeller = async (blackListId) => {
    try {
      await deleteBlackList(token, blackListId);
      alert("블랙리스트 삭제가 완료 되었습니다");
      window.location.reload();
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
  };

  useEffect(() => {
    getBlackListData();
  }, []);

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
        <h1>블랙리스트 관리</h1>
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
            <Button>승인 대기 판매자 관리</Button>
          </Link>
          <Link to="/admin/black-list">
            <Button>블랙 리스트 관리</Button>
          </Link>
        </div>
      </div>

      <div>
        {blackLists.map((seller) => {
          return (
            <div className="product-item" key={1}>
              <div className="product-info">
                <h2>제재 이메일 : {seller.email}</h2>
                <h2>제재 닉네임 : {seller.nickname}</h2>
                {seller.isSanctioned === false ? (
                  <p style={{ color: "red" }}>
                    남은 횟수 : <b>{5 - seller.sanctionsCount}</b> 번 남았습니다
                  </p>
                ) : (
                  <p>해당 유저는 제재 되었습니다</p>
                )}
              </div>
              <div className="product-actions">
                {seller.isSanctioned === true ? (
                  <Button
                    className="update-btn"
                    onClick={() => {
                      deleteBlackListBySeller(seller.id);
                    }}
                  >
                    블랙 리스트 삭제 하기
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlackListPage;