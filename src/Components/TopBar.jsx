import { Button, Image } from "@mantine/core";
import "../index.css";
import "../App.css";

import "@mantine/core/styles.css";

function TopBar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const backOfficeRedirect = () => {
    window.location.href = "/seller-info";
  };

  const adminBackOfficeRedirect = () => {
    window.location.href = "/admin-info";
  };

  const myPageRedirect = () => {
    window.location.href = "/buyer/info";
  };

  const sellerReload = () => {
    window.location.href = "/login/seller";
  };

  const buyerReload = () => {
    window.location.href = "/login/buyer";
  };

  const vaildRole = () => {
    if (role === "BUYER") {
      return true;
    } else if (role === "SELLER") {
      return false;
    } else return null;
  };

  const logout = () => {
    alert("로그 아웃이 완료되었습니다");
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const mainPage = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="top-bar">
        <div>
          <Image onClick={mainPage} src="/images/logo.png"></Image>
        </div>
        {token === null && vaildRole() === null ? (
          <div className="button-container">
            <Button color="black"onClick={buyerReload} variant="outline">
              로그인
            </Button>
            <Button color="black"onClick={sellerReload} variant="outline">
              판매자 로그인
            </Button>
          </div>
        ) : (
          <>
            {vaildRole() === true ? (
              <div className="button-container">
                <Button
                  onClick={myPageRedirect}
                  variant="outline"
                  color="black"
                >
                  마이 페이지
                </Button>
                <Button color="black"onClick={logout} variant="outline">
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="button-container">
                {role === "SELLER" ? (
                  <Button
                    onClick={backOfficeRedirect}
                    variant="outline"
                    color="black"
                  >판매자 전용 페이지
                  </Button>
                ) : (
                  <Button
                    onClick={adminBackOfficeRedirect}
                    variant="outline"
                    color="black"
                  >
                    관리자 페이지로 이동
                  </Button>
                )}
                <Button color="black" onClick={logout} variant="outline" >
                  로그아웃
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ width: "100%" }}>
        <hr style={{ margin: "0" }} />
      </div>
    </>
  );
}

export default TopBar;
