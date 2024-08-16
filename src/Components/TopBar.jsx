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
          <Image
            onClick={mainPage}
            src="/images/logo.png"
          ></Image>
        </div>
        {token === null && vaildRole() === null ? (
          <div className="button-container">
            <Image
              onClick={buyerReload}
              style={{margin:"10px"}}
              src="/images/login.png"
            ></Image>
            <Image src="/images/slash.png"
            style={{margin:"10px"}}></Image>
            <Image
              style={{margin:"10px"}}
              onClick={sellerReload}
              src="/images/seller-login.png"
            ></Image>
          </div>
        ) : (
          <>
            {vaildRole() === true ? (
              <div className="button-container">
                <Image
                  style={{margin:"10px"}}
                  onClick={myPageRedirect}
                  src="/images/my-page.png"
                ></Image>
                <Image
                  style={{margin:"10px"}}
                  onClick={logout}
                  src="/images/log-out.png"
                ></Image>
              </div>
            ) : (
              <div className="button-container">
                {role === "SELLER" ? (
                  <Image
                  style={{margin:"10px"}}
                  onClick={backOfficeRedirect}
                  src="/images/seller-page.png"
                  ></Image>
                ) : (
                  <Button
                    variant="filled"
                    className="button"
                    size="lg"
                    color="gray"
                    onClick={adminBackOfficeRedirect}
                  >
                    관리 페이지로 이동
                  </Button>
                )}
                <Image
                  style={{margin:"10px"}}
                  onClick={logout}
                  src="/images/log-out.png"
                ></Image>
              </div>
            )}
          </>
        )}
      </div>
      <div style={{width:"100%", marginTop:"-30px"}}>
          <hr/>
        </div>
    </>
  );
}

export default TopBar;
