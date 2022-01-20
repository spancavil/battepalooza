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
        to={`/marketplace/${nft.id}`}
        key={nft.id}
        >
            <div className={styles.cardNft} key={nft.id} 
            onMouseEnter={()=>setFlagVideo(true)} 
            onMouseLeave ={()=> setFlagVideo(false)}>
                {flagVideo ? 
                <div className={styles.videoContainer}>
                    {/* La idea es que si está cargando aparezca el loader POR ENCIMA del video que aún no cargó */}
                    {loading && (
                    <div className={styles.loadMessageContainer}>
                        <Loader />
                    </div>
                    )
                    }
                    <video
                    onCanPlayThrough={()=>setLoading(false)}
                    className={styles.pinVideo}
                    src={nft.source.default}
                    muted
                    autoPlay
                    loop
                    />
                </div>
                :
                <img
                className={styles.imgNft}
                src={nft.imgSrc.default}
                alt="nft"
                />
                }
                <div className={styles.texts}>
                    <p>{nft.title1}</p>
                    <p className={styles.text2}>{nft.rare}</p>
                    <p>#{nft.id}</p>
                    <p className={styles.price}>{nft.price} NCoin</p>
                </div>
            </div>
        </Link>
    )
}

export default Nft
