import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  createRef,
} from "react";
import styles from "./styles.module.scss";
import { NftData } from "../../../../Context/NftProvider";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import Nft from "../Nft";
import VanillaTilt from "vanilla-tilt";
import { useHistory } from "react-router-dom";
import Pagination from "../../../../Global-Components/Pagination";
import useModifyList from "../../../../Hooks/useModifyList";

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
  const { nftMarket, nftStatic, clanStatic, rarityStatic, repIdStatic } = useContext(NftData);
  const [nftsFiltered, setNftFiltered] = useState(nftMarket);
  const [filterByPrice, setFilterByPrice] = useState(0);
  const [filterNewest, setFilterNewest] = useState(0);

  const history = useHistory();

  const breakpoint = useMediaQuery("(max-width: 1200px)");

  const nftMarketModified = useModifyList(nftMarket, nftStatic, clanStatic, rarityStatic, repIdStatic);

  const tilts = useMemo(
    () => nftsFiltered.map(() => createRef()),
    [nftsFiltered]
  );

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

  // console.log(tilts);

  useEffect(() => {
    breakpoint ? setxPage(4) : setxPage(25);
  }, [breakpoint, setxPage]);

 /*  console.log(orderBy);
  console.log(nftMarket);
  console.log(nftsFiltered); */

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
    let filtro13 = [];

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
    if (filters["0-100"])
      filtro7 = auxFilter.filter((nft) => nft.playCount <= 100);
    if (filters["101-200"])
      filtro8 = auxFilter.filter(
        (nft) => nft.playCount <= 200 && nft.playCount > 100
      );
    if (filters["201-300"])
      filtro9 = auxFilter.filter(
        (nft) => nft.playCount <= 300 && nft.playCount > 200
      );
    if (filters["Over 300"])
      filtro10 = auxFilter.filter((nft) => nft.playCount > 300);
    filtro10 = auxFilter.filter((nft) => nft.playCount > 300);
    if (filters.search) {
      filtro13 = auxFilter.filter((nft) =>
        nft.itemName.toLowerCase().includes(filters.search)
      );
    }
    if (orderBy.LowestPrice) {
      setFilterByPrice(1);
    }
    if (orderBy.HighestPrice) {
      setFilterByPrice(2);
    }
    if (orderBy.Newest) {
      setFilterNewest(1);
    }
    if (orderBy.Oldest) {
      setFilterNewest(2);
    }

    const filtroWeapon =
      !filters.Weapon && !filters.Character
        ? [...nftMarketModified]
        : [...filtro5, ...filtro6];

    const filtroRarity =
      !filters.COMMON && !filters.RARE && !filters.EPIC && !filters.LEGENDARY
        ? [...nftMarketModified]
        : [...filtro1, ...filtro2, ...filtro3, ...filtro4];

    const filtroPlayCount =
      !filters["0-100"] &&
      !filters["101-200"] &&
      !filters["201-300"] &&
      !filters["Over 300"]
        ? [...nftMarketModified]
        : [...filtro7, ...filtro8, ...filtro9, ...filtro10];

    const filtroSearch = filters.search === "" ? [...nftMarketModified] : [...filtro13];

    //Colocamos los valores que coinciden en ambos filtros de búsqueda (es como un inner join)
    const coincidencias = filtroWeapon
      .filter((value) => filtroRarity.includes(value))
      .filter((value) => filtroPlayCount.includes(value))
      .filter((value) => filtroSearch.includes(value));

    setNftFiltered(coincidencias);
  }, [filters, nftMarketModified, orderBy, setNftFiltered]);

  const max = nftsFiltered.length / xPage;

  //Order by functions
  const lth = (a, b) => a.price - b.price;
  const htl = (a, b) => b.price - a.price;

  useEffect(() => {
    console.log("Entro al effect");
    console.log(filterNewest);
    if (filterNewest === 1) {
      console.log("Deberia ordernarse por nuevo");
      setNftFiltered([...nftMarketModified].reverse());
    } else if (filterNewest === 2) {
      console.log("Deberia ordernarse por viejo");
      setNftFiltered([...nftMarketModified]);
    }
  }, [orderBy, filterNewest, nftMarketModified]);

  const handleDetail = (uniqueId, sellerPid) => {
    history.push(`/marketplace/${uniqueId}-${sellerPid}`);
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {nftsFiltered
          .sort(filterByPrice === 1 ? lth : htl, filterByPrice === 0 ?? null)
          .slice((page - 1) * xPage, (page - 1) * xPage + xPage)
          .map((nft) => {
            const indice = nftMarketModified?.indexOf(nft);
            return (
              <Nft
                key={nft.uniqueId}
                nft={nft}
                tilt={tilts[indice]}
                onClick={handleDetail}
              />
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

export default MarketplaceNfts;
