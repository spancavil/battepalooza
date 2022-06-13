import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NftData } from "../../Context/NftProvider";
import { UserData } from "../../Context/UserProvider";
import { logOutAmplitude, sendAmplitudeData } from "../../Utils/amplitude";
import Background from "../../Global-Components/Background";
import nftService from "../../Services/nft.service";
import styles from "./styles.module.scss";
import Loader from "../../Global-Components/Loader";
import ModalUnregister from "./Components/ModalUnregister";
import ModalRegister1 from "./Components/ModalRegister1";
import ModalRegister2 from "./Components/ModalRegister2";
import HP from "./Assets/Sprite_Icon_Stat_01.png";
import ENERGY from "./Assets/Sprite_Icon_Stat_02.png";
import SPEED from "./Assets/Sprite_Icon_Stat_04.png";
// import DAILY from "./Assets/Sprite_Icon_Reward_35.png";
import PREMIUM from "./Assets/Sprite_Icon_Premium_03.png";
import COPY from "./Assets/Sprite_Icon_Premium_05.png";
import SERIAL from "./Assets/Sprite_Icon_Premium_02.png";
// import BONUS from "./Assets/Sprite_Icon_Premium_04.png";
import fireToast, { fireAlert, fireAlertAsync } from "../../Utils/sweetAlert2";
import marketService from "../../Services/market.service";
import useModifyDetail from "../../Hooks/useModifyDetail";
import Button from "../../Global-Components/Button";
import PremiumModal from './Components/Premium';
import { useMediaQuery } from "../../Hooks/useMediaQuery";

