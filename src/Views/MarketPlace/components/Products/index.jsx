import React from 'react';
import CollectionNfts from '../../components/CollectionNfts';
import styles from './styles.module.scss';

const Products = ({
  filters,
  page,
  xPage,
  setPage,
  setxPage,
  input,
  setInput,
}) => {
  return (
    <div className={styles.container}>
      <CollectionNfts
        flex
        filters={filters}
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
