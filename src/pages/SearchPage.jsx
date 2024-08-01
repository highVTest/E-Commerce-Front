import React from 'react';
import CommonLayout from '../components/CommonLayout';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  return (
    <CommonLayout>
      {/* 상품 리스트 */}
      <SearchResults />
    </CommonLayout>
  );
};

export default SearchPage;
