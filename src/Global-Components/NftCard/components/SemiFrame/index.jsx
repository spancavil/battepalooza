import styles from "./styles.module.scss";

const SemiFrame = ({ rarity, size = "236px" }) => {
  const frameColorsVertical = {
    common: `${size} solid #EBEBEB`,
    rare: `${size} solid #33F754`,
    epic: `${size} solid #65C1FC`,
    legendary: `${size} solid #E379FB`,
  };

  const frameColorsHorizontal = {
    common: `${size} solid #EBEBEB`,
    rare: `${size} solid #33F754`,
    epic: `${size} solid #65C1FC`,
    legendary: `${size} solid #E379FB`,
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
