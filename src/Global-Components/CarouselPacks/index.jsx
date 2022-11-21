import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ButtonRounded from "../ButtonRounded";
import CardToReveal from "./components/CardToReveal";
import styles from './styles.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import Arrow from "./components/Arrow/Arrow";

const CarouselPacks = ({ nfts }) => {
    const [revealAll, setRevealAll] = useState(false);
    const [countReveal, setCountReveal] = useState(0);
    const history = useHistory();

    const tablet = useMediaQuery('(max-width: 767px)')
    const hd = useMediaQuery('(min-width: 1900px)')

    //Carousel states
    const [swipeable, setSwipeable] = useState(false);
    const [ended, setEnded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0); //The active index of the carousel
    const [selectedItem, setSelectedItem] = useState(0); //The index of the selected item (will move to this index)

    // const testArray = [1,2,3]

    //If click on reveal all
    const onRevealAll = () => {
        setRevealAll(true);
        setEnded(true)
    };

    const childReveal = () => {
        setCountReveal(countReveal + 1);
        setTimeout(()=> {
            setSelectedItem(currentIndex + 1);
        }, 1800)
    };
    
    const goCollection = () => {
        history.push("/collection");
    };
    
    const onChangeCarouselItem = (currentIndex) => {
        setCurrentIndex(currentIndex)
    }
    
    //Swipeable when ended
    useEffect(()=> {
        if (ended) {
            setTimeout(()=> {
                setSwipeable(true)
            }, 1600)
        }
    }, [ended])

    const handleClickItem = (index, item) => {
        if (ended) {
            setSelectedItem(index)
        }
    }
    
    //Autoplay effect
/*     useEffect(()=> {
        if (countReveal !== 0 && countReveal !== nfts.length && !swipeable) {
            setTimeout(() => setAutoPlay(true), 1800)
        }
        // else setAutoPlay(false)
    }, [countReveal, nfts, swipeable]) */
    
    /* console.log(`Current index: ${currentIndex}`);
    console.log(`Count reveal: ${countReveal}`);
    console.log(`Autoplay: ${autoPlay}`);
    console.log(`Initial: ${initialNft}`);
    console.log(`Last: ${lastNft}`); */

    return (
        <>
            <div className={styles.carouselContainer}
            >
                <Carousel
                    swipeable={nfts.length < 4 ? (tablet ? swipeable : false) : swipeable}
                    emulateTouch={true}
                    width ={tablet ? '90vw' : hd ? '1200' : 900}
                    dynamicHeight ={false}
                    showThumbs = {false}
                    showIndicators = {false}
                    centerMode = {true}
                    centerSlidePercentage = {tablet ? 100 : nfts.length === 2 ? 50 : 33}
                    showStatus = {false}
                    showArrows = {nfts.length < 4 ? (tablet ? swipeable : false) : swipeable}
                    useKeyboardArrows={true}
                    onChange={(currentIndex) => onChangeCarouselItem (currentIndex)}
                    autoPlay={false}
                    selectedItem = {selectedItem}
                    onClickItem = {(index, item) => handleClickItem(index, item)}
                    interval = {0}
                    transitionTime={400}                    
                    renderArrowPrev={(clickHandler, hasPrev) => 
                        hasPrev && <Arrow 
                            onClick={clickHandler}
                            previous = {true}
                        />
                    }
                    renderArrowNext={(clickHandler, hasNext) => 
                        hasNext && <Arrow 
                            onClick={clickHandler}
                            previous = {false}
                        /> 
                    }
                >
                    {nfts.map((nft, index) => {
                        return (
                            <CardToReveal
                                nftLengthList = {nfts?.length}
                                nftIndex = {index}
                                carouselIndex = {currentIndex}
                                setEnded = {setEnded}
                                isRotated={ swipeable ? true : false}
                                key={nft.uuid}
                                nft={nft}
                                revealAll={revealAll}
                                isRevealed={childReveal}
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
            </div>
            <div className={styles.buttonContainer}>
                {!(revealAll || countReveal === nfts?.length) ? (
                    <ButtonRounded title="REVEAL ALL" onClick={onRevealAll} />
                ) : (
                    <ButtonRounded title="COLLECTION" onClick={goCollection} />
                )}
            </div>
        </>
    );
};

export default CarouselPacks;
