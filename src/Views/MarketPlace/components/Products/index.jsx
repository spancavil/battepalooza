import React from 'react';
import MarketplaceNfts from '../../components/MarketplaceNfts';
import styles from './styles.module.scss';

const Products = ({
  filters,
  page,
  xPage,
  setPage,
  setxPage,
  input,
  setInput,
  orderBy,
}) => {
  return (
    <div className={styles.container}>
      <MarketplaceNfts
        flex
        filters={filters}
        orderBy={orderBy}
        page={page}
        setPage={setPage}
        xPage={xPage}
        setxPage={setxPage}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default Products;
