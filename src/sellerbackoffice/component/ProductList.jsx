import {Button,Image,TextInput} from '@mantine/core';
import { modals } from '@mantine/modals';
import './css/ProductList.css';

const products = [
    {
        name: '상품명',
        price: 89000,
        quantity: 50,
        date: '2024-07-31 12:00:13',
    },
    {
        name: '상품명',
        price: 27000,
        quantity: 40,
        date: '2024-07-31 12:02:11',
    },
    {
        name: '상품명',
        price: 9800,
        quantity: 13,
        date: '2024-07-31 12:00:13',
    },
];

const ProductList = () =>{
    //product 불러오는 코드(서버에서)

    const handlePrice = async(e) =>{
        e.preventDegfault();
        const formData = new FormData(e.currentTarget);
        const price = formData.get("price");
        await handleProductPrice(price);
        window.location.reload();
    }

    const handleQuantity = async(e) =>{
        e.preventDegfault();
        const formData = new FormData(e.currentTarget);
        const quantity = formData.get("quantity");
        await handleProductQuantity(quantity);
        window.location.reload();
    }


    return(
        <div className="product-list">
            <h1>상품 목록</h1>
            {products.map((product, index) => (
                <div className="product-item" key={index}>
                    <div className='image'>
                    <Image
                        className="product-image"
                        radius="md"
                        h={150}
                        w={150}
                        fit="crop"
                        src="https://ifh.cc/g/xQTG2b.png"
                        style={{marginRight:15}}
                    />
                    </div>
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>가격: {product.price.toLocaleString()} 원</p>
                        <p>수량: {product.quantity} 개</p>
                    </div>
                    <div className="product-actions">
                    <p>등록 시간 : {product.date}</p>
                        <Button
                            color="gray"
                            className="update-btn"
                            onClick={()=>{
                                modals.open({
                                    title:"재고 수정",
                                    children: (
                                        <>
                                            <form onSubmit={handlePrice}>
                                                <TextInput
                                                    label = "가격"
                                                    placeholder='가격을 입력해주세요'
                                                    name="price"
                                                    className="price"
                                                />
                                                <Button fullWidth type="submit">변경하기</Button>
                                                <Button fullWidth onClick={()=>modals.closeAll()} mt="md">취소</Button>
                                            </form>
                                        </>
                                    )
                                })
                            }}
                        >가격 수정</Button>
                                                <Button
                            color="gray"
                            className="update-btn"
                            onClick={()=>{
                                modals.open({
                                    title:"재고 수정",
                                    children: (
                                        <>
                                            <form onSubmit={handleQuantity}>
                                                <TextInput
                                                    label = "수량"
                                                    placeholder='수량을 입력해주세요'
                                                    name="quantity"
                                                    className="quantity"
                                                />
                                                <Button fullWidth type="submit">변경하기</Button>
                                                <Button fullWidth onClick={()=>modals.closeAll()} mt="md">취소</Button>
                                            </form>
                                        </>
                                    )
                                })
                            }}
                        >수량 수정</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;