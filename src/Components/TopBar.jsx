import { Button } from '@mantine/core';
import {useState} from "react";
import "../index.css"
import "../App.css"

import '@mantine/core/styles.css';

function TopBar() {
    const [isLogin, setIsLogin] = useState(true);
    const [isModal, setIsModal] = useState(false);

    const token = localStorage.getItem("token");
    const handlerLogin = () => {
        if(isLogin === true){
            setIsLogin(false);
        } else{
            setIsLogin(true);
        }
    }

    const handlerPayment =() =>{
        if(isModal === true){
            setIsModal(false);
        }else {
            setIsModal(true);
        }
    }

    return (
        <>
            <div className="top-bar">
                <div className="circle"></div>
                <h1>High V</h1>
                {
                    (token === null) ?
                        <div className='button-container'>

                            <Button to=""variant="filled" className='button' size='lg' color="grape" onClick={handlerLogin}>구매자 로그인</Button>

                            <Button variant="filled" className='button' size='lg' color="grape" onClick={handlerPayment}>판매자 로그인</Button>
                        </div> :
                        <div className='button-container'>
                            <Button variant="filled" className='button' size='lg' color="grape" onClick={handlerLogin}>마이페이지로 이동</Button>
                        </div>
                }
            </div>
        </>
    );
}


export default TopBar;
