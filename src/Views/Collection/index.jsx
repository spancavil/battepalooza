import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { NftData } from "../../Context/NftProvider";
import Background from "../../Global-Components/Background";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import { TYPE_NFT, CLONE_COUNT, ORDER_BY, P2E_ORDER_BY } from "../../Constants/Filters";
import { LeftMenu } from "../../Global-Components/LeftMenu";
import { UpMenu } from "../../Global-Components/UpMenu";
import CollectionNfts from "./Components/CollectionNfts";
import styles from "./styles.module.scss";
import { makeCheckableObject } from "../../Utils/objectUtilities";

const Collection = () => {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [nftPerPage, setNftPerPage] = useState(25);
    const [input, setInput] = useState(1);
    const [filterTypes, setFilterTypes] = useState({});
    const [search, setSearch] = useState("")
    const [activeFilters, setActiveFilters] = useState(0);

    const { rarityStatic, repIdStatic, premiumStatic } = useContext(NftData);

    const desktop = useMediaQuery("(min-width: 1200px)");
    const history = useHistory();

    useEffect(() => {
        if (rarityStatic.length && repIdStatic.length && premiumStatic.length){
            const rarityItem = makeCheckableObject(
                rarityStatic.filter((rarity) => rarity.name !== "None")
            );
            const characterItem = makeCheckableObject(
                repIdStatic.filter((item) => item.goodsType === 1)
            );
            const weaponItem = makeCheckableObject(
                repIdStatic.filter((item) => item.goodsType === 2)
            );
            const premiumItem = makeCheckableObject(
                premiumStatic.map((buff) => {
                    return { name: buff.engName };
                })
            );
    
            setFilterTypes({
                weapons: weaponItem,
                characters: characterItem,
                rarities: rarityItem,
                cloneCount: CLONE_COUNT,
                premiumBuffs: premiumItem,
                p2e: P2E_ORDER_BY,
                orderBy: ORDER_BY,
            });

            //Tendrá todos los filtros
            setFilters({
                ...rarityItem,
                ...TYPE_NFT,
                ...CLONE_COUNT,
                ...P2E_ORDER_BY,
                search: "",
                ...weaponItem,
                ...characterItem,
                ...premiumItem,
            });
        }
    }, [
        setFilters,
        history,
        rarityStatic,
        repIdStatic,
        premiumStatic,
    ]);

    //Effect for count active filters
    useEffect(() => {
        const filtersActive = { ...filters };
        delete filtersActive.search;
        delete filtersActive.Weapon;
        delete filtersActive.Character;
        let acc = 0;
        for (const filtro in filtersActive) {
            if (Object.hasOwnProperty.call(filtersActive, filtro)) {
                acc = acc + (filtersActive[filtro] ? 1 : 0);
            }
        }
        setActiveFilters(acc);
    }, [filters]);

    const resetFilters = () => {
        const filtros = { ...filters };
        for (const key in filtros) {
            if (Object.hasOwnProperty.call(filtros, key)) {
                filtros[key] = false;
            }
        }
        setSearch("");
        setFilters(filtros);
    };
    

    return (
        <Background>
            <div className={styles.container}>
                <UpMenu
                    search = {search}
                    setSearch = {setSearch}
                    filterTypes={filterTypes}
                    filters={filters}
                    setFilters={setFilters}
                    desktop={desktop}
                />
                <div className={styles.subContainer}>
                    <LeftMenu
                        resetFilters={resetFilters}
                        setInput={setInput}
                        setPage={setPage}
                        filters={filters}
                        setFilters={setFilters}
                        activeFilters={activeFilters}
                        filterTypes={filterTypes}

                    />
                    <div className={styles.products}>
                        <CollectionNfts
                            filters={filters}
                            filterTypes={filterTypes}
                            page={page}
                            setPage={setPage}
                            nftPerPage={nftPerPage}
                            setNftPerPage={setNftPerPage}
                            input={input}
                            setInput={setInput}
                            search = {search}
                        />
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default Collection;
