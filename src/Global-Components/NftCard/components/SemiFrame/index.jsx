import React from "react";
import styles from "./styles.module.scss";

const SemiFrame = ({ rarity, size = "236px" }) => {
  const frameColorsVertical = {
    common: `${size} solid rgba(217, 217, 217, 1)`,
    rare: `${size} solid rgba(249, 239, 183, 1)`,
    epic: `${size} solid rgba(41, 89, 247, 1)`,
    legendary: `${size} solid rgba(199, 41, 247, 1)`,
  };

  const frameColorsHorizontal = {
    common: `${size} solid rgba(217, 217, 217, 1)`,
    rare: `${size} solid rgba(249, 239, 183, 1)`,
    epic: `${size} solid rgba(41, 89, 247, 1)`,
    legendary: `${size} solid rgba(199, 41, 247, 1)`,
  };

  return (
    <div className={styles.trianglesContainer}>
      <div
        className={styles.verticalTriangle}
        style={{
          borderTop:
            rarity === "Common"
              ? frameColorsVertical.common
              : rarity === "Rare"
              ? frameColorsVertical.rare
              : rarity === "Epic"
              ? frameColorsVertical.epic
              : frameColorsVertical.legendary,
        }}
      />
      <div
        className={styles.horizontalTriangle}
        style={{
          borderLeft:
            rarity === "Common"
              ? frameColorsHorizontal.common
              : rarity === "Rare"
              ? frameColorsHorizontal.rare
              : rarity === "Epic"
              ? frameColorsHorizontal.epic
              : frameColorsHorizontal.legendary,
        }}
      />
    </div>
  );
};

export default SemiFrame;
