// import Button from '../../Global-Components/Button';
// import {Link} from 'react-router-dom';
// import CollectionPacks from './Components/CollectionPacks';
import React from 'react';
import Background from '../../Global-Components/Background';
import styles from './styles.module.scss';
import CollectionNfts from './Components/CollectionNfts';

const Collection = () => {
  return (
    <Background>
       {/* <div className={styles.container}> */}
        {/* <div className={styles.content}>
          <p>PACK</p>
          <div className={styles.rectangle}>
            <CollectionPacks short />
            <div className={styles.link}>
              <Link to="/my-packs">
                <Button title="FULL LIST" />
              </Link>
            </div>
          </div>
        </div>  */}

        <div className={styles.content2}>
          <p className={styles.title}>NFT</p>
          <div className={styles.rectangle}>
            <CollectionNfts short />
          </div>
        </div>
      {/* </div> */}
    </Background>
  );
};

export default Collection;
