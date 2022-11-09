import React from "react";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import styles from "./styles.module.scss";

const Tooltip = ({ weaponOrCharacter = null, buffs = null, buffsInPack = null, additionalStyles = null, index = 0, handleBuffVisibility}) => {

    const tablet = useMediaQuery('(max-width: 768px)')

    //HD - Weapon or char
    const isPosition4 = (index + 1 - 4) % 5 === 0
    const isPosition5 = (index + 1) % 5 === 0

    //tablet - weapon or char
    const isPosition2tablet = (index + 1 - 2) % 3 === 0
    const isPosition3tablet = (index + 1) % 3 === 0

    //tablet - buff
    const isPosition3buffTablet = (index + 1 - 3) % 4 === 0
    const isPosition4buffTablet = (index + 1 ) % 4 === 0

    const handleBuffView = () => {
        handleBuffVisibility()
    }

    if (weaponOrCharacter) {

        return (
            <div className={styles.tooltipContainerWeapon} 
                style={
                    {left: !tablet && (isPosition4 || isPosition5) 
                        ? -200
                        : tablet && isPosition2tablet 
                        ? -100
                        : tablet && isPosition3tablet
                        ? -200
                        : 0
                    }
                }
            >
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className={styles.tipText}>
                        {weaponOrCharacter?.itemName} - {weaponOrCharacter?.repName}
                    </p>
                </div>
                <p className={styles.tipText}>{weaponOrCharacter?.rarity}</p>
                <p className={styles.tipText}>{weaponOrCharacter?.engStory}</p>
            </div>
        );

    } else if (buffs) {
        return (
            <div className={styles.tooltipContainerBuff}
            style={
                {
                    right: isPosition4buffTablet || isPosition3buffTablet
                    ? 0 : null
                    ,
                    left: !(isPosition4buffTablet || isPosition3buffTablet)
                    ? 0 : null
                    ,
                    ...additionalStyles
                }
                
            }
            >
                {buffs.map((buff) => (
                    <p className={styles.tipTextBuff} key={buff.id}>
                        {buff.engName} +{buff.min}~{buff.max}{buff.valueType === "Percent" ? " %" : null}
                    </p>
                ))}
            </div>
        );

    } else if (buffsInPack) {
        return (
            <div 
                className={styles.tooltipContainerBuffPack}
                onClick = {handleBuffView}
            >
                {buffsInPack.map((buff) => (
                    <div style = {
                        {display: "flex",
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: "left",
                        gap: 4, 
                        }
                    }>
                        <img src = {buff.icon} style={{width: 35}} alt = "buff-pack"/>
                        <p className={styles.tipTextBuff} key={buff.id}>
                            {buff.engName} +{buff.min}~{buff.max}{buff.valueType === "Percent" ? " %" : null}
                        </p>
                    </div>
                ))}
            </div>
        )
    } else return null
};

export default Tooltip;
