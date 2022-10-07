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
    const [xPage, setxPage] = useState(25);
    const [input, setInput] = useState(1);
    const [orderBy, setOrderBy] = useState(ORDER_BY);
    const [cloneCount] = useState(CLONE_COUNT);
    const [p2e] = useState(P2E_ORDER_BY);
    const [activeFilters, setActiveFilters] = useState(0);
    const [characters, setCharacters] = useState(null);
    const [weapons, setWeapons] = useState(null);
    const [rarities, setRarities] = useState(null);
    const [premiumBuffs, setPremiumBuffs] = useState(null);

    const { rarityStatic, repIdStatic, premiumStatic } = useContext(NftData);

    const desktop = useMediaQuery("(min-width: 1200px)");
    const history = useHistory();

    useEffect(() => {
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

        setWeapons({
            ...weaponItem,
        });
        setCharacters({
            ...characterItem,
        });
        setRarities({
            ...rarityItem,
        });
        setPremiumBuffs({
            ...premiumItem,
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
    }, [
        setFilters,
        history,
        setWeapons,
        setCharacters,
        rarityStatic,
        repIdStatic,
        premiumStatic,
    ]);

    const resetFilters = () => {
        const filtros = { ...filters };
        for (const key in filtros) {
            if (Object.hasOwnProperty.call(filtros, key)) {
                filtros[key] = false;
            }
        }
        filtros.search = "";
        setFilters(filtros);
    };

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

    return (
        <Background>
            <div className={styles.container}>
                <UpMenu
                    filters={filters}
                    setFilters={setFilters}
                    desktop={desktop}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                />
                <div className={styles.subContainer}>
                    <LeftMenu
                        resetFilters={resetFilters}
                        setInput={setInput}
                        setPage={setPage}
                        filters={filters}
                        setFilters={setFilters}
                        activeFilters={activeFilters}
                        filterTypes={{
                            weapons,
                            characters,
                            rarities,
                            cloneCount,
                            premiumBuffs,
                            p2e,
                        }}
                    />
                    <div className={styles.products}>
                        <CollectionNfts
                            filters={filters}
                            page={page}
                            setPage={setPage}
                            xPage={xPage}
                            setxPage={setxPage}
                            input={input}
                            setInput={setInput}
                        />
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default Collection;
