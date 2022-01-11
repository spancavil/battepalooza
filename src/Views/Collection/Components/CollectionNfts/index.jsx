import React, {useContext, useState, useEffect, useMemo, createRef} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import {Link} from 'react-router-dom';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import Pagination from '../Pagination';
import VanillaTilt from 'vanilla-tilt';

/* DOCS:
https://github.com/gijsroge/tilt.js
https://codesandbox.io/s/n5ptm?file=/src/index.js:973-1024
https://javascript.plainenglish.io/implementing-useref-in-react-732908aa1998
*/

//No hace falta los filters en esta collection
const CollectionNfts = () => {
  const [page, setPage] = useState (1);
  const [xPage, setxPage] = useState (25);

  const {userNft} = useContext (NftData);
  
  //Luego utilizaremos userCollection, cuando vengan bien los datos.
  // const {userCollection} = useContext(NftData)

  //Creamos un array de referencias por cada item que haya en userNft,
  //Utilizamos useMemo, que se actualiza, al actualizarse userNft. Como es info que viene de context, inicialmente viene sin valores
  //Una vez que se cargan, se vuelve a mappear y se crean distintas referencias (que son asociadas a los divs contenedores) por cada uno de los items.
  //Recordemos que las "ref" se utilizan para referenciar objetos del DOM, pudiéndose cambiar sus valores internos sin re-render.
  const tilts = useMemo(() => userNft.map(() => createRef()), [userNft]);
  
  const breakpoint = useMediaQuery ('(max-width: 1200px)');

  useEffect (
    () => {
      breakpoint ? setxPage (4) : setxPage (25);
    },
    [breakpoint]
  );

/*   useEffect (
    () => {
      setNftFiltered (nfts);
    },
    [nfts]
  ); */

  // console.log (nftsFiltered);

/*   useEffect (
    () => {
      const auxFilter = [...nfts];
      let filtro1 = [];
      let filtro2 = [];
      let filtro3 = [];
      let filtro4 = [];

      if (filters.COMMON)
        filtro1 = auxFilter.filter (nft => nft.rare === 'COMMON');
      if (filters.RARE)
        filtro2 = auxFilter.filter (nft => nft.rare === 'RARE');
      if (filters.EPIC)
        filtro3= auxFilter.filter (nft => nft.rare === 'EPIC');
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
        setNftFiltered ([...filtro1, ...filtro2, ...filtro3, ...filtro4])
      }
    },
    [filters, nfts]
  ); */

  useEffect(()=> {
    
    //Por cada item de mi array de tilts (tilts recordemos que es un array de referencias, una por item)
    //mappeamos e inicializamos sus valores utilizando la librería de Vanilla Tilt
    tilts.map(tilt => 
      VanillaTilt.init(tilt.current, {
        scale: 1.06,
        speed: 800,
        max: 15,
        reverse: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        glare: true,
        "max-glare": 0.15,
      })
    )
    
  }, [tilts])
  
  const max = userNft.length / xPage;

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {userNft
          .slice ((page - 1) * xPage, (page - 1) * xPage + xPage)
          .map ((nft, index) => {
            //Tenemos que pasarle el index al map, para que apunte a la referencia correcta el div contenedor
            return (
              <Link
              style={{textDecoration: 'none', overflow: 'visible'}}
              to={`/to-marketplace/${nft.id}`}
              key={nft.id}
              >
                {/* Aqui el div apunta a su referencia correspondiente */}
                <div ref={tilts[index]} className={styles.cardNft} key={nft.id}>
                {nft.inMarket && <div className={styles.sale}>Sale</div>}
                  <img
                    className={styles.imgNft}
                    src={nft.imgSrc.default}
                    alt="nft"
                  />
                  <div className={styles.texts}>
                    <p>{nft.title1}</p>
                    <p className={styles.text2}>{nft.rare}</p>
                    <p>#{nft.id}</p>
                    {nft.inMarket && <p className={styles.price}>{nft.price} NCoin</p>}
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
