import { Button } from '@mantine/core';
import './App.css'
import {useState} from "react";
import PaymentModal from "./payment/components/PaymentModal.jsx";

function App() {

  const [isLogin, setIsLogin] = useState(true);
  const [isModal, setIsModal] = useState(false);

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
          (isLogin === true) ?
          <div className='button-container'>

          <Button variant="filled" className='button' size='lg' color="grape" onClick={handlerLogin}>구매자 로그인</Button>

            <Button variant="filled" className='button' size='lg' color="grape" onClick={handlerPayment}>판매자 로그인</Button>
          </div> :
          <div className='button-container'>
          <Button variant="filled" className='button' size='lg' color="grape" onClick={handlerLogin}>마이페이지로 이동</Button>
          </div>
        }
         {
             (isModal === true) ? <PaymentModal/> : null
         }
     </div>
    </>
  )
}

export default App