import React from 'react';
import { Grid, Card, Image, Text } from '@mantine/core';

const products = Array(6).fill(0).map((_, index) => ({
  id: index,
  title: 'Text',
  price: '$0',
  description: 'Body text.',
  imageUrl: '/path/to/your/image.jpg',
}));

const ProductList = () => {
  return (
    <Grid mt="md">
      {products.map((product) => (
        <Grid.Col span={4} key={product.id}>
          <Card shadow="sm" padding="lg">
            <Card.Section>
              <Image src={product.imageUrl} height={160} alt="상품 이미지" />
            </Card.Section>
            <Text weight={500} mt="md">{product.title}</Text>
            <Text size="sm" color="dimmed">{product.price}</Text>
            <Text size="sm" mt="sm">{product.description}</Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProductList;
