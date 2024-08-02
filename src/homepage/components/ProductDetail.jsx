import React, { useState } from 'react';
import { Grid, Image, Text, Button, Title, Alert } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const [liked, setLiked] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '' });
  const navigate = useNavigate();

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);

    // Alert 메시지 설정
    setAlert({
      visible: true,
      message: newLiked ? '찜하기 완료!' : '찜하기 취소!',
    });

    // 데이터베이스에 찜하기 상태 업데이트 (주석으로 작성)
    /*
    fetch('/api/update-favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: 1, favorite: newLiked }), // productId를 실제 제품 ID로 교체
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

  const handlePurchaseClick = () => {
    navigate('/payment');
  };

  return (
    <>
      {alert.visible && (
        <Alert title="알림" icon={<IconHeart />} withCloseButton onClose={() => setAlert({ ...alert, visible: false })}>
          {alert.message}
        </Alert>
      )}
      <Grid mt="md">
        <Grid.Col span={4}>
          <Image src="/path/to/your/image.jpg" alt="상품 이미지" />
        </Grid.Col>
        <Grid.Col span={8}>
          <Title order={2}>상품명</Title>
          <Text>카테고리</Text>
          <Text>가격</Text>
          <Text>간단 설명</Text>
          <Button mt="md" onClick={handlePurchaseClick}>구매하기</Button>
          <Button mt="md" ml="sm" onClick={handleLikeClick}>
            찜하기
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ProductDetail;
