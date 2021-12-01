import React from 'react';
import CollectionNfts from '../../components/CollectionNfts';
import styles from './styles.module.scss';

const Products = () => {
  return <div className={styles.container}>
      <CollectionNfts flex />
  </div>
};

export default Products;