const CollectionDetail = () => {
  const [nftSelectedRaw, setNftSelectedRaw] = useState();
  const [loading, setLoading] = useState(false);
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false);
  const [modalRegister2, setmodalRegister2] = useState(false);

  const [inputPrice, setInputPrice] = useState(0);
  const [forteTxText, setForteTxText] = useState("");
  const [position, setPosition] = useState({ positionX: '', positionY: '' })
  const [premium, setPremium] = useState(false)

  const { userData } = useContext(UserData);
  const { characterMaxStats, weaponMaxStats, nftMarket, setReloadMarket, setReloadCollection,
    nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic } =
    useContext(NftData);
  const { uuid } = useParams();
  const history = useHistory();

  const desktop = useMediaQuery('(min-width: 799px) and (max-width: 1199px)')
  const hd = useMediaQuery('(min-width: 1200px)')

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleShowPremium = (e) => {
    console.log(e);
    setPosition({
      positionY: e.nativeEvent.offsetY
    })
    setPremium(true)
  }

  //Modify data from JSON statics
  const nftSelected = useModifyDetail(nftSelectedRaw, nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic)
  console.log(nftSelected);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(userData).length !== 0) {
        try {
          const response = await nftService.getNftCollectionDetail(
            userData.bpToken,
            userData.pid,
            uuid
          );

          if (response.error.text !== "") {
            if (response.error.text.includes("authorized")) {
              fireAlertAsync("Session expired, please login again.")
                .then(() => {
                  localStorage.removeItem("userBP");
                  logOutAmplitude();
                  history.push("/");
                  window.location.reload();
                })
            } else {
              alert(response.error.text);
            }
          } else {
            setNftSelectedRaw(response.nft);
          }
        } catch (error) {
          alert(error.message);
        }
      }
    };
    userData.email && fetchData();
  }, [uuid, userData, history, modalRegister2]);

  const openModalUnregister = () => {
    setmodalUnregister(true);
  };

  const openModalRegister1 = () => {
    sendAmplitudeData("Collection place for sale request")
    setmodalRegister1(true);
  };

  const goBack = () => {
    history.goBack();
  };

  const Register = () => {

    if (Number(inputPrice) > 10000) {
      const registerNft = async () => {

        try {
          const response = await marketService.registerProductMarketplace(
            userData.pid,
            nftSelected.uuid,
            inputPrice,
            userData.bpToken,
          )

          if (response.error.text !== "") {
            if (response.error.text.includes("authorized")) {
              fireAlertAsync("Session expired, please login again.")
                .then(() => {
                  localStorage.removeItem("userBP");
                  logOutAmplitude();
                  history.push("/");
                  window.location.reload();
                })
            } else {
              fireAlert("Oops, an error ocurred", response.error.text, '500px');
            }
            //No errors, the forte transaction text id is returned. With that text
            //we call the transaction status in the next step (modal register 2)
          } else {
            sendAmplitudeData("Collection place for sale confirm")
            setForteTxText(response.forteTxId);
            setmodalRegister1(false);
            setmodalRegister2(true);
          }

        } catch (error) {
          fireAlert("Oops, an error ocurred", error.message, '500px');
        }

      }

      registerNft()

    } else {
      fireToast("Price should be greater than 10000", 3000, '500px', '22px')
      return;
    }
  };

  const confirmUnregister = () => {

    const unRegisterNft = async () => {
      try {
        //Necesitamos obtener el NFT del market porque de ahí sacamos el uniqueId de Forte
        const nftFromMarket = nftMarket.find(nft => nft.itemName === nftSelected.itemName && nft.sellerPid === userData.pid && nft.serial === nftSelected.serial)
        const response = await marketService.cancelSellingMarketplace(
          userData.pid,
          nftFromMarket.uniqueId,
          userData.bpToken,
        )

        if (response.error.text !== "") {
          if (response.error.text.includes("authorized")) {
            fireAlertAsync("Warning", "Session expired, please login again.").then(() => {
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            })
          } else {
            fireAlert("Oops, an error ocurred", response.error.text, '500px');
          }
          //No errors, the forte transaction text id is returned. With that text
          //we call the transaction status in the next step (modal register 2)
        } else {
          console.log(response);
          setForteTxText(response.forteTxId);
          setmodalUnregister(false);
          setmodalRegister2(true);
        }

      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, '500px');
      }

    }
    unRegisterNft()

  }

  const handleMarket = () => {
    setReloadMarket(value => !value)
    setReloadCollection(value => !value)
    history.push("/marketplace");
  };

  const handleInputChange = (value) => {
    setInputPrice(parseInt(value));
  };

  const handleShowClone = () => {
    console.log("show clone info");
  }

  return (
    <Background>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Collection
      </p>
      <div className={styles.container}>
        {Object.keys(nftSelected).length > 0 && (
          <div className={styles.card}>
            <div className={styles.text}>
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
                    ) : (
                      <h2 className={styles.loadMessage}>
                        No video for this NFT
                      </h2>
                    )}
                  </div>
                  <div className={styles.topRightContainer}>
                    <div className={styles.cont1}>
                      <div className={styles.cont2}>
                        <div className={styles.cont2a}>
                          <div
                            className={
                              nftSelected.type === 1
                                ? styles.cont3
                                : styles.cont3Weapon
                            }
                          >
                            <div className={styles.cont3a}>
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
                            <div className={styles.cont3b}>
                              <p className={styles.title}>Character Story</p>
                              <p className={styles.storyText}>
                                {nftSelected.storyText}
                              </p>
                              <Button
                                title="Premium buff"
                                onClick={handleShowPremium}
                                width={hd ? "240px" : desktop ? "200px" : "170px"}
                                style={{ margin: "10px 0 10px 10px" }}
                              />
                            </div>
                          </div>
                          {nftSelected.skill && (
                            <div className={styles.skillsContainer}>
                              <p className={styles.title}>Skill</p>
                              <p className={styles.body}>
                                {nftSelected.skill?.name}
                              </p>
                            </div>
                          )}
                          <div className={styles.statsContainer}>
                            {nftSelected.type === 1 ? (
                              <>
                                {/* CHARACTER */}
                                <p className={styles.title}>Stat</p>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={HP}
                                    alt="HP icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <p className={styles.itemStatTitle}>HP</p>
                                    <p className={styles.itemStatNumbers}>
                                      {nftSelected.stat?.maxHealth} /{" "}
                                      {characterMaxStats.maxHealth}
                                    </p>
                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={ENERGY}
                                    alt="Energy icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <p className={styles.itemStatTitle}>
                                      Energy
                                    </p>
                                    <p className={styles.itemStatNumbers}>
                                      {nftSelected.stat?.energyRecovery} /{" "}
                                      {characterMaxStats.maxEnergyRecovery}
                                    </p>
                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={SPEED}
                                    alt="Speed icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <p className={styles.itemStatTitle}>
                                      Speed
                                    </p>
                                    <p className={styles.itemStatNumbers}>
                                      {nftSelected.stat?.moveSpeed} /{" "}
                                      {characterMaxStats.maxMoveSpeed}
                                    </p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {/* WEAPON */}
                                <p className={styles.title}>Stat</p>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={HP}
                                    alt="HP icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <p className={styles.itemStatTitle}>
                                      Damage
                                    </p>
                                    <p className={styles.itemStatNumbers}>
                                      {nftSelected.stat?.damage} /{" "}
                                      {weaponMaxStats.maxDamage}
                                    </p>
                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={ENERGY}
                                    alt="Energy icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <p className={styles.itemStatTitle}>
                                      Energy
                                    </p>
                                    <p className={styles.itemStatNumbers}>
                                      {nftSelected.stat?.consumeEnergy} /{" "}
                                      {nftSelected.stat?.maxEnergy}
                                    </p>
                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={SPEED}
                                    alt="Speed icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <p className={styles.itemStatTitle}>
                                      Cooltime
                                    </p>
                                    <p className={styles.itemStatNumbers}>
                                      {nftSelected.stat?.coolTime} /{" "}
                                      {weaponMaxStats.maxCoolDown}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className={styles.cont2b}>
                          <p className={styles.title}>P2E Info</p>
                          <div className={styles.p2eContainer}>
                            <div className={styles.p2eContainerA}>
                              {/* <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={DAILY}
                                  alt="Dayly gNCoin"
                                />
                                <p className={styles.p2eText}>
                                  Daily gNCoin Battle Count:{" "}
                                  {chosenNft.dailyPlayCount} /{" "}
                                  {chosenNft.maxDailyPlayCount}{" "}
                                </p>
                              </div> */}
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={PREMIUM}
                                  alt="Battle count"
                                />
                                <p className={styles.p2eText}>
                                  Bonus multiplier: {nftSelected.rewardMultiplier}
                                </p>
                              </div>
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={COPY}
                                  alt="Copy"
                                />
                                <p className={styles.p2eText}>Clone: {nftSelected.maxCloneCount - nftSelected.cloneCount} count left</p>
                              </div>
                            </div>
                            <div className={styles.p2eContainerB}>
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={SERIAL}
                                  alt="Serial"
                                />
                                <p className={styles.p2eText}>
                                  Serial Number: #{nftSelected.serial}
                                </p>
                              </div>
                              {/* <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={BONUS}
                                  alt="Bonus"
                                />
                                <p className={styles.p2eText}>
                                  Bonus: {chosenNft.rewardMultiplier}
                                </p>
                              </div> */}
                            </div>
                            <Button
                              title="Clone info"
                              onClick={handleShowClone}
                              width={'170px'}
                              style={{ margin: '12px 12px 12px 40px' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.bottomContainer}>
                  <div className={styles.bottomLeftContainer}>
                    <div className={styles.item}>
                      <p className={styles.itemName}>{nftSelected.itemName}</p>
                      <p className={styles.repName}>
                        [ {nftSelected.repName} ]
                      </p>
                      {nftSelected.salesState === 1 && (
                        <p className={styles.price}>
                          Price {nftSelected.price} nCoin
                        </p>
                      )}
                    </div>

                    <div>
                      <p className={styles.rarity}>
                        Rarity: {nftSelected.rarity}
                      </p>
                    </div>
                  </div>
                  {nftSelected.salesState === 1 ? (
                    <div className={styles.button}>
                      <button onClick={openModalUnregister}>
                        Unregister to marketplace
                      </button>
                    </div>
                  ) : (
                    <div className={styles.button}>
                      <button onClick={openModalRegister1}>
                        Register to marketplace
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {modalUnregister && (
          <ModalUnregister
            setmodalUnregister={setmodalUnregister}
            confirmUnregister={confirmUnregister}
            name={nftSelected.itemName}
          />
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
            forteTxText={forteTxText}
            bpToken={userData.bpToken}
            pid={userData.pid}
          />
        )}
      </div>
      {premium && (
        <div className={styles.bg} style={position.positionY ? { position: 'fixed', top: position.positionY } : null}>
          <PremiumModal setPremium={() => setPremium(false)} premiumBuffs={nftSelected.premiumBuff} />
        </div>
      )}
    </Background>
  );
};

export default CollectionDetail;
