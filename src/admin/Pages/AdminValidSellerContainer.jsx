import AdminValidSellerComponent from "../components/AdminValidSellerComponent.jsx";

const AdminValidSellerContainer = () => {
  //const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("로그인을 해주세요");
    window.location.href = "/login/admin"
  }else if(role !== "ADMIN"){
    alert("권한이 없습니다");
    window.location.href = "/login/admin"
  }

  return (
    <div>
      <AdminValidSellerComponent
          token={token}
      />
    </div>
  );
};

export default AdminValidSellerContainer;
