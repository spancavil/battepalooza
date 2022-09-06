import styles from "./styles.module.scss";

export const PackInfo = ({ pack }) => {
  console.log(pack);

  return (
    <div className={styles.packInfo}>
      <div className={styles.left}></div>
      <div className={styles.right}></div>
    </div>
  );
};
