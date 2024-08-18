import React from 'react';
import { Box, Center, Title, Text, Button, Container } from '@mantine/core';

const Header = () => {
    return (
        <Container size={800} mt="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box
                bg="var(--mantine-color-gray-light)"
                p="xl"
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Title order={1}>High-V</Title>
                <Text size="lg" color="dimmed">혹시</Text>
                <Box mt="md">
                    <Button color="black" variant="outline" mr="sm">쓸 수 있어서</Button>
                    <Button>만들어놨슴돠</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Header;
