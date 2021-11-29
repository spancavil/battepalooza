import React from 'react';
import Background from '../../Global-Components/Background';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';

import styles from './styles.module.scss'

const MarketPlace = () => {
  return (
    <Background>
      <div className={styles.container}>
        <Filters />
        <div>
          <SearchBar />
        </div>
      </div>
    </Background>
  );
};

export default MarketPlace;
