import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './App.css';
import HomePage from './homepage/pages/HomePage';
import SearchPage from './homepage/pages/SearchPage';
import ProductDetailPage from './homepage/pages/ProductDetailPage';
import PaymentPage from './homepage/pages/PaymentPage';
import { Button } from '@mantine/core';
import './App.css'
import {useState} from "react";
import PaymentModal from "./payment/components/PaymentModal.jsx";
import '@mantine/core/styles.css';

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
          <MantineProvider withGlobalStyles withNormalizeCSS>
              <Router>
                  <nav>
                      <Link to="/">Home(나중에)</Link> | <Link to="/search">Search(지우)</Link> | <Link to="/product">Product Detail(겠습니다)</Link> | <Link to="/payment">Payment Page</Link>
                  </nav>

                  <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/product" element={<ProductDetailPage />} />
                      <Route path="/payment" element={<PaymentPage />} />
                  </Routes>
              </Router>
          </MantineProvider>
      </>
  );
}


export default App;
