import React from 'react';
import CollectionNfts from '../../components/CollectionNfts';
import styles from './styles.module.scss';

const Products = ({filters}) => {
  return <div className={styles.container}>
      <CollectionNfts flex filters={filters} />
  </div>
};

export default Products;
