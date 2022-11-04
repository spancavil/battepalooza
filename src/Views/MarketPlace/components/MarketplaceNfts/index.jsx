import React, {
    useContext,
    useState,
    useEffect,
    useMemo,
    createRef,
} from "react";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import { NftData } from "../../../../Context/NftProvider";
import { useHistory } from "react-router-dom";

import Pagination from "../../../../Global-Components/Pagination";
import useModifyList from "../../../../Hooks/useModifyList";
import NftCard from "../../../../Global-Components/NftCard";
import Loader from "../../../../Global-Components/Loader";
import VanillaTilt from "vanilla-tilt";

import styles from "./styles.module.scss";

const MarketplaceNfts = ({
    page,
    nftPerPage,
    setPage,
    setNftPerPage,
    input,
    setInput,
    nfts,
    loading,
    search,
    activeFilters,
}) => {
    const { nftStatic, clanStatic, rarityStatic, repIdStatic } =
        useContext(NftData);

    //Array para aplicar los filtros primarios al array original
    const [nftsFiltered, setNftFiltered] = useState(nfts);

    const history = useHistory();

    const breakpoint = useMediaQuery("(max-width: 1200px)");

    //El array original de nfts
    const nftMarketModified = useModifyList(
        nfts,
        nftStatic,
        clanStatic,
        rarityStatic,
        repIdStatic
    );

    console.log(nftMarketModified);

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

    useEffect(() => {
        breakpoint ? setNftPerPage(4) : setNftPerPage(25);
    }, [breakpoint, setNftPerPage]);

    //Effect para el ordenamiento primario
    useEffect(() => {
        const auxFilter = [...nftMarketModified]
        let filtro1 = [];
        if (search) {
            filtro1 = auxFilter.filter((nft) =>
                nft.itemName.toLowerCase().includes(search.toLowerCase())
            );
        }

        const filtroSearch =
            search === "" ? [...auxFilter] : [...filtro1];

        //Colocamos los valores que coinciden en ambos filtros de búsqueda (es como un inner join)
        setNftFiltered(filtroSearch);

    }, [nftMarketModified, setNftFiltered, search]);

    const max = nftsFiltered.length / nftPerPage;

    const handleDetail = (uniqueId, sellerPid) => {
        history.push(`/marketplace/${uniqueId}-${sellerPid}`);
    };

    return (
        <div className={styles.cardsContainer}>
            {nftMarketModified.length > 0 && loading === false && (
                <>
                    <h3 className={styles.title}>
                        {nftMarketModified?.length} NFTs
                    </h3>
                    <div className={styles.cards}>
                        {nftsFiltered
                            .slice(
                                (page - 1) * nftPerPage,
                                (page - 1) * nftPerPage + nftPerPage
                            )
                            .map((nft) => {
                                const indice = nftMarketModified?.indexOf(nft);
                                return (
                                    <NftCard
                                        key={nft.uniqueId}
                                        nft={nft}
                                        tilt={tilts[indice]}
                                        onClick={() =>
                                            handleDetail(
                                                nft?.uniqueId,
                                                nft?.sellerPid
                                            )
                                        }
                                        withPrice
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

            {!activeFilters && nftMarketModified.length === 0 && loading === false && (
                <div className={styles.notNft}>
                    There are no NFTs in marketplace
                </div>
            )}

            {activeFilters && nftsFiltered.length === 0 && loading === false && (
                <div className={styles.notNft}>
                    No NFT matches the search criteria
                </div>
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

export default MarketplaceNfts;
