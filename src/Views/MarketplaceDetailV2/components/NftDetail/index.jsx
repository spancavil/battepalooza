import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import Description from "./components/Description";
import Stats from "./components/Stats";
import Abilities from "./components/Abilities";
import P2eInfo from "./components/P2eInfo";
import Generations from "./components/Generations";
import Loader from "../../../../Global-Components/Loader";

const NftDetail = ({ chosenNft, goBack }) => {
  return (
    <>
      <div className={styles.nftDetailPage}>
        <Link className={styles.goBackToMarket} to={goBack}>
          &lt; Go back
        </Link>
        {chosenNft?.thumbnailUrl ? (
          <div className={styles.nft}>
            <div className={styles.nftImg}>
              <img src={chosenNft?.thumbnailUrl} alt={chosenNft?.itemName} />
            </div>
            <div className={styles.nftData}>
              <Description chosenNft={chosenNft} />
              {chosenNft?.type === 1 && <Stats chosenNft={chosenNft} />}
              <Abilities chosenNft={chosenNft} />
              <P2eInfo chosenNft={chosenNft} />
              <Generations />
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
