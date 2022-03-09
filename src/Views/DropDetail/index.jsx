import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Background from "../../Global-Components/Background";
import Button from "../../Global-Components/Button";
import styles from "./styles.module.scss";
// import { dropsList } from '../../Services/dropList';
import { useHistory } from "react-router-dom";
import Modal from "../../Global-Components/Modal";
import NftCard from "./components/NftCard";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import { logOutAmplitude } from "../../Utils/amplitude";
import dropService from "../../Services/drop.service";

import heroBannerImage from "../../Assets/img/dropHeroBg.png";
import { UserData } from "../../Context/UserProvider";

const DropDetail = () => {
  const [dropSelected, setDropSelected] = useState();
  const [open, setOpen] = useState(false);
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

  console.log(dropSelected);

  return (
    <Background>
      {dropSelected ? (
        <>
          <p className={styles.back} onClick={() => history.goBack()}>
            &#60; Go back
          </p>
          <div className={styles.container}>
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
                  return <NftCard nft={nft} key={nft.id} />;
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
      {open ? (
        <div className={styles.modalContainer}>
          <Modal handleClose={() => setOpen(!open)} title={"Checkout"}>
            <p className={styles.modalText}>
              Will you use 20.000 Ncoin to buy Rare Pack?
            </p>
            <Button title="BUY" />
            <p className={styles.chargeNow}>Not enough Ncoin? Charge now</p>
          </Modal>
        </div>
      ) : null}
    </Background>
  );
};

export default DropDetail;
