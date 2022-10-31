import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ButtonRounded from "../ButtonRounded";
import CardToReveal from "./components/CardToReveal";
import styles from './styles.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from "../../Hooks/useMediaQuery";

const CarouselPacks = ({ nfts }) => {
    const [reveal, setReveal] = useState(false);
    const [countReveal, setCountReveal] = useState(0);
    const history = useHistory();

    const tablet = useMediaQuery('(max-width: 767px)')
    const hd = useMediaQuery('(min-width: 1900px)')

    //Carousel states
    const [swipeable, setSwipeable] = useState(false);
    const [canMove, setCanMove] = useState(false);
    const [ended, setEnded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // const testArray = [1,2,3]

    const handleReveal = () => {
        setReveal(true);
    };

    const childReveal = () => {
        setCountReveal(countReveal + 1);
    };

    const goCollection = () => {
        history.push("/collection");
    };

    const onChangeCarouselItem = (currentIndex) => {
        setCurrentIndex(currentIndex)
        if ((currentIndex + 1) === nfts.length) {
            setCanMove(true)
        } else if (!ended) {
            setCanMove(false)
        }
    }

    useEffect(()=> {
        if (ended) {
            setTimeout(()=> {
                setSwipeable(true)
            }, 1600)
        }
    }, [ended])

    return (
        <div className={styles.carouselContainer}>
            <Carousel
                swipeable={swipeable}
                emulateTouch={true}
                width ={tablet ? '90vw' : hd ? '800' : 400}
                dynamicHeight ={false}
                showThumbs = {false}
                showIndicators = {false}
                showStatus = {false}
                showArrows = {canMove}
                useKeyboardArrows={false}
                onChange={onChangeCarouselItem}
                transitionTime={400}
                renderArrowPrev={(onClick)=> (!ended || currentIndex === 0) ?
                    null
                    : 
                    <button onClick={onClick} className="control-arrow control-prev"></button>}
            >
                {nfts.map((nft, index) => {
                    return (
                        <CardToReveal
                            nftLengthList = {nfts?.length}
                            nftIndex = {index}
                            setEnded = {setEnded}
                            isRotated={ swipeable ? true : false}
                            key={nft.uuid}
                            nft={nft}
                            reveal={reveal}
                            isRevealed={childReveal}
                            setCanMove={setCanMove}
                        />
                    );
                })}
                {/* {testArray.map((item)=>{
                    return <div style={{
                        width: 300,
                        height: 400,
                        backgroundColor: "salmon",
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3
                    }}>
                        <h2>{item}</h2>
                        <img width={"100%"}src="https://imgs.search.brave.com/qUDJ3Wk3iGmb_tiZPyb0FxiOOSQI_DGVZdR08wUYFAA/rs:fit:768:842:1/g:ce/aHR0cHM6Ly93d3cu/Z29kdGFpbC5qcC93/cC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8wNi9FWjJDRE40/VThBRXlKWEstNzY4/eDg0Mi5qcGVn"/>
                    </div>
                })} */}
            </Carousel>
            <div className={styles.buttonContainer}>
                {!(reveal || countReveal === nfts?.length) ? (
                    <ButtonRounded title="REVEAL ALL" onClick={handleReveal} />
                ) : (
                    <ButtonRounded title="COLLECTION" onClick={goCollection} />
                )}
            </div>
        </div>
    );
};

export default CarouselPacks;
