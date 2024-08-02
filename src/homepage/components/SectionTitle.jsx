import React from 'react';
import { Title, Text } from '@mantine/core';

const SectionTitle = ({ title, subtitle }) => {
    return (
        <div style={{ textAlign: 'left' }}>
            <Title order={2}>{title}</Title>
            <Text>{subtitle}</Text>
        </div>
    );
};

export default SectionTitle;
