import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Background from "../../Global-Components/Background";
import styles from "./styles.module.scss";
// import { dropsList } from '../../Services/dropList';
import { useHistory } from "react-router-dom";
import NftCard from "./components/NftCard";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import { logOutAmplitude } from "../../Utils/amplitude";
import dropService from "../../Services/drop.service";

import heroBannerImage from "../../Assets/img/dropHeroBg.png";
import heroBannerImageMobile from '../../Assets/img/bg-drop-mobile.png';
import { UserData } from "../../Context/UserProvider";
import NftDetail from "./components/NftDetail";
import Checkout from "./components/Checkout";
import Proccesing from "./components/Proccesing";
import Complete from "./components/Complete";
import { NftData } from "../../Context/NftProvider";
import { getDaysMinutesSeconds } from "../../Utils/createDate";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

const DropDetail = () => {
  const [dropSelected, setDropSelected] = useState();
  const [chosenNft, setChosenNft] = useState();

  const [checkout, setCheckout] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [buyComplete, setBuyComplete] = useState(false);
  const [timerRelease, setTimerRelease] = useState({ message: "", state: "" });

  const { id } = useParams();
  const history = useHistory();

  const { userData } = useContext(UserData);
  const { setReloadDrops, setReloadCollection } = useContext(NftData);

  const divHero = useRef();

  const mobile = useMediaQuery('(max-width: 991px)');

  //Set background with useRef
  useEffect(() => {
    if (dropSelected) {
      divHero.current.style.background = mobile ? `url(${heroBannerImageMobile})` : `url(${heroBannerImage})`;
      divHero.current.style.backgroundSize = "cover";
    }
  }, [divHero, dropSelected, mobile]);

  useEffect(() => {
    let intervalTimer;
    const fetchData = async () => {
      try {
        const dropDetail = await dropService.getDropDetail(
          userData?.pid ? userData.pid : "",
          parseInt(id)
        );

        if (dropDetail.error.text !== "") {
          if (dropDetail.error.text.includes("authorized")) {
            fireAlertAsync("Session expired, please login again.").then(() => {
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            });
          } else {
            fireAlertAsync("Oops an error ocurred", dropDetail.error.text);
          }
        } else {
          setDropSelected(dropDetail);
          //Sandbox
          // const {message, state} = getDaysMinutesSeconds(Date.now() + 2016000010, Date.now() + 172800000);
          intervalTimer = setInterval(() => {
            const date = getDaysMinutesSeconds(dropDetail.dropInfo.startTime, dropDetail.dropInfo.endTime)
            const { message, state } = date;
            console.log(message, state)
            setTimerRelease({ message, state });
            if (state !== ("active" || "willBeActive")) clearInterval(intervalTimer);
          }, 1000
          )
        }
      } catch (error) {
        fireAlertAsync(error.message);
      }
    };

    fetchData();

    return () => {
      console.log("Unmounted Drop Detail");
      clearInterval(intervalTimer)
    }
  }, [setDropSelected, userData, history, id]);

  const showNft = (nft) => {
    setChosenNft(nft);
  }

  const handleBuy = () => {
    setCheckout(true);
  };

  const processingComplete = () => {
    setCheckout(false);
    setProcessing(false);
    setBuyComplete(true);
  };

  const handleCloseComplete = (destiny) => {
    setReloadDrops(value => !value)
    setReloadCollection(value => !value)
    if (destiny === 'collection') history.push(`/${destiny}`)
    else setBuyComplete(false)
  }

  console.log(chosenNft);
  // console.log(dropSelected)

  return (
    <Background>
      {dropSelected && !(chosenNft && mobile) && (
        <>
          <p className={styles.back} onClick={() => history.goBack()}>
            &#60; Go back
          </p>
          <div className={styles.container}>
            <div className={styles.rectangle}>
              <div className={styles.hero} ref={divHero}>
                {mobile && <img
                  src= {heroBannerImage}
                  style={{
                    width:'100%',
                    height: '273px',
                    objectFit: 'cover',
                  }}
                  alt="hero banner"
                />}
                <div className={styles.information}>
                  <h2 className={styles.release}>Release Date {new Date(dropSelected.dropInfo?.startTime).toLocaleDateString()}</h2>
                  <h2 className={styles.name}>{dropSelected.dropInfo?.name}</h2>
                  <h2 className={styles.timer}>{timerRelease.message}</h2>
                </div>
              </div>
              <div className={styles.olderTitle}>
                <h3 className={styles.older}>What is in this drop?</h3>
              </div>

              <div className={styles.nftsContainer}>
                {dropSelected?.nftProducts?.map((nft) => {
                  return <NftCard nft={nft} key={nft.id} showNft={showNft} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {chosenNft &&
        <NftDetail
          chosenNft={chosenNft}
          confirmBuy={handleBuy}
          handleClose={() => setChosenNft()}
          checkout={checkout}
          processing={processing}
          buyComplete={buyComplete}
        />}
      {checkout &&
        <Checkout
          nftBuy={chosenNft}
          nftProccesing={setProcessing}
          handleClose={setCheckout}
        />}
      {processing &&
        <Proccesing nftBuy={chosenNft}
          processingComplete={processingComplete}
          handleClose={() => setProcessing(false)} />}
      {buyComplete &&
        <Complete
          title={chosenNft.itemName}
          goCollection={() => handleCloseComplete('collection')}
          closeComplete={() => handleCloseComplete('')}
        />}
    </Background>
  );
};

export default DropDetail;
