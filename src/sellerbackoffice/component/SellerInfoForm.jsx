import {TextInput, Textarea,Button,Image,FileInput,Group, PasswordInput} from '@mantine/core';
import {modals} from "@mantine/modals"
import "./css/SellerInfoForm.css"

const SellerInfo = ({
    seller,
    getSellerDetail,
    sellerChangeImage,
    sellerChangeProfile,
    sellerChangePassword,
    shopChangeImage,
    shopChangeProfile
}) =>{

    const handleSellerImageChange = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file");

        if(file.size==0){
            alert("이미지를 선택해주세요.");
            return;
        }
        
        await sellerChangeImage(file);

        window.location.reload();
    }

    const handleShopImageChange = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file");

        if(file.size==0){
            alert("이미지를 선택해주세요.");
            return;
        }
        
        await shopChangeImage(file);

        window.location.reload();
    }

    const handleSellerProfileChange = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        const nickname = formData.get("nickName");
        const address = formData.get("address");
        const phone = formData.get("phone");
    
        await sellerChangeProfile(nickname, address, phone);
        window.location.reload();
      };

      const handleShopProfileChange = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        const nickname = formData.get("nickName");
        const address = formData.get("address");
        const phone = formData.get("phone");
    
        await shopChangeProfile(nickname, address, phone);
        window.location.reload();
      };

      const handlePasswordChange = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        const currentPW = formData.get("currentPW");
        const newPW = formData.get("newPW");
        const confirmPW = formData.get("confirmPW");
    
        sellerChangePassword(currentPW, newPW, confirmPW);
      };
    
    return(
        <div>
            <div className="sellerinfo-container">
                <h1>내정보 수정</h1>
                <div className="info-box">
                    <h2>Seller Info</h2>
                    <div className="image-container">
                        <Image
                            className='seller-img'
                            radius="md"
                            h={150}
                            w={150}
                            fit="crop"
                            src={
                                seller?.profileImage ? seller.profileImage : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                            }
                            style={{marginTop:15}}
                        />
                        <Group style={{marginTop:15}}>
                            <div className='seller-info'>
                                
                            </div>
                            <Button 
                                w={150}
                                fullWidth color="pink" 
                                autoContrast
                                onClick={()=>{
                                    modals.open({
                                        title:"프로필 수정",
                                        children:(
                                            <>
                                                <form onSubmit = {handleSellerImageChange}>
                                                    <FileInput
                                                        label="이미지"
                                                        placeholder="이미지를 선택해주세요"
                                                        name="file"/>
                                                    <br/>
                                                    <Button fullWidth type="submit">변경하기</Button>
                                                    <Button fullWidth onClick={()=>modals.closeAll()} mt="md">취소</Button>
                                                </form>
                                            </>
                                        )
                                    })
                                }}
                            >이미지 변경</Button>
                        </Group>
                    </div>
                <div className='info-container'>
                    <Button
                        onClick={()=>{
                            modals.open({
                                title:"프로필 수정",
                                children: (
                                    <>
                                        <form onSubmit={handleSellerProfileChange}>
                                            <TextInput
                                                label = "닉네임"
                                                placeholder='닉네임을 입력해주세요'
                                                name="nickname"
                                            />
                                            <TextInput
                                                label = "주소"
                                                placeholder='주소를 입력해주세요'
                                                name="address"
                                            />
                                            <TextInput
                                                label = "핸드폰번호"
                                                placeholder='핸드폰번호를 입력해주세요'
                                                name="phone"
                                            />
                                            <Button fullWidth type="submit">변경하기</Button>
                                            <Button fullWidth onClick={()=>modals.closeAll()} mt="md">취소</Button>
                                        </form>
                                    </>
                                )
                            })
                        }}
                    >
                    프로필 수정하기
                    </Button>
                    <Button
                        onClick={()=>{
                            modals.open({
                                title:"비밀번호 수정",
                                children:(
                                    <>
                                        <form onSubmit={handlePasswordChange}>
                                            <PasswordInput
                                                label="현재 비밀번호"
                                                placeholder='현재 비밀번호를 입력해주세요'
                                                withAsterisk
                                                name="currPW"/>
                                            <PasswordInput
                                                label="새 비밀번호"
                                                placeholder='현재 비밀번호를 입력해주세요'
                                                withAsterisk
                                                name="currPW"/>
                                            <Button fullWidth type="submit">변경하기</Button>
                                            <Button fullWidth onClick={()=>modals.closeAll()} mt="md">취소</Button>
                                        </form>
                                    </>
                                )
                            })
                        }}
                    >비밀번호 수정하기
                    </Button>
                </div>
                </div>
                <div className="info-box">
                    <h2>Shop Info</h2>
                    <div className="shop">
                    <div className="image-container">
                        <Image
                            className='seller-img'
                            radius="md"
                            h={150}
                            w={150}
                            fit="crop"
                            src={
                                seller?.profileImage ? seller.profileImage : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                            }
                            style={{marginTop:15}}
                        />
                        <Group style={{marginTop:15}}>
                            <Button 
                                w={150}
                                fullWidth color="pink" 
                                autoContrast
                                onClick={()=>{
                                    modals.open({
                                        title:"프로필 수정",
                                        children:(
                                            <>
                                                <form onSubmit = {handleShopImageChange}>
                                                    <FileInput
                                                        label="이미지"
                                                        placeholder="이미지를 선택해주세요"
                                                        name="file"/>
                                                    <br/>
                                                    <Button fullWidth type="submit">변경하기</Button>
                                                    <Button fullWidth onClick={()=>modals.closeAll()} mt="md">취소</Button>
                                                </form>
                                            </>
                                        )
                                    })
                                }}
                                >이미지 변경</Button>
                        </Group>
                    </div>
                <div>
                <div className="shop-info">

                    <TextInput
                        label = "상점명"
                        placeholder="상점명"
                        name="shopname"
                        className="input-field"
                    />
                    <div className="input-group">
                        <label>평점</label>
                        <span>★★★★☆ (4.0)</span>
                    </div>
                </div>
                <div>
                    <Textarea
                        label="상점 설명"
                        placeholder="상점 설명을 입력하세요"
                        name="description"
                        className="input-field"
                        autosize
                        minRows={8}
                        maxRows={8}
                    />
                </div>
                <Button fullWidth color="pink" className="btn" type="submit">저장</Button>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SellerInfo;