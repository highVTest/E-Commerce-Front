import React, {useEffect} from 'react';
import {Grid, Card, Image, Text} from '@mantine/core';
import {getAllProducts} from "../../api/v1/product/product.js";

const products = Array(6).fill(0).map((_, index) => ({
    id: index,
    title: 'Text',
    price: '$0',
    description: 'Body text.',
    imageUrl: '/path/to/your/image.jpg',
}));

const ProductList = () => {
    // API를 호출하여 상품 목록을 가져오는 로직
    const getProducts = async () => {
        console.log("getProducts");
        const data = await getAllProducts();
        console.log("data",data);
    }
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <Grid mt="md">
            {products.map((product) => (
                <Grid.Col span={4} key={product.id}>
                    <Card shadow="sm" padding="lg">
                        <Card.Section>
                            <Image src={product.imageUrl} height={160} alt="상품 이미지"/>
                        </Card.Section>
                        <Text weight={500} mt="md">{product.title}</Text>
                        <Text size="sm">{product.price}</Text>
                        <Text size="sm" mt="sm">{product.description}</Text>
                    </Card>
                </Grid.Col>
            ))}
        </Grid>
    );
};

export default ProductList;
