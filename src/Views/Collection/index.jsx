import React from 'react';
import Background from '../../Global-Components/Background';
import styles from './styles.module.scss';
import CollectionNfts from './Components/CollectionNfts';

const Collection = () => {
  const charEsc = '<';

  return (
    <Background>
      <div className={styles.content2}>
        <p className={styles.goBack}> {charEsc} Go back</p>
        <p className={styles.title}>COLLECTION</p>
        <div className={styles.rectangle}>
          <CollectionNfts />
        </div>
      </div>
    </Background>
  );
};

export default Collection;
