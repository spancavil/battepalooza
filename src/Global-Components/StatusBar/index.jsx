import React from 'react';
import styles from './styles.module.scss';

function StatusBar({ color, value, maxValue }) {

    const colors = {
        red: "#FF0000",
        redDark: "#BD0606",
        green: "#36FF00",
        greenDark: "#219E00",
        yellow: "#FFF700",
        yellowDark: "#A49E00",
    }

    const width = `${Math.round(value / maxValue * 100)}%`;

    return (
        <div className={styles.mainBar}>
            <div className={styles.internalTopBar} style={{
                backgroundColor: color === "red" ? colors.red: color === "yellow" ? colors.yellow: colors.green,
                width
            }}></div>
            <div className={styles.internalBottomBar} style={{
                backgroundColor: color === "red" ? colors.redDark: color === "yellow" ? colors.yellowDark: colors.greenDark,
                width
            }}></div>
        </div>
    )
}

export default StatusBar