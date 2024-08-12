import { Button } from "@mantine/core";
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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("로그 아웃이 완료되 었습니다");
    window.location.href = "/";
  };

  const mainPage = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="top-bar">
        <div className="circle"></div>
        <h1>High V</h1>
        {token === null && vaildRole() === null ? (
          <div className="button-container">
            <Button
              variant="filled"
              className="button"
              size="lg"
              color="grape"
              onClick={mainPage}
            >
              메인 페이지로 이동
            </Button>
            <Button
              to=""
              variant="filled"
              className="button"
              size="lg"
              color="grape"
              onClick={buyerReload}
            >
              구매자 로그인
            </Button>
            <Button
              variant="filled"
              className="button"
              size="lg"
              color="grape"
              onClick={sellerReload}
            >
              판매자 로그인
            </Button>
          </div>
        ) : (
          <>
            {vaildRole() === true ? (
              <div className="button-container">
                <Button
                  variant="filled"
                  className="button"
                  size="lg"
                  color="grape"
                  onClick={mainPage}
                >
                  메인 페이지로 이동
                </Button>
                <Button
                  variant="filled"
                  className="button"
                  size="lg"
                  color="grape"
                  onClick={myPageRedirect}
                >
                  마이페이지로 이동
                </Button>
                <Button
                  variant="filled"
                  className="button"
                  size="lg"
                  color="grape"
                  onClick={logout}
                >
                  로그 아웃
                </Button>
              </div>
            ) : (
              <div className="button-container">
                <Button
                  variant="filled"
                  className="button"
                  size="lg"
                  color="grape"
                  onClick={mainPage}
                >
                  메인 페이지로 이동
                </Button>
                {
                  role === "SELLER" ?
                      <Button
                          variant="filled"
                          className="button"
                          size="lg"
                          color="grape"
                          onClick={backOfficeRedirect}
                      >
                        관리 페이지로 이동
                      </Button>:
                      <Button
                          variant="filled"
                          className="button"
                          size="lg"
                          color="grape"
                          onClick={adminBackOfficeRedirect}
                      >
                        관리 페이지로 이동
                      </Button>
                }
                <Button
                  variant="filled"
                  className="button"
                  size="lg"
                  color="grape"
                  onClick={logout}
                >
                  로그 아웃
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default TopBar;
