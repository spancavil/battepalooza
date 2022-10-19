import React from "react";
import styles from "./styles.module.scss";

const SemiFrame = ({ rarity }) => {
    const frameColors = {
        common: "250px solid rgba(217, 217, 217, 1)",
        rare: "250px solid rgba(249, 239, 183, 1)",
        epic: "250px solid rgba(41, 89, 247, 1)",
        legendary: "250px solid rgba(199, 41, 247, 1)",
    };

    return (
        <div className={styles.trianglesContainer}>
            <div
                className={styles.verticalTriangle}
                style={{
                    borderTop:
                        rarity === "Common"
                            ? frameColors.common
                            : rarity === "Rare"
                            ? frameColors.rare
                            : rarity === "Epic"
                            ? frameColors.epic
                            : frameColors.legendary,
                }}
            ></div>
            <div
                className={styles.horizontalTriangle}
                style={{
                    borderLeft:
                        rarity === "Common"
                            ? frameColors.common
                            : rarity === "Rare"
                            ? frameColors.rare
                            : rarity === "Epic"
                            ? frameColors.epic
                            : frameColors.legendary,
                }}
            ></div>
        </div>
    );
};

export default SemiFrame;
