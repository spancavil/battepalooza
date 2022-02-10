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
  console.log(nftMarket);
  useEffect (
    () => {
      breakpoint ? setxPage (4) : setxPage (25);
    },
    [breakpoint, setxPage]
  );

  //console.log(filters);

  useEffect (
    () => {
      const auxFilter = [...nftMarket];
      let filtro1 = [];
      let filtro2 = [];
      let filtro3 = [];
      let filtro4 = [];
      let filtro5 = [];
      let filtro6 = [];
      let filtro7 = [];
      let filtro8 = [];
      let filtro9 = [];
      let filtro10 = [];

      if (filters.COMMON)
        filtro1 = auxFilter.filter (nft => nft.rarity === 'COMMON');
      if (filters.RARE) 
        filtro2 = auxFilter.filter (nft => nft.rarity === 'RARE');
      if (filters.EPIC) 
        filtro3 = auxFilter.filter (nft => nft.rarity === 'EPIC');
      if (filters.LEGENDARY) 
        filtro4 = auxFilter.filter (nft => nft.rarity === 'LEGENDARY');
      if (filters.Weapon)
        filtro5 = auxFilter.filter (nft => nft.type === 2);
      if (filters.Character)
        filtro6 = auxFilter.filter (nft => nft.type === 1);
      if (filters["0-100"])
        filtro7 = auxFilter.filter (nft => nft.playCount <= 100)
      if (filters["101-200"])
        filtro8 = auxFilter.filter (nft => nft.playCount <= 200 && nft.playCount > 100)
      if (filters["201-300"])
        filtro9 = auxFilter.filter (nft => nft.playCount <= 300 && nft.playCount > 200)
      if (filters["Over 300"])
        filtro10 = auxFilter.filter (nft => nft.playCount > 300)

      const filtroWeapon = !filters.Weapon && !filters.Character? 
                                              [...nftMarket] 
                                              :
                                              [...filtro5, ...filtro6]
    
      const filtroRarity = !filters.COMMON && !filters.RARE && !filters.EPIC &&!filters.LEGENDARY ?
                                              [...nftMarket]
                                              :
                                              [...filtro1, ...filtro2, ...filtro3, ...filtro4]

      const filtroPlayCount = !filters["0-100"] && !filters["101-200"] && !filters["201-300"] && !filters["Over 300"] ?
                                              [...nftMarket]
                                              :
                                              [...filtro7, ...filtro8, ...filtro9, ...filtro10]

      //Colocamos los valores que coinciden en ambos filtros de búsqueda (es como un inner join)
      const coincidencias = filtroWeapon.filter(value => filtroRarity.includes(value))
                                        .filter(value => filtroPlayCount.includes(value))

      setNftFiltered (coincidencias);
      
    },
    [filters, nftMarket]
  );

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
