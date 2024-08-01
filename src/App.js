import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './App.css';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PaymentPage from './pages/PaymentPage'; 
import CommonLayout from './components/CommonLayout'; 
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <nav>
          <Link to="/">Home(나중에)</Link> | <Link to="/search">Search(지우)</Link> | <Link to="/product">Product Detail(겠습니다)</Link> | <Link to="/payment">Payment Page</Link>
        </nav>

        <Routes>
          <Route path="/" element={<CommonLayout><HomePage /></CommonLayout>} />
          <Route path="/search" element={<CommonLayout><SearchPage /></CommonLayout>} />
          <Route path="/product" element={<CommonLayout><ProductDetailPage /></CommonLayout>} />
          <Route path="/payment" element={<PaymentPage />} /> {/* PaymentPage 경로에 layout prop 추가 */}
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
