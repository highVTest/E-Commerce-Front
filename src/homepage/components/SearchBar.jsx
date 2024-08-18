import React from 'react';
import { Container, Center, TextInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <Container size={800} mt="md">
            <Center>
                <TextInput
                    placeholder="검색어를 입력하세요"
                    size="md"
                    sx={{ width: '100%', borderRadius: '40px' }}
                    style={{ width: 800 }}
                    rightSection={
                        <Button color="black" variant="filled" size="xs" radius="lg" onClick={handleSearchClick}>
                            검색
                        </Button>
                    }
                    rightSectionWidth={70}
                />
            </Center>
        </Container>
    );
};

export default SearchBar;
