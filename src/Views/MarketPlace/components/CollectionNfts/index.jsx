import React, {useContext, useState, useEffect} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import {Link} from 'react-router-dom';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import Pagination from '../Pagination';

const CollectionNfts = ({filters}) => {
  const [page, setPage] = useState (1);
  const [xPage, setxPage] = useState (25);
  const {nfts} = useContext (NftData);
  const [nftsFiltered, setNftFiltered] = useState (nfts);

  const breakpoint = useMediaQuery ('(max-width: 1200px)');

  useEffect (
    () => {
      breakpoint ? setxPage (4) : setxPage (25);
    },
    [breakpoint]
  );

  useEffect (
    () => {
      setNftFiltered (nfts);
    },
    [nfts]
  );

  console.log (nftsFiltered);

  useEffect (
    () => {
      if (filters.COMMON)
        setNftFiltered (nftsFiltered.filter (nft => nft.rare === 'COMMON'));
      if (filters.RARE)
        setNftFiltered (nftsFiltered.filter (nft => nft.rare === 'RARE'));
      if (filters.EPIC)
        setNftFiltered (nftsFiltered.filter (nft => nft.rare === 'EPIC'));
      if (filters.LEGENDARY)
        setNftFiltered (nftsFiltered.filter (nft => nft.rare === 'LEGENDARY'));
      if (
        !filters.COMMON &&
        !filters.RARE &&
        !filters.EPIC &&
        !filters.LEGENDARY
      )
        setNftFiltered (nfts);
    },
    [filters, nfts, nftsFiltered]
  );

  const max = nftsFiltered.length / xPage;

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {nftsFiltered
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
