import {Button, Container, Grid, Image, Stack,} from "@mantine/core";
import "../../sellerbackoffice/component/css/SellerInfoForm.css";
import "../../sellerbackoffice/component/css/ProductForm.css";
import {getSellerBySellerId, promotePendingSeller} from "../../api/v1/admin/admin.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const AdminValidSellerComponent = ({token}) => {

    const params = useParams()
    const [seller, setSeller] = useState(null);
    const [clicked, setClicked] = useState(false);
    const sellerId = params.id

    const getSellerData = async () => {
       const data = await getSellerBySellerId(token, sellerId)
       console.log(data.data)
       setSeller(data.data)
    }

    const promote = async () => {
        try {
            if(clicked === false){
                setClicked(true);
                await promotePendingSeller(token, sellerId);
                alert("판매자 승인이 완료 되었습니다")
                window.location.href = "/admin/seller-accept";
            }else return null
        }catch (e){
            alert(e.response.data.errorMessage)
        }

        setClicked(false);
    }

    useEffect(() => {
        getSellerData()
    },[]);

    return (
        <div style={{ display: "flex" }}>
            <div className="seller">
                <div className="sellerinfo-container">
                    <h1>판매자 상세 정보</h1>

                    <div className="info-box">
                        <h2>Seller Info</h2>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="image-container" style={{ marginTop: "20px" }}>
                                <Image
                                    className="seller-img"
                                    radius="md"
                                    h={150}
                                    w={150}
                                    fit="crop"
                                    src={seller?.profileImage}
                                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                />
                            </div>
                            <div>
                                <div className="seller-info" style={{ width: "450px" }}>
                                    <Stack
                                        h={300}
                                        // bg="var(--mantine-color-body)"
                                        align="stretch"
                                        justify="center"
                                        gap="md"
                                    >
                                        <Grid>
                                            <Grid.Col
                                                span={4}
                                                style={{ alignContent: "center", textAlign: "center" }}
                                            >
                                                이름 :
                                            </Grid.Col>
                                            <Grid.Col span={8}>
                                                <Container
                                                    fluid
                                                    h={50}
                                                    bg="var(--mantine-color-white)"
                                                    style={{
                                                        alignContent: "center",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seller?.nickname}
                                                </Container>
                                            </Grid.Col>
                                        </Grid>
                                        <Grid>
                                            <Grid.Col
                                                span={4}
                                                style={{ alignContent: "center", textAlign: "center" }}
                                            >
                                                이메일 :
                                            </Grid.Col>
                                            <Grid.Col span={8}>
                                                <Container
                                                    fluid
                                                    h={50}
                                                    bg="var(--mantine-color-white)"
                                                    style={{
                                                        alignContent: "center",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seller?.email}
                                                </Container>
                                            </Grid.Col>
                                        </Grid>
                                        <Grid>
                                            <Grid.Col
                                                span={4}
                                                style={{ alignContent: "center", textAlign: "center" }}
                                            >
                                                전화번호 :
                                            </Grid.Col>
                                            <Grid.Col span={8}>
                                                <Container
                                                    fluid
                                                    h={50}
                                                    bg="var(--mantine-color-white)"
                                                    style={{
                                                        alignContent: "center",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seller?.phoneNumber}
                                                </Container>
                                            </Grid.Col>
                                        </Grid>
                                        <Grid>
                                            <Grid.Col
                                                span={4}
                                                style={{ alignContent: "center", textAlign: "center" }}
                                            >
                                                주소 :
                                            </Grid.Col>
                                            <Grid.Col span={8}>
                                                <Container
                                                    fluid
                                                    h={50}
                                                    bg="var(--mantine-color-white)"
                                                    style={{
                                                        alignContent: "center",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seller?.address}
                                                </Container>
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-box">
                        <div></div>
                        <h2>Shop Info</h2>
                        <div
                            className="shop"
                            style={{display: "flex", justifyContent: "space-around"}}
                        >
                            <div className="image-container">
                                <Image
                                    className="seller-img"
                                    radius="md"
                                    h={150}
                                    w={150}
                                    fit="crop"
                                    src={seller?.shop?.shopImage}
                                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                    style={{marginTop: 15}}
                                />
                            </div>

                            <div>
                                <div className="shop-info" style={{width: "450px"}}>
                                    <Stack
                                        // bg="var(--mantine-color-body)"
                                        align="stretch"
                                        justify="center"
                                        gap="md"
                                    >
                                        <Grid>
                                            <Grid.Col
                                                span={4}
                                                style={{alignContent: "center", textAlign: "center"}}
                                            >
                                                상점명 :
                                            </Grid.Col>
                                            <Grid.Col span={8}>
                                                <Container
                                                    fluid
                                                    h={50}
                                                    bg="var(--mantine-color-white)"
                                                    style={{
                                                        alignContent: "center",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seller?.shop?.name}
                                                </Container>
                                            </Grid.Col>
                                            <Grid.Col
                                                span={4}
                                                style={{alignContent: "center", textAlign: "center"}}
                                            >
                                                상점 설명 :
                                            </Grid.Col>
                                            <Grid.Col span={8}>
                                                <Container
                                                    fluid
                                                    h={50}
                                                    bg="var(--mantine-color-white)"
                                                    style={{
                                                        alignContent: "center",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {seller?.shop?.description}
                                                </Container>
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Button onClick={promote}>
                        해당 판매자 승인하기
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default AdminValidSellerComponent;
