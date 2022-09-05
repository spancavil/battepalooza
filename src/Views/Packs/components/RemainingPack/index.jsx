import { separator } from "../../../../Utils/separator";

import styles from "./styles.module.scss";

export const RemainingPack = ({ pack, onClick }) => {
  console.log({ pack });
  return (
    <div onClick={() => onClick(pack?.id)} className={styles.pack}>
      <div className={styles.imgContainer}>
        <img src={pack?.thumbnailUrl} alt="pack" />
      </div>
      <div className={styles.texts}>
        <h4>{pack?.packName}</h4>

        {pack?.detailTxt &&
          pack?.detailTxt.split("\\n").map((texto) => <p>{texto}</p>)}

        <span>{separator(pack?.price)} nCoin</span>
      </div>
    </div>
  );
};
