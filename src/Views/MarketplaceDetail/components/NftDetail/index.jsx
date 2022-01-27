import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';
import {useParams, useHistory} from 'react-router';

const NftDetail = ({nfts, setNft, setNftListing}) => {

  const history = useHistory()
  const {nftId} = useParams ();
  const [chosenNft, setChosenNft] = useState ([]);

  useEffect (
    () => {
      const chosen = nfts.find (nft => nft.id === parseInt(nftId));
      setChosenNft (chosen);
    },
    [nftId, nfts]
  );

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
  return (
    <>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Marketplace
      </p>
      {chosenNft.length !== 0
        ? <div className={styles.detailContainer}>
            <div className={styles.videoContainer}>
              <video
                className={styles.pinVideo}
                src={chosenNft.source.default}
                muted
                autoPlay
                loop
              />
            </div>

            <div className={styles.detailDescription}>
              <h2 className={styles.title}>
                {chosenNft.title1} <br /> {chosenNft.title2}
              </h2>
              <span className={styles.seller}>
                Sold by <span className={styles.sellerYellow}>{chosenNft.seller}</span>
              </span>
              <p className={styles.title}>
                Price <span className={styles.price}>{chosenNft.price} NCoin </span>
              </p>
              <span className={styles.seller}>
                Lowest price {chosenNft.lowestPrice}
                <br />
                Highest price {chosenNft.highestPrice}
              </span>
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
