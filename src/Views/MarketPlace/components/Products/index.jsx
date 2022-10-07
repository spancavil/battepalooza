import React from 'react';
import MarketplaceNfts from '../../components/MarketplaceNfts';
import styles from './styles.module.scss';

const Products = ({
  filters,
  page,
  nftPerPage,
  setPage,
  setNftPerPage,
  input,
  setInput,
  orderBy,
  filterTypes,
  nfts,
  loading,
  error,
  search
}) => {
  return (
    <div className={styles.container}>
      <MarketplaceNfts
        flex
        filters={filters}
        orderBy={orderBy}
        page={page}
        setPage={setPage}
        nftPerPage={nftPerPage}
        setNftPerPage={setNftPerPage}
        input={input}
        setInput={setInput}
        filterTypes={filterTypes}
        nfts ={nfts}
        loading = {loading}
        error = {error}
        search = {search}
      />
    </div>
  );
};

export default Products;
