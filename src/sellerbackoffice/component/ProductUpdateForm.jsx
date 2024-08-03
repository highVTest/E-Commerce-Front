import {Button, Stack, Textarea, TextInput,FileInput} from '@mantine/core';
import {useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './css/ProductForm.css';

const ProductUpdateForm = ({
    handleUpdateProduct
}) =>{

    const params = useParams();

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const description = formData.get("description");

        await handleUpdateProduct(params.id,name, description);      
    };

    return(
    <div>
        <div className="product-container">
            <h1>상품 등록</h1>
            <div className='box'>
                <div className="form-area">
                <h2>상품 정보 등록</h2>
                    <form className="product-form" onSubmit={handleProductSubmit}>
                        <Stack>
                            <TextInput
                                label="상품명"
                                placeholder="상품 이름을 입력하세요"
                                name="name"
                                className="input-field"
                            />
                            <Textarea
                                label="상품 설명"
                                placeholder="상품 설명을 입력하세요"
                                name="description"
                                className="input-field"
                                autosize
                                minRows={8}
                                maxRows={8}
                            />
                            <Button fullWidth color="indigo" type="submit">저장</Button>
                        </Stack>
                    </form>
                    <Link to="/product-list">
                        <Button>목록으로</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ProductUpdateForm;