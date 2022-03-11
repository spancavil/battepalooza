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
import { UserData } from "../../Context/UserProvider";
import NftDetail from "./components/NftDetail";

const DropDetail = () => {
  const [dropSelected, setDropSelected] = useState();
  const [chosenNft, setChosenNft] = useState();

  const { id } = useParams();
  const history = useHistory();

  const { userData } = useContext(UserData);

  const divHero = useRef();

  //Set background with useRef
  useEffect(() => {
    if (dropSelected) {
      divHero.current.style.background = `url(${heroBannerImage})`;
      divHero.current.style.backgroundSize = "cover";
    }
  }, [divHero, dropSelected]);

  useEffect(() => {
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
        }
      } catch (error) {
        fireAlertAsync(error.message);
      }
    };

    fetchData();
  }, [setDropSelected, userData, history, id]);

  const showNft = (nft) => {
    setChosenNft(nft);
  }

  const handleBuy = (nft) => {
    console.log("confirmo compra");
  }

  return (
    <Background>
      {dropSelected ? (
        <>
          <p className={styles.back} onClick={() => history.goBack()}>
            &#60; Go back
          </p>
          <div className={styles.container}>
            <p className={styles.title}>Drop Detail</p>
            <div className={styles.rectangle}>
              <div className={styles.hero} ref={divHero}>
                <div className={styles.information}>
                  <h2 className={styles.release}>Release Date</h2>
                  <h2 className={styles.name}>Battlepalooza Series 1 Drop 1</h2>
                </div>
              </div>
              <div className={styles.olderTitle}>
                <h3 className={styles.older}>What is in this drop?</h3>
              </div>

              <div className={styles.nftsContainer}>
                {dropSelected?.nftProducts?.map((nft) => {
                  return <NftCard nft={nft} key={nft.id} showNft={showNft}/>;
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
      {chosenNft && <NftDetail chosenNft={chosenNft} confirmBuy={handleBuy} handleClose={()=> setChosenNft()}/>}

    </Background>
  );
};

export default DropDetail;
