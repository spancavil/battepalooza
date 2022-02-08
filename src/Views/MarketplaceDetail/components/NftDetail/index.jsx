import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';
import {useParams, useHistory} from 'react-router';
import marketService from '../../../../Services/market.service';
import Loader from '../../../../Global-Components/Loader';
import { logOutAmplitude } from '../../../../Utils/amplitude';

const NftDetail = ({nfts, setNft, setNftListing}) => {

  const history = useHistory()

  const {nftId} = useParams ();
  let nftSplitted = nftId.split("-");
  const uid = nftSplitted[0];
  const seller = nftSplitted[1];

  console.log(uid, seller);

  const [chosenNft, setChosenNft] = useState ({});
  const [loading, setLoading] = useState(false);

  useEffect (
    () => {

      (async ()=> {
        
        const response = await marketService.getNftMarketplaceDetail(seller, uid);
        if (response.error.text !== "") {
          if (response.error.text.includes("authorized")) {
            alert("Session expired, please login again.");
            localStorage.removeItem("userBP");
            logOutAmplitude();
            history.push("/");
            window.location.reload();
          } else {
            alert(response.error.text);
            history.push("/");
            window.location.reload();
          }
        }

        setChosenNft (response.product);
      })()

    },
    [uid, seller, history]
  );

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleBuy = () => {
    setNft (chosenNft);
  };

  const handleList = () => {
     ('Click on list');
    setNftListing(chosenNft);
  };

  const goBack = () => {
    history.goBack ();
  };

  console.log(chosenNft);

  return (
    <>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Marketplace
      </p>
      {chosenNft?.rarity !== undefined ? 
      <div className={styles.detailContainer}>
            <div className={styles.videoContainer}>
            {chosenNft.movieUrl ?
              <>
              {loading && (
                <div className={styles.loadMessageContainer}>
                  <Loader/>
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
              :
              <div className={styles.loadMessageContainer}>
                <h2 className={styles.loadMessage}>
                  No video for this NFT
                </h2>
              </div>
            }
            </div>

            <div className={styles.detailDescription}>
              <h2 className={styles.title}>
                {chosenNft.itemName} <br /> {chosenNft.repName}
              </h2>
              <h2 className={styles.seller}>
                {chosenNft.rarity}
              </h2>
              <span className={styles.seller}>
                Sold by <span className={styles.sellerYellow}>{chosenNft.sellerPid}</span>
              </span>
              <p className={styles.title}>
                Price <span className={styles.price}>{chosenNft.price} NCoin </span>
              </p>
              {/* <span className={styles.seller}>
                Lowest price {chosenNft.lowestPrice}
                <br />
                Highest price {chosenNft.highestPrice}
              </span> */}
              <div className={styles.buttonsContainer}>
                <Button title="Buy" onClick={() => handleBuy ()} />
                <Button title="Listing" onClick={() => handleList ()} />
              </div>
            </div>
          </div>
        : null}
    </>
  );
};

export default NftDetail;
