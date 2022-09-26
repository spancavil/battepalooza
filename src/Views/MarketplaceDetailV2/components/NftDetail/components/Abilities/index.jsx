import styles from "./styles.module.scss";

const Abilities = ({ chosenNft }) => {
  const BP_BASE_URL = process.env.REACT_APP_API_BATTLEPALOOZA;

  return (
    <div className={styles.abilities}>
      <h4>Abilities</h4>
      <p className={styles.description}>
        {chosenNft?.ability?.text}
      </p>
      <h4>Buff information</h4>
      <div className={styles.abilitiesItems}>
        {chosenNft?.premiumBuff?.map((ability) => (
          <div className={styles.item} key={ability.id}>
            <img src={BP_BASE_URL + ability.icon} alt={ability.buffType} />
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
