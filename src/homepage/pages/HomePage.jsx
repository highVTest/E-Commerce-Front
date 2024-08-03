import React from 'react';
import { Container } from '@mantine/core';
import CommonLayout from '../components/CommonLayout';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import ProductList from '../components/ProductList';

const HomePage = () => {
    return (
        <CommonLayout>
            {/* 제목과 버튼 영역 */}

            {/* 추천 상품 리스트 */}
            <Container size={800} mt="xl">
                <SectionTitle title="추천 상품 리스트" subtitle="사용자의 요구에 맞는 상품들을 소개합니다." />
                <ProductList />
            </Container>

            {/* 카테고리별 인기 상품 */}
            <Container size={800} mt="xl">
                <SectionTitle title="카테고리별 인기 상품" subtitle="사용자의 요구에 맞는 상품들을 소개합니다." />
                <ProductList />
            </Container>
        </CommonLayout>
    );
};

export default HomePage;
