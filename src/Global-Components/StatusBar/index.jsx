import React from "react";
import styles from "./styles.module.scss";

function StatusBar({ color, value, maxValue }) {
  const colors = {
    red: "#FF0000",
    redDark: "#BD0606",
    green: "#36FF00",
    greenDark: "#219E00",
    yellow: "#FFF700",
    yellowDark: "#A49E00",
  };

  let width = `${Math.round((value / maxValue) * 100)}%`;
  const ratio = value / maxValue;
  if (ratio === 1) {
    width = `calc(${Math.round((value / maxValue) * 100)}% - 6px)`;
  }

  return (
    <div className={styles.mainBar}>
      <div
        className={styles.internalTopBar}
        style={{
          backgroundColor:
            color === "red"
              ? colors.red
              : color === "yellow"
              ? colors.yellow
              : colors.green,
          width,
          borderTopRightRadius: ratio > 0.95 ? "20px" : null,
        }}
      ></div>
      <div
        className={styles.internalBottomBar}
        style={{
          backgroundColor:
            color === "red"
              ? colors.redDark
              : color === "yellow"
              ? colors.yellowDark
              : colors.greenDark,
          width,
          borderBottomRightRadius: ratio > 0.95 ? "20px" : null,
        }}
      ></div>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export default StatusBar;
