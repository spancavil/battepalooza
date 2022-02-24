import React from "react";
import Loader from "../../../../Global-Components/Loader";
import styles from "./styles.module.scss";

const Nft = ({ nft, tilts, index }) => {
  console.log(nft);
  return (
    <div ref={tilts[index]} className={styles.cardNft} key={nft.itemId}>
      {/* El source luego cambiara en base al asset */}
      <img className={styles.imgNft} src={nft.thumbnailUrl} alt="nft-thumb" />
      <div className={styles.texts}>
        <p>{nft.repName}</p>
        <p>{nft.itemName}</p>
        <p className={styles.text2}>{nft.rarity}</p>
        {/* <p>#{nft.itemId}</p> */}
        <p>
          gNCoin Battle Count: {nft.playCount}/{nft.maxPlayCount}
        </p>
        {nft.salesState === 1 && (
          <p className={styles.price}>{nft.price} NCoin</p>
        )}
      </div>
    </div>
  );
};

export default Nft;

{
  /* <Link
style={{textDecoration: 'none', overflow: 'visible'}}
to={`/marketplace/${nft.uniqueId}-${nft.sellerPid}`}
key={nft.uniqueId}
>
    <div className={styles.cardNft} key={nft.uniqueId} 
    onMouseEnter={()=>setFlagVideo(true)} 
    onMouseLeave ={()=> setFlagVideo(false)}>
        <div className={styles.videoContainer}>
            {flagVideo ? 
                nft.movieUrl?
                <>
                    {loading && (
                    <div className={styles.loadMessageContainer}>
                        <Loader />
                    </div>
                    )} 
                    <video
                    onCanPlayThrough={()=>setLoading(false)}
                    className={styles.pinVideo}
                    src={nft.movieUrl}
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
            :
            <img
            className={styles.imgNft}
            src={nft.thumbnailUrl}
            alt="nft"
            />
            }
        </div>
        
        <div className={styles.texts}>
            <p>{nft.itemName}</p>
            <p className={styles.text2}>{nft.rarity}</p>
            <p>#{nft.serial}</p>
            <p className={styles.price}>{nft.price} NCoin</p>
        </div>
    </div>
</Link> */
}
