import styles from "./styles.module.scss";

const SemiFrame = ({ rarity, sizeY = "186px", sizeX = "236px" }) => {
  const frameColorsVertical = {
    common: `${sizeY} solid #ECEBEB`,
    rare: `${sizeY} solid #33F754`,
    epic: `${sizeY} solid #65C1FC`,
    legendary: `${sizeY} solid #E379FB`,
  };

  const frameColorsHorizontal = {
    common: `${sizeX} solid #ECEBEB`,
    rare: `${sizeX} solid #33F754`,
    epic: `${sizeX} solid #65C1FC`,
    legendary: `${sizeX} solid #E379FB`,
  };

  return (
    <div className={styles.trianglesContainer}>
      <div
        className={styles.verticalTriangle}
        style={{
          borderTop: frameColorsVertical[rarity.toLowerCase()],
        }}
      />
      <div
        className={styles.horizontalTriangle}
        style={{
          borderLeft: frameColorsHorizontal[rarity.toLowerCase()],
        }}
      />
    </div>
  );
};

export default SemiFrame;
