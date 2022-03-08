import styles from "./styles.module.scss";

const Tokenomics = () => {
  return (
    <div className={styles.tokenomicsContainer}>
      <h2>WHAT´S XXXXX COIN</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac non dolor
        leo posuere suspendisse a id.
      </p>
      <div className={styles.tokenomics}>
        <div className={styles.rectangle}></div>
        <div className={styles.circle}></div>
        <div className={styles.rectangleContainer}>
          <div className={styles.rectangle}></div>
          <div className={styles.rectangle}></div>
          <div className={styles.rectangle}></div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
