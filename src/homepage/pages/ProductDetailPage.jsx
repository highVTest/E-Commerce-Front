import React from 'react';
import { Container, Title, Box, Anchor } from '@mantine/core';
import CommonLayout from '../components/CommonLayout';
import ProductDetail from '../components/ProductDetail';
import ProductDescription from '../components/ProductDescription';
import ProductReview from '../components/ProductReview';

const ProductDetailPage = () => {
  return (
      <CommonLayout>
        <Container size={800} mt="md">
          <ProductDetail />
          <Title order={3} mt="xl">상세 설명</Title>
          <ProductDescription />
          <Title order={3} mt="xl">리뷰</Title>
          <ProductReview />
          {/* Q&A 섹션 */}
          <Box id="qa-section" mt="xl">
            <Title order={3}>Q&A</Title>
            <Box sx={{ minHeight: '300px', backgroundColor: 'gray' }}></Box>
          </Box>
          {/* Q&A로 바로가기 링크 */}
          <Anchor href="#qa-section" mt="md" size="md">
            Q&A로 바로가기
          </Anchor>
        </Container>
      </CommonLayout>
  );
};

export default ProductDetailPage;
