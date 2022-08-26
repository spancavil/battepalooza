import React from "react";
import { sliceObject } from "../../../../Utils/sliceObject";
import styles from "./styles.module.scss";

const CharacterWeaponFilter = ({ filters, setFilters }) => {
    const filtersType = sliceObject(filters, 11, 13);

    console.log(filters);

    const onChange = (filtro) => {
        setFilters({ ...filters, [filtro]: !filters[filtro] });
    };

    const resetFilters = () => {
        setFilters({...filters, Character: false, Weapon: false})
    }

    return (
        <div className={styles.charsAndWeapon}>
            <span onClick={resetFilters}>All</span>
            {Object.keys(filtersType).map((filtro) => {
                return <span onClick={()=>onChange(filtro)} key={filtro}>{filtro}</span>;
            })}
        </div>
    );
};

export default CharacterWeaponFilter;
