import React from "react";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import styles from "./styles.module.scss";

const Tooltip = ({
  weaponOrCharacter = null,
  buffs = null,
  buffsInPack = null,
  additionalStyles = null,
  index = 0,
  hoverOnBuff = () => {},
}) => {
  const tablet = useMediaQuery("(max-width: 768px)");
  const desktop = useMediaQuery("(min-width: 1200px) and (max-width: 1899px)");

  // Desktop & HD - Weapon or char
  const isPosition4DesktopOrHd = !tablet && (index + 1 - 4) % 5 === 0;
  const isPosition5DesktopOrHd = !tablet && (index + 1) % 5 === 0;

  //tablet - weapon or char
  const isPosition2tablet = tablet && (index + 1 - 2) % 3 === 0;
  const isPosition3tablet = tablet && (index + 1) % 3 === 0;

  //Tablet & HD - buff
  const isPosition3buffTablet = !desktop && (index + 1 - 3) % 4 === 0;
  const isPosition4buffTablet = !desktop && (index + 1) % 4 === 0;

  //Desktop - buff
  const isPosition3DesktopBuff = desktop && (index + 1) % 3 === 0;

  if (weaponOrCharacter) {
    return (
      <div
        className={styles.tooltipContainerWeapon}
        style={{
          left:
            isPosition4DesktopOrHd || isPosition5DesktopOrHd
              ? -200
              : isPosition2tablet
              ? -100
              : isPosition3tablet
              ? -200
              : 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p className={styles.tipText}>
            {weaponOrCharacter?.itemName} - {weaponOrCharacter?.repName}
          </p>
        </div>
        <p className={styles.tipText}>{weaponOrCharacter?.rarity}</p>
        <p className={styles.tipText}>{weaponOrCharacter?.engStory.replace('\\n', '')}</p>
      </div>
    );
  } else if (buffs) {
    return (
      <div
        className={styles.tooltipContainerBuff}
        style={{
          right:
            isPosition4buffTablet ||
            isPosition3buffTablet ||
            isPosition3DesktopBuff
              ? 0
              : null,
          left: !(
            isPosition4buffTablet ||
            isPosition3buffTablet ||
            isPosition3DesktopBuff
          )
            ? 0
            : null,
          ...additionalStyles,
        }}
      >
        {buffs.map((buff) => (
          <p className={styles.tipTextBuff} key={buff.id}>
            {buff.engName} +{buff.min}~{buff.max}
            {buff.valueType === "Percent" ? " %" : null}
          </p>
        ))}
      </div>
    );
  } else if (buffsInPack) {
    return (
      <div
        className={styles.tooltipContainerBuffPack}
        onMouseEnter={() => hoverOnBuff(buffsInPack)}
        onMouseLeave={() => hoverOnBuff()}
      >
        {buffsInPack.map((buff) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
              gap: 4,
            }}
          >
            <img src={buff.icon} style={{ width: 35 }} alt="buff-pack" />
            <p className={styles.tipTextBuff} key={buff.id}>
              {buff.engName} {buff.value}
              {buff.valueType === "Percent" ? " %" : null}
            </p>
          </div>
        ))}
      </div>
    );
  } else return null;
};

export default Tooltip;
