import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  createRef,
} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import {useHistory} from 'react-router-dom';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import Pagination from '../Pagination';
import VanillaTilt from 'vanilla-tilt';
import imagePlaceholder from '../../../../Assets/img/nft-card-front01.png';

/* DOCS:
https://github.com/gijsroge/tilt.js
https://codesandbox.io/s/n5ptm?file=/src/index.js:973-1024
https://javascript.plainenglish.io/implementing-useref-in-react-732908aa1998
*/

const CollectionNfts = () => {
  const [page, setPage] = useState (1);
  const [xPage, setxPage] = useState (25);
  const [input, setInput] = useState (1);

  const {userCollection} = useContext (NftData);

  //Luego utilizaremos userCollection, cuando vengan bien los datos.
  // const {userCollection} = useContext(NftData)

  //Creamos un array de referencias por cada item que haya en userNft,
  //Utilizamos useMemo, que se actualiza, al actualizarse userNft. Como es info que viene de context, inicialmente viene sin valores
  //Una vez que se cargan, se vuelve a mappear y se crean distintas referencias (que son asociadas a los divs contenedores) por cada uno de los items.
  //Recordemos que las "ref" se utilizan para referenciar objetos del DOM, pudiéndose cambiar sus valores internos sin re-render.
  const tilts = useMemo (() => userCollection.map (() => createRef ()), [
    userCollection,
  ]);

  const history = useHistory ();

  const onClick = uuid => {
    history.push (`/collection/${uuid}`);
  };

  const breakpoint = useMediaQuery ('(max-width: 1200px)');

  useEffect (
    () => {
      breakpoint ? setxPage (16) : setxPage (25);
    },
    [breakpoint]
  );

  useEffect (
    () => {
      //Por cada item de mi array de tilts (tilts recordemos que es un array de referencias, una por item)
      //mappeamos e inicializamos sus valores utilizando la librería de Vanilla Tilt
      tilts.map (tilt =>
        VanillaTilt.init (tilt.current, {
          scale: 1.06,
          speed: 800,
          max: 15,
          reverse: true,
          easing: 'cubic-bezier(.03,.98,.52,.99)',
          glare: true,
          'max-glare': 0.15,
        })
      );
    },
    [tilts]
  );

  const max = userCollection.length / xPage;

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {userCollection
          .slice ((page - 1) * xPage, (page - 1) * xPage + xPage)
          .map ((nft, index) => {
            //Tenemos que pasarle el index al map, para que apunte a la referencia correcta el div contenedor
            return (
              // <Link
              //   style={{textDecoration: 'none', overflow: 'visible'}}
              //   to={`/to-marketplace/${nft.uuid}`}
              //   key={nft.itemId}
              // >
              /* Aqui el div apunta a su referencia correspondiente */
              (
                <div
                  onClick={() => onClick (nft.uuid)}
                  ref={tilts[index]}
                  className={styles.cardNft}
                  key={nft.itemId}
                >
                  {nft.salesState === 1 &&
                    <div className={styles.sale}>Sale</div>}

                  {/* El source luego cambiara en base al asset */}
                  <img
                    className={styles.imgNft}
                    src={imagePlaceholder}
                    alt="nft"
                  />
                  <div className={styles.texts}>
                    <p>{nft.repName}</p>
                    <p>{nft.itemName}</p>
                    <p className={styles.text2}>{nft.rarity}</p>
                    {/* <p>#{nft.itemId}</p> */}
                    <p>gNCoin Battle Count: {nft.playCount}/{nft.maxPlayCount}</p>
                    {nft.salesState === 1 &&
                      <p className={styles.price}>{nft.price} NCoin</p>}
                  </div>
                </div>
              )
              /*              </Link> */
            );
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
