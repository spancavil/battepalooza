import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  createRef,
} from "react";
import styles from "./styles.module.scss";
import { NftData } from "../../../../Context/NftProvider";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import Pagination from "../Pagination";
import VanillaTilt from "vanilla-tilt";
import useModifyList from "../../../../Hooks/useModifyList";
// import imagePlaceholder from '../../../../Assets/img/nft-card-front01.png';

/* DOCS:
https://github.com/gijsroge/tilt.js
https://codesandbox.io/s/n5ptm?file=/src/index.js:973-1024
https://javascript.plainenglish.io/implementing-useref-in-react-732908aa1998
*/

const CollectionNfts = () => {
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);
  const [flagMemo, setFlagMemo] = useState(null)
  const [nftOrdered, setNftOrdered] = useState([]);

  const { userCollection, nftStatic, clanStatic, rarityStatic, repIdStatic } = useContext(NftData);

  const nftCollectionModified = useModifyList(userCollection, nftStatic, clanStatic, rarityStatic, repIdStatic);

  // console.log(nftCollectionModified);
  // console.log(nftOrdered);

  //Effect para ordenar los elementos y que aparezcan los que están en venta primero.
  useEffect(() => {

    //Movemos un elemento de un array de un index a otro
    function move(array, from, to) {
      const elementToMove = array.splice(from, 1)[0]; //Nos devuelve el elemento a mover y lo quita del array
      array.splice(to, 0, elementToMove); //Insertamos el elemento en la posición especificada en "to". Con el 0 le decimos que no reemplace, sino que haga un shift.
    }

    if (nftCollectionModified.length !== 0) {
      const nftOrdered = [...nftCollectionModified]
      console.log(nftOrdered);
      nftOrdered.reverse()
      console.log(nftOrdered);
      console.log("Array reversed");
      for (const nft of nftOrdered) {
        if (nft.salesState === 1) {
          const nftIndex = nftOrdered.findIndex(element => element === nft)
          // console.log(nftIndex);
          move(nftOrdered, nftIndex, 0)
        }
      }
      setFlagMemo(1);
      setNftOrdered(nftOrdered)
    }

  }, [nftCollectionModified])

  console.log(flagMemo);

  //Luego utilizaremos userCollection, cuando vengan bien los datos.
  // const {userCollection} = useContext(NftData)

  //Creamos un array de referencias por cada item que haya en userCollection,
  //Utilizamos useMemo, que se actualiza, al actualizarse userCollection. Como es info que viene de context, inicialmente viene sin valores
  //Una vez que se cargan, se vuelve a mappear y se crean distintas referencias (que son asociadas a los divs contenedores) por cada uno de los items.
  //Recordemos que las "ref" se utilizan para referenciar objetos del DOM, pudiéndose cambiar sus valores internos sin re-render.
  const tilts = useMemo(
    () => {
      if (flagMemo && nftOrdered.length !== 0) {
        console.log(flagMemo);
        console.log(nftOrdered);
        return nftOrdered.map(() => createRef())
      }
    },
    [nftOrdered, flagMemo]
  );

  const history = useHistory();

  const onClick = (uuid) => {
    history.push(`/collection/${uuid}`);
  };

  const breakpoint = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    breakpoint ? setxPage(16) : setxPage(25);
  }, [breakpoint]);

  // console.log(tilts);

  useEffect(() => {
    //Por cada item de mi array de tilts (tilts recordemos que es un array de referencias, una por item)
    //mappeamos e inicializamos sus valores utilizando la librería de Vanilla Tilt
    if (tilts) {
      tilts.map((tilt) =>
        VanillaTilt.init(tilt.current, {
          scale: 1.06,
          speed: 800,
          max: 15,
          reverse: true,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          glare: true,
          "max-glare": 0.15,
        })
      );
    }
  }, [tilts, page]);

  console.log(xPage);

  const max = nftCollectionModified.length / xPage;

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {tilts && nftOrdered
          .slice((page - 1) * xPage, (page - 1) * xPage + xPage)
          .map((nft) => {
            //Tenemos que pasarle el indice al map, para que apunte a la referencia correcta el div contenedor
            const indice = nftCollectionModified?.indexOf(nft);
            return (
              /* Aqui el div apunta a su referencia correspondiente */
              <div
                key={nft.uuid}
                className={
                  nft.rarity === "Common"
                    ? styles.borderCommon
                    : nft.rarity === "Rare"
                      ? styles.borderRare
                      : nft.rarity === "Epic"
                        ? styles.borderEpic
                        : styles.borderLegendary
                }
                onClick={() => onClick(nft.uuid)}
                ref={tilts[indice]}
              >
                <div className={styles.cardNft}>
                  {nft.salesState === 1 && (
                    <div className={styles.sale}>Sale</div>
                  )}

                  {/* El source luego cambiara en base al asset */}
                  <img
                    className={styles.imgNft}
                    src={nft.thumbnailUrl}
                    alt="nft-thumb"
                  />
                  <div className={styles.texts}>
                    <p className={styles.itemName}>{nft.itemName}</p>
                    <p>{nft.repName}</p>
                    <p className={styles.text2}>{nft.rarity}</p>
                    {/* <p>#{nft.itemId}</p> */}
                    {/* <p>
                      gNCoin Battle Count: {nft.playCount}/{nft.maxPlayCount}
                    </p> */}
                    {nft.salesState === 1 && (
                      <p className={styles.price}>{nft.price} NCoin</p>
                    )}
                  </div>
                </div>
              </div>
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
