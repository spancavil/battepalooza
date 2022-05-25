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

/* DOCS:
https://github.com/gijsroge/tilt.js
https://codesandbox.io/s/n5ptm?file=/src/index.js:973-1024
https://javascript.plainenglish.io/implementing-useref-in-react-732908aa1998
*/

const CollectionNfts = ({
  filters,
  page,
  setPage,
  input,
  setInput,
  xPage,
  setxPage,
}) => {
  const { userCollection, nftStatic, clanStatic, rarityStatic, repIdStatic } =
    useContext(NftData);

  const nftCollectionModified = useModifyList(
    userCollection,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic
  );

  const [nftsFiltered, setNftFiltered] = useState([]);
  const [nftOrdered, setNftOrdered] = useState([]);

  const history = useHistory();
  const breakpoint = useMediaQuery("(max-width: 1200px)");

  //Creamos un array de referencias por cada item que haya en userCollection,
  //Utilizamos useMemo, que se actualiza, al actualizarse userCollection. Como es info que viene de context, inicialmente viene sin valores
  //Una vez que se cargan, se vuelve a mappear y se crean distintas referencias (que son asociadas a los divs contenedores) por cada uno de los items.
  //Recordemos que las "ref" se utilizan para referenciar objetos del DOM, pudiéndose cambiar sus valores internos sin re-render.
  const tilts = useMemo(
    () => nftsFiltered.map(() => createRef()),
    [nftsFiltered]
  );
  
  const onClick = (uuid) => {
    history.push(`/collection/${uuid}`);
  };

  useEffect(() => {
    breakpoint ? setxPage(16) : setxPage(25);
  }, [breakpoint, setxPage]);

  useEffect(() => {
    //Por cada item de mi array de tilts (tilts recordemos que es un array de referencias, una por item)
    //mappeamos e inicializamos sus valores utilizando la librería de Vanilla Tilt
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
  }, [tilts, page]);

  useEffect(() => {
    if (nftOrdered.length > 0) {
      const auxFilter = [...nftOrdered];
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
      let filtro11 = [];
      let filtro12 = [];
      let filtro13 = [];
      // let filtro14 = [];

      if (filters.COMMON)
        filtro1 = auxFilter.filter((nft) => nft.rarity === "Common");
      if (filters.RARE)
        filtro2 = auxFilter.filter((nft) => nft.rarity === "Rare");
      if (filters.EPIC)
        filtro3 = auxFilter.filter((nft) => nft.rarity === "Epic");
      if (filters.LEGENDARY)
        filtro4 = auxFilter.filter((nft) => nft.rarity === "Legendary");
      if (filters.Weapon) filtro5 = auxFilter.filter((nft) => nft.type === 2);
      if (filters.Character) filtro6 = auxFilter.filter((nft) => nft.type === 1);
      if (filters["1"]) filtro7 = auxFilter.filter((nft) => nft.cloneCount === 1);
      if (filters["2"]) filtro8 = auxFilter.filter((nft) => nft.cloneCount === 2);
      if (filters["3"]) filtro9 = auxFilter.filter((nft) => nft.cloneCount === 3);
      if (filters["4"])
        filtro10 = auxFilter.filter((nft) => nft.cloneCount === 4);
      if (filters["5"])
        filtro11 = auxFilter.filter((nft) => nft.cloneCount === 5);
      if (filters["6"])
        filtro12 = auxFilter.filter((nft) => nft.cloneCount === 6);
      if (filters["7"])
        filtro13 = auxFilter.filter((nft) => nft.cloneCount === 7);
      // if (filters.search) {
      //   filtro14 = auxFilter.filter((nft) =>
      //     nft.itemName.toLowerCase().includes(filters.search)
      //   );
      // }

      const filtroWeapon =
        !filters.Weapon && !filters.Character
          ? [...nftOrdered]
          : [...filtro5, ...filtro6];

      const filtroRarity =
        !filters.COMMON && !filters.RARE && !filters.EPIC && !filters.LEGENDARY
          ? [...nftOrdered]
          : [...filtro1, ...filtro2, ...filtro3, ...filtro4];

      const filtroCloneCount =
        !filters["0"] &&
          !filters["1"] &&
          !filters["2"] &&
          !filters["3"] &&
          !filters["4"] &&
          !filters["5"] &&
          !filters["6"] &&
          !filters["7"]
          ? [...nftOrdered]
          : [
            ...filtro7,
            ...filtro8,
            ...filtro9,
            ...filtro10,
            ...filtro11,
            ...filtro12,
            ...filtro13,
          ];

      // const filtroSearch =
      //   filters.search === "" ? [...nftOrdered] : [...filtro14];


      //Colocamos los valores que coinciden en ambos filtros de búsqueda (es como un inner join)
      const coincidencias = filtroWeapon
        .filter((value) => filtroRarity.includes(value))
        .filter((value) => filtroCloneCount.includes(value))
      // .filter((value) => filtroSearch.includes(value));

      setNftFiltered(coincidencias);
    }
  }, [filters, nftOrdered, setNftFiltered]);

  //Effect para ordenar los elementos y que aparezcan los que están en venta primero. Además se verán primero los que han sido adquiridos recientemente.
  useEffect(() => {

    //Movemos un elemento de un array de un index a otro
    function move(array, from, to) {
      const elementToMove = array.splice(from, 1)[0]; //Nos devuelve el elemento a mover y lo quita del array
      array.splice(to, 0, elementToMove); //Insertamos el elemento en la posición especificada en "to". Con el 0 le decimos que no reemplace, sino que haga un shift.
    }

    if (nftCollectionModified.length !== 0) {
      const nftOrdered = [...nftCollectionModified]
      nftOrdered.sort(function (a, b) {
        const acquiredTimeA = a.acquired
        const acquiredTimeB = b.acquired
        if (acquiredTimeA < acquiredTimeB) return 1
        if (acquiredTimeA > acquiredTimeB) return -1
        return 0
      })
      // nftOrdered.reverse()
      for (const nft of nftOrdered) {
        if (nft.salesState === 1) {
          const nftIndex = nftOrdered.findIndex(element => element === nft)
          move(nftOrdered, nftIndex, 0)
        }
      }
      setNftOrdered(nftOrdered)
    }

  }, [nftCollectionModified])

  const max = nftCollectionModified.length / xPage;


  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {nftsFiltered
          .slice((page - 1) * xPage, (page - 1) * xPage + xPage)
          .map((nft) => {
            //Tenemos que pasarle el indice al map, para que apunte a la referencia correcta el div contenedor
            const indice = nftsFiltered?.indexOf(nft);
            
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
