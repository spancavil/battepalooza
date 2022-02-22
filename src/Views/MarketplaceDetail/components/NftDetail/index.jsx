import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";
import Button from "../../../../Global-Components/Button";
import { useParams, useHistory } from "react-router";
import marketService from "../../../../Services/market.service";
import Loader from "../../../../Global-Components/Loader";
import { logOutAmplitude, sendAmplitudeData } from "../../../../Utils/amplitude";
import { UserData } from "../../../../Context/UserProvider";
import fireToast, { fireAlertAsync } from "../../../../Utils/sweetAlert2";

const NftDetail = ({ nfts, setNft, setNftListing }) => {
  const history = useHistory();

  const { nftId } = useParams();
  let nftSplitted = nftId.split("-");
  const uid = nftSplitted[0];
  const seller = nftSplitted[1];

  const [chosenNft, setChosenNft] = useState({});
  const [loading, setLoading] = useState(false);

  const { userData } = useContext(UserData);

  useEffect(() => {
    (async () => {
      const response = await marketService.getNftMarketplaceDetail(seller, uid);
      if (response.error.text !== "") {
        if (response.error.text.includes("authorized")) {
          fireAlertAsync("Warning", "Session expired, please login again.")
          .then (()=> {
            localStorage.removeItem("userBP");
            logOutAmplitude();
            history.push("/");
            window.location.reload();
          })
        } else {
          fireAlertAsync(response.error.text)
          .then(()=> {
            history.push("/");
          })
        }
      }

      setChosenNft(response.product);
    })();
  }, [uid, seller, history]);

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleBuy = () => {
    if (Object.keys(userData).length !== 0) {
      setNft(chosenNft);
      sendAmplitudeData("Buy request Marketplace")
    }else {
      fireToast("Need login", 1200, "300px");
    }
  };

  const handleList = () => {
    ("Click on list");
    setNftListing(chosenNft);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Marketplace
      </p>

      <div className={styles.card}>
        <div className={styles.text}>
          <div className={styles.cardContainer}>
            <div className={styles.topContainer}>
              <div className={styles.videoContainer}>
                {chosenNft?.rarity !== undefined && (
                  <>
                    {loading && (
                      <div className={styles.loadMessageContainer}>
                        <Loader />
                      </div>
                    )}
                    <video
                      onCanPlayThrough={() => setLoading(false)}
                      className={styles.pinVideo}
                      src={chosenNft.movieUrl}
                      muted
                      autoPlay
                      loop
                    />
                  </>
                )}
              </div>
              <div className={styles.topRightContainer}>
                <div className={styles.cont1}>
                  <div className={styles.cont2}>
                    <div className={styles.cont2a}>
                      <p className={styles.priceTitle}>Price:</p>
                      <p className={styles.price}>{chosenNft.price} NCoin</p>
                      <div className={styles.feeCont}>
                        <p className={styles.feeTitle}>Fee:</p>
                        <p className={styles.fee}>{chosenNft.fee}</p>
                        <p>NCoin</p>
                      </div>
                    </div>
                    <div className={styles.cont2b}>
                      <p className={styles.soldbyTitle}>Sold by:</p>
                      <div className={styles.soldbyCont}>
                        <p className={styles.soldby}>{chosenNft.sellerName}</p>
                        <p className={styles.soldbyPID}>
                          #{chosenNft.sellerPid}
                        </p>
                      </div>
                    </div>
                    <div className={styles.cont2c}>
                      <Button onClick={handleBuy} width={'200px'} title={'BUY'} />
                      <Button onClick={handleList} width={'200px'} title={'LISTING'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottomContainer}>
              <div className={styles.bottomLeftContainer}>
                <div className={styles.item}>
                  <p className={styles.itemName}>{chosenNft.itemName}</p>
                  <p className={styles.repName}>[ {chosenNft.repName} ]</p>
                </div>

                <div>
                  <p className={styles.rarity}>Rarity: {chosenNft.rarity}</p>
                </div>
              </div>
              <div className={styles.button}>
                <div> {/* {chosenNft.price} */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetail;
