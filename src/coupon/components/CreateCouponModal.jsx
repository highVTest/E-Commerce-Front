import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Button,
    TextInput,
    Fieldset,
    Card,
    Image,
    Text, NativeSelect, NumberInput,
} from "@mantine/core";
import "../../payment/css/PaymentModal.css";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import {createCoupon} from "../../api/v1/coupon/coupon.js";

// eslint-disable-next-line react/prop-types
function CreateCouponModal({token, product}) {
    const [value, setValue] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [discountPolicy, setDiscountPolicy] = useState('정책을 선택해 주세요');
    const [discount, setDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(product.price);
    const [expiredAt, setExpiredAt] = useState(null);
    const [couponName, setCouponName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handlerTotalPrice = () =>{
        if(discountPolicy === '할인율 설정'){
            setTotalPrice(product.price - (product.price * (discount / 100)))
        }else {
            if(discount >= product.price){
                alert("기존 가격에서 초과한 금액은 제시할 수 없습 니다")
                setDiscount(0);
            }else if((product.price - (product.price * (discount / 100)) > totalPrice)){
                alert("기준액 보다 작습니다")
                setDiscount(0)
            }
            setTotalPrice(product.price - discount)
        }
    }

    const handlerDiscountPolicy = () => {
        if(discountPolicy === '할인율 설정'){
            return <NumberInput
                style={{marginTop:"5px"}}
                min={1}
                max={40}
                description="할인율은 최대 40% 까지 설정이 가능힙니다"
                label="할인율 설정"
                placeholder="할인율을 설정해주세요"
                onChange={(value)=>{setDiscount(value)}}
            />
        }else if(discountPolicy === '가격 설정'){
            return <NumberInput
                style={{marginTop:"5px"}}
                min={1}
                max={50000}
                description="할인율은 최대 50000원 까지 설정이 가능힙니다"
                label="가격 설정"
                placeholder="가격을 설정해 주세요"
                value={discount}
                onChange={(value)=>{setDiscount(value)}}
            />
        }else{
            return null
        }

    }
    const dataDiscountPolicy = () =>{
        if(discountPolicy === '할인율 설정'){
            return 'DISCOUNT_RATE'
        }else if(discountPolicy === '가격 설정'){
            return 'DISCOUNT_PRICE'
        }else return 'DISCOUNT_RATE'
    }

    const reqCreateCoupon = async () => {
        console.log(quantity);
        try {
            const data ={
                productId : product.id,
                discountPolicy : dataDiscountPolicy(),
                discount: discount,
                expiredAt : expiredAt,
                quantity : quantity,
                couponName : couponName,
            }
            console.log(data)
            await createCoupon(
                token, data
            )

            alert("쿠폰 발급이 완료 되었습니다")
            window.location.reload()
        } catch (e){
            alert(e.response.data.errorMessage)
        }

    }

    const handleDateChange = (value) => {

        if (value) {

            const formattedDate = value.toISOString(); // ISO 8601 형식
            setExpiredAt(formattedDate);

        } else {
            setExpiredAt(null);
        }
    };

    const handleQuantity = (e) => {
        console.log(e.target.value);
        setQuantity(e.target.value); // 새로운 값을 상태에 저장합니다.
    };

    useEffect(() => {
        handlerTotalPrice()

    }, [discountPolicy, discount])

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="쿠폰 생성"
                centered
                style={{ padding: "10px" }}
            >
                <Fieldset legend="상품 정보" disabled style={{ fontWeight: "bold" }}>
                    <Image
                        className="product-image"
                        radius="md"
                        h={150}
                        w={150}
                        fit="crop"
                        src="https://ifh.cc/g/xQTG2b.png"
                        //   src={product.image}
                        fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                        style={{ marginRight: 15 }}
                    />
                    <TextInput label="상품 이름" placeholder={product.name} />
                    <TextInput label="기존 가격" placeholder={product.price} mt="md" />
                </Fieldset>
                <Fieldset legend="쿠폰 정보 등록" fw={500}>
                    <TextInput
                        label="쿠폰 이름"
                        placeholder="쿠폰 이름을 입력하세요"
                        onChange={(e)=>{setCouponName(e.target.value)}}
                    />
                    <DateInput
                        valueFormat="DD/MM/YYYY HH:mm:ss"
                        label="만료 기한"
                        placeholder="만료 시간을 입력하세요"
                        onChange={handleDateChange}
                    />
                    <NativeSelect label="쿠폰 정책" data={['정책을 선택해 주세요','할인율 설정', '가격 설정']} onChange={(e)=>{setDiscountPolicy(e.target.value)}}/>
                    {handlerDiscountPolicy()}
                    <NumberInput
                        style={{marginTop:"5px"}}
                        label="쿠폰 수량 설정"
                        placeholder="쿠폰 수량을 입력하세요"
                        onChange={(value)=>{setQuantity(value)}}
                    />
                </Fieldset>
                <Fieldset disabled fw={1000}>
                    <div className="payment-set">
                        <Text mt="xs" size="xs" fw={500}>
                            기존 금액
                        </Text>
                        <Text mt="xs" size="xs" fw={500}>
                            {product.price}
                        </Text>
                        <Text mt="xs" size="lg" fw={1000} color='red'>
                            할인 적용 금액
                        </Text>
                        <Text mt="xs" size="lg" fw={1000} color='red'
                              onChange={handlerTotalPrice}
                              >
                            {totalPrice}
                        </Text>
                    </div>
                </Fieldset>
                <div>
                    <Button
                        style={{ margin: "10px", float: "right" }}
                        onClick={reqCreateCoupon}
                    >
                        쿠폰 등록 하기
                    </Button>
                    <Button onClick={close} style={{ margin: "10px", float: "right" }}>
                        닫기
                    </Button>
                </div>
            </Modal>

            <Button color="gray" onClick={open}>쿠폰 등록</Button>
        </>
    );
}

export default CreateCouponModal;
