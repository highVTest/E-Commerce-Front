import {Link} from "react-router-dom";
import {Button} from "@mantine/core";
import {useEffect, useState} from "react";
import {deleteBlackList, getBlackLists} from "../../api/v1/admin/admin.js";

const BlackListPage = () => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("로그인을 해주세요");
        window.location.href = "/login/admin"
    }else if(role !== "ADMIN"){
        alert("권한이 없습니다");
        window.location.href = "/login/admin"
    }

    const [blackLists, setBlackLists] = useState([]);


    const getBlackListData = async () => {
        const data = await getBlackLists(token);

        console.log(data.data)

        setBlackLists(data.data);
    }

    const deleteBlackListBySeller = async (blackListId) => {
        try {
            await deleteBlackList(token, blackListId);
            alert("블랙리스트 삭제가 완료 되었습니다")
            window.location.reload();
        }catch (e){
            alert(e.response.data.errorMessage)
        }
    }

    useEffect(() => {
        getBlackListData()
    }, []);

    return (
        <div>
            <div className="product-backoffice-top-bar">
                <Link to="/admin/seller-accept">
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
                {
                    blackLists.map((seller) => {
                        return (
                            <div className="product-item" key={1}>
                                <div className="product-info">
                                    <h2>제재 닉네임 : {seller.nickname}</h2>
                                    <h2>제재 이메일 : {seller.email}</h2>
                                    {
                                        (seller.isSanctioned === false) ?
                                                <p>남은 횟수 : {5 - seller.sanctionsCount} 번 남았습니다</p> :
                                            <p>해당 유저는 제재 되었습니다</p>

                                    }
                                </div>
                                <div className="product-actions">
                                    {
                                        (seller.isSanctioned === true) ?
                                            <Button
                                                color="gray"
                                                className="update-btn"
                                                onClick={()=>{deleteBlackListBySeller(seller.id)}}
                                            >
                                                블랙 리스트 삭제 하기
                                            </Button>:
                                            null

                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BlackListPage;