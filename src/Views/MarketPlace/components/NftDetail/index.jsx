import React from 'react';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';

const NftDetail = () => {

    const nft = {
        title1: "Rare Skin for Letti",
        title2: "Can be used in Battlepalooza",
        seller: "Jane#7894",
        price: 2000,
        lowestPrice: 1900,
        highestPrice: 50000,
        source: require('../../Assets/VideosNft/Videos/Characters/Letti/Tronrider_Rare_1.mp4')
    }

    const handleBuy = () => {
        console.log("Click on buy");
    }

    const handleList = () => {
        console.log("Click on list");
    }

    console.log(nft.source)
    return (
        <div className={styles.detailContainer}>
            <div className={styles.videoContainer}>
                <video
                className={styles.pinVideo}
                src = {nft.source.default}
                muted
                autoPlay
                loop
                />
            </div>

            <div className={styles.detailDescription}>
                <h2 className={styles.title}>{nft.title1} <br/> {nft.title2}</h2>
                <span className={styles.seller}>Sold by <span className={styles.sellerYellow}>{nft.seller}</span></span>
                <p className={styles.title}>Price: <span className={styles.price}>{nft.price}</span> NCoin</p>
                <span className={styles.seller}>Lowest price: {nft.lowestPrice}<br/>Highest price: {nft.highestPrice}</span>
                <div className={styles.buttonsContainer}>
                    <Button title="Buy" onClick={()=>handleBuy()}/>
                    <Button title="Listing" onClick={()=>handleList()}/>
                </div>
            </div>
        </div>

    )
}

export default NftDetail
