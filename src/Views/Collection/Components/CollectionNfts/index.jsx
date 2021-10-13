import React, {useContext} from 'react';
import styles from './styles.module.scss';
import { NftData } from '../../../../Context/NftProvider';

const CollectionNfts = () => {
    const {nfts, setNfts} = useContext (NftData);

  return (
    <>
      {nfts.map (nft => {
        return (
          <div className={styles.cardNft} key={nft.id}>
            <img className={styles.imgNft} src={nft.imgSrc} alt="nft" />
            <div className={styles.texts}>
              <p className={styles.text1}>Series 1 </p>
              <p className={styles.text2}>Tron Warrior</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CollectionNfts;
