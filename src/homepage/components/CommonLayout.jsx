import React from 'react';
import { Box, Container } from '@mantine/core';
import Header from './Header';
import SectionTitle from './SectionTitle';
import ProductList from './ProductList';
import SearchBar from './SearchBar';

const CommonLayout = ({ children }) => {
    return (
        <div>
            {/* 상단 회색 영역 */}
            <Box sx={{ height: 100, backgroundColor: 'gray' }}></Box>

            {/* 검색창 영역 */}
            <SearchBar />

            {children}
        </div>
    );
};

export default CommonLayout;
