import React, {useState} from 'react';
import Background from '../../Global-Components/Background';
import Filters from './components/Filters';
import Products from './components/Products';
import SearchBar from './components/SearchBar';

import styles from './styles.module.scss';

const MarketPlace = () => {
  const [filters, setFilters] = useState ({
    COMMON: false,
    RARE: false,
    EPIC: false,
    LEGENDARY: false,
  });
  const [page, setPage] = useState (1);
  const [xPage, setxPage] = useState (25);
  const [input, setInput] = useState (1);

  return (
    <Background>
      <div className={styles.container}>
        <Filters
          input={input}
          setInput={setInput}
          setPage={setPage}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={styles.products}>
          <SearchBar />
          <Products
            filters={filters}
            page={page}
            setPage={setPage}
            xPage={xPage}
            setxPage={setxPage}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </Background>
  );
};

export default MarketPlace;
