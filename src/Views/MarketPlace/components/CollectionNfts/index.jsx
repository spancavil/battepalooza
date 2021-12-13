import React, {useContext, useState, useEffect} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import {Link} from 'react-router-dom';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import Pagination from '../Pagination';

const CollectionNfts = () => {
  const [page, setPage] = useState (1);
  const [xPage, setxPage] = useState (10);
  const {nfts} = useContext (NftData);

  const breakpoint = useMediaQuery ('(max-width: 1200px)');

  useEffect (
    () => {
      breakpoint ? setxPage (4) : setxPage (10);
    },
    [breakpoint]
  );

  const max = nfts.length / xPage;

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {nfts
          .slice ((page - 1) * xPage, (page - 1) * xPage + xPage)
          .map (nft => {
            return (
              <Link
                style={{textDecoration: 'none', overflow: 'visible'}}
                to={`/marketplace/${nft.id}`}
                key={nft.id}
              >
                <div className={styles.cardNft} key={nft.id}>
                  <img
                    className={styles.imgNft}
                    src={nft.imgSrc.default}
                    alt="nft"
                  />
                  <div className={styles.texts}>
                    <p>Series 1 </p>
                    <p className={styles.text2}>Tron Warrior</p>
                    <p>#{nft.id}</p>
                    <p className={styles.price}>{nft.price} NCoin</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <Pagination page={page} setPage={setPage} max={max} />
    </div>
  );
};

export default CollectionNfts;
