import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  createRef,
  useRef
} from "react";
import styles from "./styles.module.scss";
import { NftData } from "../../../../Context/NftProvider";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import Pagination from "../../../../Global-Components/Pagination";
import VanillaTilt from "vanilla-tilt";
import useModifyList from "../../../../Hooks/useModifyList";
import Loader from "../../../../Global-Components/Loader";
import NftCard from "../../../../Global-Components/NftCard";

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
  nftPerPage,
  setNftPerPage,
  search,
  filterTypes
}) => {
  const {
    userCollection,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic,
    loadingUserCollection,
  } = useContext(NftData);

  const nftCollectionModified = useModifyList(
    userCollection,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic
  );

  //Array para aplicar los filtros primarios al array original
  const [nftsFiltered, setNftFiltered] = useState([]);
  
  //Array auxiliar para un segundo ordenamiento sobre el filtro de arriba.
  const [nftsFiltered2, setNftFiltered2] = useState(null);

  const [nftOrdered, setNftOrdered] = useState([]);
  
  const history = useHistory();
  const breakpoint = useMediaQuery("(max-width: 1200px)");

  //Usamos referencias para que la actualización sea instantánea y no esperemos a la actualización del estado
  const filterNewest = useRef(0);

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
    breakpoint ? setNftPerPage(16) : setNftPerPage(25);
  }, [breakpoint, setNftPerPage]);

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
      let filtro14 = [];
      let filtroWeaponsEspecificasRaw = []
      let filtrosWeaponsTildados = false;

      let filtroCharactersEsepcificosRaw = []
      let filtroCharactersTildados = false;

      let filtroP2ERaw = []
      let filtroP2eTildado = false;

      let filtroPremiumBuffRaw = []
      let filtroPremiumBuffsTildados = false;

      const weaponKeys = Object.keys(filterTypes?.weapons || {})
      if (weaponKeys.length) {
        for (const weapon of weaponKeys) {
          if (filters[weapon]) {
            filtroWeaponsEspecificasRaw.push(...auxFilter.filter(nft => nft.repName === weapon))
            filtrosWeaponsTildados = true;
          };
        }
      }

      const characterKeys = Object.keys(filterTypes?.characters || {})
      if (characterKeys.length) {
        for (const character of characterKeys) {
          if (filters[character]) {
            filtroCharactersEsepcificosRaw.push(...auxFilter.filter(nft => nft.repName === character))
            filtroCharactersTildados = true;
          };
        }
      }

      //p2e filters
      const p2eKeys = Object.keys(filterTypes?.p2e || {})
      if (p2eKeys.length){
        for (const p2eKey of p2eKeys) {
          if (filters[p2eKey]) {
            if (p2eKey.includes("50")){
              filtroP2ERaw.push(...auxFilter.filter(nft => nft.maxPlayCount - nft.playCount <= 50))
            }
            if (p2eKey.includes("51")){
              filtroP2ERaw.push(...auxFilter.filter(nft => nft.maxPlayCount - nft.playCount <= 100 && nft.maxPlayCount - nft.playCount > 50))
            }
            if (p2eKey.includes("101")){
              filtroP2ERaw.push(...auxFilter.filter(nft => nft.maxPlayCount - nft.playCount > 100))
            }
            filtroP2eTildado = true;
          }
        }
      }

      //premiumBuff filter
      const premiumBuffKeys = Object.keys(filterTypes?.premiumBuffs || {})
      if (premiumBuffKeys.length){
        for (const premiumBuffKey of premiumBuffKeys) {
          if (filters[premiumBuffKey]){
            const premiumBuffId = premiumStatic.find(staticBuff => staticBuff.engName === premiumBuffKey).id
            filtroPremiumBuffRaw.push(...auxFilter.filter(nft => {
              for (const buff of nft.buff) {
                if (buff.id === premiumBuffId) return true
              }
              return false
            }))
            filtroPremiumBuffsTildados = true
          }
        }
      }

      if (filters.Newest) {
        filterNewest.current = 1;
      }
      if (filters.Oldest) {
        filterNewest.current = 2;
      }

      if (filters.Common)
        filtro1 = auxFilter.filter((nft) => nft.rarity === "Common");
      if (filters.Rare)
        filtro2 = auxFilter.filter((nft) => nft.rarity === "Rare");
      if (filters.Epic)
        filtro3 = auxFilter.filter((nft) => nft.rarity === "Epic");
      if (filters.Legendary)
        filtro4 = auxFilter.filter((nft) => nft.rarity === "Legendary");
      if (filters.Weapon) filtro5 = auxFilter.filter((nft) => nft.type === 2);
      if (filters.Character)
        filtro6 = auxFilter.filter((nft) => nft.type === 1);
      if (search) {
        filtro14 = auxFilter.filter((nft) =>
          nft.itemName.toLowerCase().includes(search.toLowerCase())
        );
      }

      const filtroWeapon =
        !filters.Weapon && !filters.Character
          ? [...nftOrdered]
          : [...filtro5, ...filtro6];

      const filtroRarity =
        !filters.Common && !filters.Rare && !filters.Epic && !filters.Legendary
          ? [...nftOrdered]
          : [...filtro1, ...filtro2, ...filtro3, ...filtro4];

      const filtroSearch =
        search === "" ? [...nftOrdered] : [...filtro14];
      
      const filtroWeaponsEspecificas =
        filtrosWeaponsTildados ? [...filtroWeaponsEspecificasRaw] : [...nftOrdered]
  
      const filtroCharactersEspecificos =
        filtroCharactersTildados ? [...filtroCharactersEsepcificosRaw] : [...nftOrdered]
      
      const filtroP2eEspecifico = 
        filtroP2eTildado ? [...filtroP2ERaw] : [...nftOrdered]
      
      const filtroPremiumBuffEspecifico =
        filtroPremiumBuffsTildados ? [...filtroPremiumBuffRaw] : [...nftOrdered]

      //Colocamos los valores que coinciden en ambos filtros de búsqueda (es como un inner join)
      const coincidencias = filtroWeapon
        .filter((value) => filtroRarity.includes(value))
        .filter((value) => filtroSearch.includes(value))
        .filter((value) => filtroWeaponsEspecificas.includes(value))
        .filter((value) => filtroCharactersEspecificos.includes(value))
        .filter((value) => filtroP2eEspecifico.includes(value))
        .filter((value) => filtroPremiumBuffEspecifico.includes(value))

      setNftFiltered(coincidencias);
    }
  }, [filters, filterTypes, nftOrdered, setNftFiltered, search, premiumStatic]);

  //Effect para ordenar los elementos y que aparezcan los que están en venta primero. Además se verán primero los que han sido adquiridos recientemente.
  useEffect(() => {
    //Movemos un elemento de un array de un index a otro
    function move(array, from, to) {
      const elementToMove = array.splice(from, 1)[0]; //Nos devuelve el elemento a mover y lo quita del array
      array.splice(to, 0, elementToMove); //Insertamos el elemento en la posición especificada en "to". Con el 0 le decimos que no reemplace, sino que haga un shift.
    }

    if (nftCollectionModified.length !== 0) {
      const nftOrdered = [...nftCollectionModified];
      nftOrdered.sort(function (a, b) {
        const acquiredTimeA = a.acquired;
        const acquiredTimeB = b.acquired;
        if (acquiredTimeA < acquiredTimeB) return 1;
        if (acquiredTimeA > acquiredTimeB) return -1;
        return 0;
      });
      // nftOrdered.reverse()
      for (const nft of nftOrdered) {
        if (nft.salesState === 1) {
          const nftIndex = nftOrdered.findIndex((element) => element === nft);
          move(nftOrdered, nftIndex, 0);
        }
      }
      setNftOrdered(nftOrdered);
    }
  }, [nftCollectionModified]);

    //Ordenamientos secundarios

  //Effect for order by newest / oldest
  useEffect(() => {
    if (filterNewest.current !== 0) {
      const nftFiltered2 = [...nftsFiltered];
      if (filterNewest.current === 2) {
        setNftFiltered2([...nftFiltered2].reverse());
      } else if (filterNewest.current === 1) {
        setNftFiltered2([...nftFiltered2]);
      }
    }
  }, [filterNewest, nftsFiltered]);

  const max = nftCollectionModified.length / nftPerPage;

  console.log(nftCollectionModified);

  console.log(nftsFiltered.length);

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {nftsFiltered?.length 
          ? <h3 className={styles.title}>{nftsFiltered?.length} NFTs</h3>
          : null
        }
        {nftsFiltered.length > 0 && loadingUserCollection === false && (
          <div className={styles.cards}>
            {(nftsFiltered2 || nftsFiltered)
              .slice((page - 1) * nftPerPage, (page - 1) * nftPerPage + nftPerPage)
              .map((nft, idx) => {
                //Tenemos que pasarle el indice al map, para que apunte a la referencia correcta el div contenedor
                const indice = nftsFiltered?.indexOf(nft);
                return (
                  /* Aqui el div apunta a su referencia correspondiente */
                  <NftCard
                    key={idx}
                    nft={nft}
                    tilt={tilts[indice]}
                    onClick={() => onClick(nft?.uuid)}
                  />
                );
              })}
          </div>
        )}
      </div>

      {loadingUserCollection === true && (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}

      {(nftsFiltered.length === 0 || userCollection.length === 0) &&
        loadingUserCollection === false && (
          <div className={styles.notNft}>No NFTs found</div>
        )}

      {nftsFiltered.length > 0 && (
        <Pagination
        input={input}
        setInput={setInput}
        page={page}
        setPage={setPage}
        max={max}
    />
      )}
    </div>
  );
};

export default CollectionNfts;
