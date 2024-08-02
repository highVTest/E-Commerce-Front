import React, { useState } from 'react';
import { Container, Grid, Card, Image, Text, Title, Flex, ActionIcon, rem, Alert } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

const products = Array(9).fill(0).map((_, index) => ({
  id: index,
  title: '상품명',
  price: '가격',
  imageUrl: '/path/to/your/image.jpg',
}));

const SearchResults = () => {
  const [liked, setLiked] = useState(Array(products.length).fill(false));
  const [alert, setAlert] = useState({ visible: false, message: '' });

  const handleLikeClick = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);

    // Alert 메시지 설정
    setAlert({
      visible: true,
      message: newLiked[index] ? '찜하기 완료!' : '찜하기 취소!',
    });

    // 데이터베이스에 찜하기 상태 업데이트 
    /*
    fetch('/api/update-favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: products[index].id, favorite: newLiked[index] }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  };

  return (
      <Container size={800} mt="xl">
        <Title order={2}>검색 결과</Title>
        {alert.visible && (
            <Alert title="알림" icon={<IconHeart />} withCloseButton onClose={() => setAlert({ ...alert, visible: false })}>
              {alert.message}
            </Alert>
        )}
        <Grid mt="md">
          {products.map((product, index) => (
              <Grid.Col span={4} key={product.id}>
                <Card shadow="sm" padding="lg">
                  <Card.Section style={{ position: 'relative' }}>
                    <Image src={product.imageUrl} height={160} alt="상품 이미지" />
                    <ActionIcon
                        variant={liked[index] ? "gradient" : "default"}
                        size="xl"
                        aria-label="Gradient action icon"
                        gradient={liked[index] ? { from: 'red', to: 'red', deg: 360 } : null}
                        style={{ position: 'absolute', top: 10, right: 10 }}
                        onClick={() => handleLikeClick(index)}
                    >
                      <IconHeart style={{ width: rem(24), height: rem(24) }} />
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

export default SearchResults;
