import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  createRef,
  useRef,
} from "react";
import styles from "./styles.module.scss";
import { NftData } from "../../../../Context/NftProvider";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import NftCard from "../NftCard";
import VanillaTilt from "vanilla-tilt";
import { useHistory } from "react-router-dom";
import Pagination from "../../../../Global-Components/Pagination";
import useModifyList from "../../../../Hooks/useModifyList";
import Loader from "../../../../Global-Components/Loader";

const MarketplaceNfts = ({
  filters,
  page,
  xPage,
  setPage,
  setxPage,
  input,
  setInput,
  orderBy,
}) => {
  const { nftMarket, nftStatic, clanStatic, rarityStatic, repIdStatic } =
    useContext(NftData);
  const [loading, setLoading] = useState(true);

  //Array para aplicar los filtros primarios al array original
  const [nftsFiltered, setNftFiltered] = useState(nftMarket);

  //Array auxiliar para un segundo ordenamiento sobre el filtro de arriba.
  const [nftsFiltered2, setNftFiltered2] = useState(null);

  //Usamos referencias para que la actualización sea instantánea y no esperemos a la actualización del estado
  const filterByPrice = useRef(0);
  const filterNewest = useRef(0);

  const history = useHistory();

  const breakpoint = useMediaQuery("(max-width: 1200px)");

  //El array original de nfts
  const nftMarketModified = useModifyList(
    nftMarket,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic
  );

  const tilts = useMemo(
    () => nftsFiltered.map(() => createRef()),
    [nftsFiltered]
  );

  useEffect(() => {
    if (nftsFiltered.length > 0) {
      setLoading(false);
    }
  }, [nftsFiltered]);

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
  }, [tilts]);

  useEffect(() => {
    breakpoint ? setxPage(4) : setxPage(25);
  }, [breakpoint, setxPage]);

  //Effect para el ordenamiento primario
  useEffect(() => {
    const auxFilter = [...nftMarketModified];
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
    let filtro14 = [];

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
    if (filters.search) {
      filtro14 = auxFilter.filter((nft) =>
        nft.itemName.toLowerCase().includes(filters.search)
      );
    }
    if (orderBy.LowestPrice) {
      filterNewest.current = 0;
      filterByPrice.current = 1;
    }
    if (orderBy.HighestPrice) {
      filterNewest.current = 0;
      filterByPrice.current = 2;
    }
    if (orderBy.Newest) {
      filterByPrice.current = 0;
      filterNewest.current = 1;
    }
    if (orderBy.Oldest) {
      filterByPrice.current = 0;
      filterNewest.current = 2;
    }

    const filtroWeapon =
      !filters.Weapon && !filters.Character
        ? [...nftMarketModified]
        : [...filtro5, ...filtro6];

    const filtroRarity =
      !filters.COMMON && !filters.RARE && !filters.EPIC && !filters.LEGENDARY
        ? [...nftMarketModified]
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
        ? [...nftMarketModified]
        : [
            ...filtro7,
            ...filtro8,
            ...filtro9,
            ...filtro10,
            filtro11,
            filtro12,
            filtro13,
          ];

    const filtroSearch =
      filters.search === "" ? [...nftMarketModified] : [...filtro14];

    //Colocamos los valores que coinciden en ambos filtros de búsqueda (es como un inner join)
    const coincidencias = filtroWeapon
      .filter((value) => filtroRarity.includes(value))
      .filter((value) => filtroCloneCount.includes(value))
      .filter((value) => filtroSearch.includes(value));

    setNftFiltered(coincidencias);
  }, [filters, nftMarketModified, orderBy, setNftFiltered]);

  const max = nftsFiltered.length / xPage;

  //Ordenamientos secundarios

  //Effect for order by newest / oldest
  useEffect(() => {
    if (filterNewest.current !== 0) {
      console.log("Order by time");
      const nftFiltered2 = [...nftsFiltered];
      if (filterNewest.current === 2) {
        console.log("Deberia ordernarse por viejo");
        setNftFiltered2([...nftFiltered2].reverse());
      } else if (filterNewest.current === 1) {
        console.log("Deberia ordernarse por nuevo");
        setNftFiltered2([...nftFiltered2]);
      }
    }
  }, [filterNewest, nftMarketModified, nftsFiltered]);

  //Effect for order by price
  useEffect(() => {
    if (filterByPrice.current === 1 || filterByPrice.current === 2) {
      const nftFiltered2 = [...nftsFiltered];
      console.log("Order by price");
      nftFiltered2.sort(function (a, b) {
        if (filterByPrice.current === 1) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      setNftFiltered2(nftFiltered2);
    }
  }, [filterByPrice, nftsFiltered]);

  const handleDetail = (uniqueId, sellerPid) => {
    history.push(`/marketplace/${uniqueId}-${sellerPid}`);
  };

  return (
    <div className={styles.cardsContainer}>
      {nftsFiltered.length > 0 && loading === false && (
        <>
          <h3 className={styles.title}>
            {nftsFiltered2?.length || nftsFiltered?.length} NFTs
          </h3>
          <div className={styles.cards}>
            {(nftsFiltered2 || nftsFiltered)
              .slice((page - 1) * xPage, (page - 1) * xPage + xPage)
              .map((nft) => {
                const indice = nftMarketModified?.indexOf(nft);
                return (
                  <NftCard
                    key={nft.uniqueId}
                    nft={nft}
                    tilt={tilts[indice]}
                    onClick={handleDetail}
                  />
                );
              })}
          </div>
        </>
      )}

      {loading === true && (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}

      {nftMarket.length === 0 && loading === false && (
        <div className={styles.notNft}>There are no NFTs in marketplace</div>
      )}

      {nftsFiltered.length === 0 && loading === false && (
        <div className={styles.notNft}>No NFT matches the search criteria</div>
      )}

      {nftsFiltered.length > 0 && (
        <Pagination
          xPage={xPage}
          setxPage={setxPage}
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

export default MarketplaceNfts;
