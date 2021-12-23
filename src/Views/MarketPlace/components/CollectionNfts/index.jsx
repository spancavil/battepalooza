import React, {useContext, useState, useEffect} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import {Link} from 'react-router-dom';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import Pagination from '../Pagination';

const CollectionNfts = ({
  filters,
  page,
  xPage,
  setPage,
  setxPage,
  input,
  setInput,
}) => {
  const {nfts} = useContext (NftData);
  const [nftsFiltered, setNftFiltered] = useState (nfts);

  const breakpoint = useMediaQuery ('(max-width: 1200px)');

  useEffect (
    () => {
      breakpoint ? setxPage (4) : setxPage (25);
    },
    [breakpoint, setxPage]
  );

  useEffect (
    () => {
      const auxFilter = [...nfts];
      let filtro1 = [];
      let filtro2 = [];
      let filtro3 = [];
      let filtro4 = [];

      if (filters.COMMON)
        filtro1 = auxFilter.filter (nft => nft.rare === 'COMMON');
      if (filters.RARE) filtro2 = auxFilter.filter (nft => nft.rare === 'RARE');
      if (filters.EPIC) filtro3 = auxFilter.filter (nft => nft.rare === 'EPIC');
      if (filters.LEGENDARY)
        filtro4 = auxFilter.filter (nft => nft.rare === 'LEGENDARY');
      if (
        !filters.COMMON &&
        !filters.RARE &&
        !filters.EPIC &&
        !filters.LEGENDARY
      )
        setNftFiltered (nfts);
      else {
        setNftFiltered ([...filtro1, ...filtro2, ...filtro3, ...filtro4]);
      }
    },
    [filters, nfts]
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
      <Pagination
        input={input}
        setInput={setInput}
        page={page}
        setPage={setPage}
        max={max}
      />
    </div>
  );
};

export default CollectionNfts;
