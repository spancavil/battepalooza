import { useEffect, useState, useContext } from "react";
import Background from "../../Global-Components/Background";
import Products from "./components/Products";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { TYPE_NFT, CLONE_COUNT, ORDER_BY, P2E_ORDER_BY } from "./Constants";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import { UpMenu } from "./components/UpMenu";
import { LeftMenu } from "./components/LeftMenu";
import Footer from "../../Global-Components/Footer";
import { makeCheckableObject } from "../../Utils/objectUtilities";
import { NftData } from "../../Context/NftProvider";

const MarketPlace = () => {
    const [filters, setFilters] = useState({});
    const [activeFilters, setActiveFilters] = useState(0);
    const [orderBy, setOrderBy] = useState(ORDER_BY);
    const [cloneCount] = useState(CLONE_COUNT);
    const [p2e] = useState(P2E_ORDER_BY)
    const [page, setPage] = useState(1);
    const [xPage, setxPage] = useState(25);
    const [input, setInput] = useState(1);
    const [rarities, setRarities] = useState(null);
    const [characters, setCharacters] = useState(null);
    const [weapons, setWeapons] = useState(null);
    const [premiumBuffs, setPremiumBuffs] = useState(null);

    const { nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic } =
        useContext(NftData);

    const desktop = useMediaQuery("(min-width: 1200px)");
    const history = useHistory();

    console.log(
        nftStatic,
        clanStatic,
        rarityStatic,
        repIdStatic,
        premiumStatic
    );

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
            premiumStatic.map(buff => {
              return {name: buff.engName}
            })
        )

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
            ...premiumItem
        })
        //Tendrá todos los filtros
        setFilters({
            ...rarityItem,
            ...TYPE_NFT,
            ...CLONE_COUNT,
            ...P2E_ORDER_BY,
            search: "",
            ...weaponItem,
            ...characterItem,
            ...premiumItem
        });
    }, [
        setFilters,
        history,
        setWeapons,
        setCharacters,
        rarityStatic,
        repIdStatic,
        premiumStatic
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
        filtros.search = "";
        setFilters(filtros);
    };

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
                        <Products
                            filters={filters}
                            orderBy={orderBy}
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
            <Footer />
        </Background>
    );
};

export default MarketPlace;
