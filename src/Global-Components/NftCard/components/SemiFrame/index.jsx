import React from "react";
import styles from "./styles.module.scss";

const SemiFrame = ({ rarity }) => {

    const frameColorsVertical = {
        common: `186px solid rgba(217, 217, 217, 1)`,
        rare: `186px solid rgba(249, 239, 183, 1)`,
        epic: `186px solid rgba(41, 89, 247, 1)`,
        legendary: `186px solid rgba(199, 41, 247, 1)`,
    };

    const frameColorsHorizontal = {
        common: `236px solid rgba(217, 217, 217, 1)`,
        rare: `236px solid rgba(249, 239, 183, 1)`,
        epic: `236px solid rgba(41, 89, 247, 1)`,
        legendary: `236px solid rgba(199, 41, 247, 1)`,
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
            ></div>
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
            ></div>
        </div>
    );
};

export default SemiFrame;
