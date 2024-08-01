import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './App.css';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <nav>
          <Link to="/">Home(나중에)</Link> | <Link to="/search">Search(지우)</Link> | <Link to="/product">Product Detail(겠습니다)</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
