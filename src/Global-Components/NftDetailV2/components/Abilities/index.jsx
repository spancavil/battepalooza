import styles from "./styles.module.scss";

const Abilities = ({ chosenNft }) => {

  return (
    <div className={styles.abilities}>
      <h4>Abilities</h4>
      <div className={styles.description}>
        {chosenNft?.ability?.text &&
          chosenNft?.ability?.text
            .split("\\n")
            .map((texto, i) => <p key={i}>{texto}</p>)}
      </div>
      <h4>Buff information</h4>
      <div className={styles.abilitiesItems}>
        {chosenNft?.premiumBuff?.map((ability) => (
          <div className={styles.item} key={ability.id}>
            <img src={ability.icon} alt={ability.buffType} />
            <div className={styles.values}>
              <p>{ability.engName}</p>
              <span>+{ability.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Abilities;
