import {NavLink} from "@mantine/core";
import {IconGauge} from "@tabler/icons-react";

const SellerNavComponent = () => {
    return (
        <div style={{width: '200px', margin: "20px"}}>
            <NavLink
                label="판매자 정보 관리"
                leftSection={<IconGauge size="1rem" stroke={1.5}/>}
                childrenOffset={28}
            >
                <NavLink href="/seller-info" label="내 정보 관리"/>
                <NavLink label="상품 관리" href="/product-list"/>
                <NavLink label="쿠폰 관리" href="/seller/coupon"/>
                <NavLink label="결제 상태 관리" href="/seller/order-status"/>
                <NavLink label="주문 상태 관리" href="/seller/order-list"/>
            </NavLink>
            <NavLink
                href="#required-for-focus"
                label="매출 관리"
                childrenOffset={28}
                leftSection={<IconGauge size="1rem" stroke={1.5}/>}
            >
                <NavLink label="매출 현황" href="/seller-statistic"/>
            </NavLink>
        </div>
    )
}

export default SellerNavComponent;