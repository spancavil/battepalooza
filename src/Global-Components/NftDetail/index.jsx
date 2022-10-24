import { Link } from "react-router-dom";

import Loader from "../Loader";
import Stats from "./components/Stats";
import P2eInfo from "./components/P2eInfo";
import Abilities from "./components/Abilities";
import Description from "./components/Description";

import styles from "./styles.module.scss";

const NftDetail = ({ chosenNft, goBack, onRegister, unRegister, buyNft }) => {
  return (
    <>
      <div className={styles.nftDetailPage}>
        <Link className={styles.goBackToMarket} to={goBack}>
          &lt; Go back
        </Link>
        {chosenNft?.thumbnailUrl ? (
          <div className={styles.nft}>
            <div className={styles.nftImg}>
              {/* <img src={chosenNft?.thumbnailUrl} alt={chosenNft?.itemName} /> */}
              <video
                src={chosenNft?.movieUrl}
                alt={chosenNft?.itemName}
                muted
                autoPlay
                loop
              />
            </div>
            <div className={styles.nftData}>
              <Description 
                chosenNft={chosenNft} 
                register={onRegister} 
                unRegister={unRegister}
                buyNft={buyNft}
              />
              {chosenNft?.type === 1 && <Stats chosenNft={chosenNft} />}
              <Abilities chosenNft={chosenNft} />
              <P2eInfo chosenNft={chosenNft} />
            </div>
          </div>
        ) : (
          <div className={styles.loadingContainer}>
            <Loader />
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default NftDetail;
