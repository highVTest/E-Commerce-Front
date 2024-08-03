import React, {useEffect, useState} from 'react';
import {Container, Grid, Card, Image, Text, Title, Flex, ActionIcon, rem, Alert} from '@mantine/core';
import {IconHeart} from '@tabler/icons-react';
import {favoriteProduct, getAllProducts} from "../../api/v1/product/product.js";

// 제품 데이터를 가져오기 위한 빈 배열 초기화
const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [alert, setAlert] = useState({visible: false, message: ''});

  // API를 호출하여 제품 데이터를 가져오는 함수
  const getProducts = async () => {
    console.log("getProducts");
    const data = await getAllProducts();
    console.log("data", data);
    setProducts(data.data.content);
    // 찜하기 상태 배열 초기화
    setLiked(Array(data.data.content.length).fill(false));
  }


  // 찜하기 아이콘 클릭 핸들러
  const handleLikeClick = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);

    // Alert 메시지 설정
    setAlert({
      visible: true,
      message: newLiked[index] ? '찜하기 완료!' : '찜하기 취소!',
    });

    // // 데이터베이스에 찜하기 상태 업데이트
    // const updateFavorite = async () => {
    //     try {
    //         const response = await favoriteProduct(products[index].id, newLiked[index]);
    //         console.log('Success:', response.data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // 컴포넌트가 마운트될 때 제품 데이터를 가져옴
    useEffect(() => {
      getProducts();
      updateFavorite();
    }, []);

    return (
        <Container size={800} mt="xl">
          <Title order={2}>검색 결과</Title>
          {alert.visible && (
              <Alert title="알림" icon={<IconHeart/>} withCloseButton
                     onClose={() => setAlert({...alert, visible: false})}>
                {alert.message}
              </Alert>
          )}
          <Grid mt="md">
            {products.map((product, index) => (
                <Grid.Col span={4} key={product.id}>
                  <Card shadow="sm" padding="lg">
                    <Card.Section style={{position: 'relative'}}>
                      <Image src={product.productImage} height={160} alt="상품 이미지"
                             fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"/>
                      <ActionIcon
                          variant={liked[index] ? "gradient" : "default"}
                          size="xl"
                          aria-label="Gradient action icon"
                          gradient={liked[index] ? {from: 'red', to: 'red', deg: 360} : null}
                          style={{position: 'absolute', top: 10, right: 10}}
                          onClick={() => handleLikeClick(index)}
                      >
                        <IconHeart style={{width: rem(24), height: rem(24)}}/>
                      </ActionIcon>
                    </Card.Section>
                    <Flex justify="space-between" align="center" mt="md">
                      <Text weight={500}>{product.title}</Text>
                      <Text size="sm" color="dimmed">{product.price}</Text>
                    </Flex>
                  </Card>
                </Grid.Col>
            ))}
          </Grid>
        </Container>
    );
  };
};
export default SearchResults;
