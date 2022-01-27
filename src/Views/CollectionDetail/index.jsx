import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NftData } from "../../Context/NftProvider";
import { UserData } from "../../Context/UserProvider";
import Background from "../../Global-Components/Background";
import nftService from "../../Services/nft.service";
import styles from "./styles.module.scss";
// import defaultVideoCharacter from "../../Services/Videos/Characters/CyborgTed/DarkMax_Epic_1.mp4";
// import defaultVideoWeapon from "../../Services/Videos/Weapons/Hammer/hellGreen.mp4";
import { logOutAmplitude } from "../../Utils/amplitude";
import Loader from "../../Global-Components/Loader";
import ModalUnregister from "./Components/ModalUnregister";
import ModalRegister1 from "./Components/ModalRegister1";
import ModalRegister2 from "./Components/ModalRegister2";

const CollectionDetail = () => {
  const [nftSelected, setNftSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [arrayBonus, setArrayBonus] = useState();
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false);
  const [modalRegister2, setmodalRegister2] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  const { userData } = useContext(UserData);
  const { setNftPrice, weaponMaxStats, characterMaxStats } = useContext(NftData);
  const { uuid } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(userData).length !== 0) {
        try {
          const response = await nftService.getNftCollectionDetail(
            userData.bpToken,
            userData.pid,
            uuid
          );

          //Logout en caso de error
          if (response.error.text !== "") {
            if (response.error.text.includes("authorized")) {
              alert("Session expired, please login again.");
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            } else {
              alert(response.error.text);
            }
          } else {
            setNftSelected(response.nft);
          }
        } catch (error) {
          alert(error.message);
        }
      }
    };
    userData.email && fetchData();
  }, [uuid, userData, history]);

  useEffect(() => {
    if (nftSelected) {
      const arrayBonus = Object.entries(nftSelected.buff[0]);
      setArrayBonus(arrayBonus);
    }
  }, [nftSelected, setArrayBonus]);

  const openModalUnregister = () => {
    setmodalUnregister(true);
  };
  const openModalRegister1 = () => {
    setmodalRegister1(true);
  };
  const goBack = () => {
    history.goBack();
  };
  const unRegister = () => {
    const sale = false;
    const user = "BOT";
    setNftPrice(nftSelected, inputPrice, user, sale);
    history.push("/collection");
  };
  const Register = () => {
    if (inputPrice > 0) {
      const sale = true;
      // console.log(nftSelected, inputPrice, userData.pid, sale)
      const nftUpdated = setNftPrice(
        nftSelected,
        inputPrice,
        userData.pid,
        sale
      );
      setNftSelected(nftUpdated);
      setmodalRegister1(false);
      setmodalRegister2(true);
    } else {
      return;
    }
  };
  const handleMarket = () => {
    history.push("/marketplace");
  };
  const handleInputChange = (value) => {
    setInputPrice(value);
  };

  return (
    <Background>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Collection
      </p>
        <div className={styles.container}>
          {nftSelected &&
          <div className={styles.card}>
            <div className={styles.text}>

              {/* Card content */}
              <div className={styles.cardContainer}>
                <div className={styles.topContainer}>
                  <div className={styles.videoContainer}>
                    {nftSelected.movieUrl ? (
                      <>
                        {loading && (
                          <div className={styles.loadMessageContainer}>
                            <Loader />
                          </div>
                        )}
                        <video
                          onCanPlayThrough={() => setLoading(false)}
                          className={styles.pinVideo}
                          src={nftSelected.movieUrl}
                          muted
                          autoPlay
                          loop
                        />
                      </>
                    )
                      :
                      <h2 className={styles.loadMessage}>No video for this NFT</h2>
                    }
                  </div>
                  <div className={styles.topRightContainer}>
                    <div className={styles.cont1}>
                      <div className={styles.cont2}>
                        <div className={styles.cont2a}>
                          <div className={styles.abilities}>
                            <p className={styles.title}>Abilities</p>
                            <span className={styles.featuresContainer}>
                              {nftSelected.ability.features.map((x, i) => (
                                <p key={i} className={styles.features}>
                                  {x} &nbsp;
                                </p>
                              ))}
                            </span>
                            <p className={styles.abilityText}>
                              :{nftSelected.ability.text}
                            </p>
                          </div>
                          <div>
                            <p className={styles.title}>Skill</p>
                          </div>
                        </div>
                        <div className={styles.cont2b}>
                          <p className={styles.title}>Character Story</p>
                        </div>
                      </div>
                      <div>
                        <p className={styles.title}>Stat</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.bottomContainer}>
                  <div className={styles.bottomLeftContainer}>
                    <div className={styles.item}>
                      <p className={styles.itemName}>{nftSelected.itemName}</p>
                      <p className={styles.repName}>[ {nftSelected.repName} ]</p>
                      {nftSelected.salesState === 1 && <p className={styles.price}>Price {nftSelected.price} nCoin</p>}
                    </div>

                    <div className={styles.rarity}>
                      <p>Rarity: {nftSelected.rarity}</p>
                    </div>
                  </div>
                  {
                    nftSelected.salesState === 1 ?
                      <div className={styles.button}>
                        <button onClick={openModalUnregister}>Unregister to marketplace</button>
                      </div>
                      :
                      <div className={styles.button}>
                        <button onClick={openModalRegister1}>Register to marketplace</button>
                      </div>
                  }
                </div>
              </div>

            </div>
          </div>}
          {modalUnregister && (
            <ModalUnregister setmodalUnregister={setmodalUnregister} unRegister={unRegister} />
          )}
          {modalRegister1 && (
            <ModalRegister1
              setmodalRegister1={setmodalRegister1}
              handleInputChange={handleInputChange}
              Register={Register}
              inputPrice={inputPrice}
            />
          )}
          {modalRegister2 && (
            <ModalRegister2
              setmodalRegister2={setmodalRegister2}
              handleMarket={handleMarket}
            />
          )}
        </div>
    </Background>
  );
};

export default CollectionDetail;
