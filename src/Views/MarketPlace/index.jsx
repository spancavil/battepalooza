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

  return (
    <Background>
      <div className={styles.container}>
        <Filters filters={filters} setFilters={setFilters} />
        <div className={styles.products}>
          <SearchBar />
          <Products filters={filters} />
        </div>
      </div>
    </Background>
  );
};

export default MarketPlace;
