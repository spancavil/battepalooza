import React, {useContext, useState, useEffect} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import Pagination from '../Pagination';
import Nft from '../Nft';

const CollectionNfts = ({
  filters,
  page,
  xPage,
  setPage,
  setxPage,
  input,
  setInput,
}) => {
  const {nfts, nftMarket} = useContext (NftData);
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
      const auxFilter = [...nftMarket];
      let filtro1 = [];
      let filtro2 = [];
      let filtro3 = [];
      let filtro4 = [];

      if (filters.COMMON)
        filtro1 = auxFilter.filter (nft => nft.rarity === 'COMMON');
      if (filters.RARE) filtro2 = auxFilter.filter (nft => nft.rarity === 'RARE');
      if (filters.EPIC) filtro3 = auxFilter.filter (nft => nft.rarity === 'EPIC');
      if (filters.LEGENDARY)
        filtro4 = auxFilter.filter (nft => nft.rarity === 'LEGENDARY');
      if (
        !filters.COMMON &&
        !filters.RARE &&
        !filters.EPIC &&
        !filters.LEGENDARY
      )
        setNftFiltered (nftMarket);
      else {
        setNftFiltered ([...filtro1, ...filtro2, ...filtro3, ...filtro4]);
      }
    },
    [filters, nftMarket]
  );

  console.log(nftMarket);
  const max = nftsFiltered.length / xPage;

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {nftsFiltered
          .slice ((page - 1) * xPage, (page - 1) * xPage + xPage)
          .map (nft => {
            return <Nft key={nft.uniqueId} {...nft} />;
          })}
      </div>
      <Pagination
        xPage={xPage}
        setxPage={setxPage}
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
