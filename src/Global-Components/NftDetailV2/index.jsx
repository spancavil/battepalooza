import { Link } from "react-router-dom";

import Loader from "../Loader";
import Stats from "./components/Stats";
import Abilities from "./components/Abilities";
import Description from "./components/Description";

import styles from "./styles.module.scss";
import BuyInfo from "./components/BuyInfo";

const NftDetailV2 = ({ chosenNft, goBack, onRegister, unRegister, buyNft }) => {
  return (
    <>
      <div className={styles.nftDetailPage}>
        <Link className={styles.goBack} to={goBack}>
          &lt; Go back
        </Link>
        {chosenNft?.thumbnailUrl ? (
          <div className={styles.nft}>
            <div className={styles.left}>
              <div className={styles.nftImg}>
                <video
                  src={chosenNft?.movieUrl}
                  alt={chosenNft?.itemName}
                  muted
                  autoPlay
                  loop
                />
              </div>
              <Description
                chosenNft={chosenNft}
                register={onRegister}
                unRegister={unRegister}
                buyNft={buyNft}
              />
            </div>
            <div className={styles.rigth}>
              <BuyInfo chosenNft={chosenNft} />
              <Abilities chosenNft={chosenNft} />
              {chosenNft?.type === 1 && <Stats chosenNft={chosenNft} />}
            </div>
          </div>
        ) : (
          <div className={styles.loadingContainer}>
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default NftDetailV2;
