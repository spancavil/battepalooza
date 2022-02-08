import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../../Global-Components/Loader';
import styles from './styles.module.scss';

const Nft = (nft) => {

    const [flagVideo, setFlagVideo] = useState(false);
    const [loading, setLoading] = useState(false);

    /* const handleLoading = (e) => {
        console.log(e);
        console.log("Cargando...");
    }

    const handleLoaded = (e) => {
        console.log(e);
        console.log("Cargó!");
    } */

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <Link
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
                    {/* La idea es que si está cargando aparezca el loader POR ENCIMA del video que aún no cargó */}
                <div className={styles.texts}>
                    <p>{nft.itemName}</p>
                    <p className={styles.text2}>{nft.rarity}</p>
                    <p>#{nft.serial}</p>
                    <p className={styles.price}>{nft.price} NCoin</p>
                </div>
            </div>
        </Link>
    )
}

export default Nft
