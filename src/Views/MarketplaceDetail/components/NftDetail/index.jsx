import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';
import { useParams } from 'react-router';
import { nfts } from '../../Assets/nftlist';

const NftDetail = () => {

    const {nftId} = useParams();
    const [nft, setNft] = useState ([]);

    useEffect(()=> {
        console.log(nftId);
        console.log(nfts);
        const chosen = nfts.find(nft => nft.id === parseInt(nftId));
        console.log(chosen);
        setNft(chosen);

    }, [nftId])


    const handleBuy = () => {
        console.log(`Click on buy ${nftId}`);
    }

    const handleList = () => {
        console.log("Click on list");
    }

    console.log(nft);

    return (
        <>
        {nft.length !== 0 ?
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
            :
            null
        }
        </>
    )
}

export default NftDetail
