import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NftData } from "../../Context/NftProvider";
import { UserData } from "../../Context/UserProvider";
import { logOutAmplitude } from "../../Utils/amplitude";
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
import DAILY from "./Assets/Sprite_Icon_Reward_35.png";
import PREMIUM from "./Assets/Sprite_Icon_Premium_03.png";
import COPY from "./Assets/Sprite_Icon_Premium_05.png";
import SERIAL from "./Assets/Sprite_Icon_Premium_02.png";
import BONUS from "./Assets/Sprite_Icon_Premium_04.png";

const CollectionDetail = () => {
  const [nftSelected, setNftSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false);
  const [modalRegister2, setmodalRegister2] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  const { userData } = useContext(UserData);
  const { setNftPrice, characterMaxStats, weaponMaxStats } =
    useContext(NftData);
  const { uuid } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
  }, []);

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
    const salesState = 0;
    const user = "BOT";
    setNftPrice(nftSelected, inputPrice, user, salesState);
    setmodalUnregister(false);
  };
  const Register = () => {
    if (inputPrice > 0) {
      const sale = 1;
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
        {nftSelected && (
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
                          <div className={nftSelected.type === 1 ? styles.cont3 : styles.cont3Weapon}>
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
                                {nftSelected.ability.text}
                              </p>
                            </div>
                            <div className={styles.cont3b}>
                              <p className={styles.title}>Character Story</p>
                              <p className={styles.storyText}>
                                {nftSelected.storyText}
                              </p>
                            </div>
                          </div>
                          {nftSelected.skill && (
                            <div className={styles.skillsContainer}>
                              <p className={styles.title}>Skill</p>
                              <p className={styles.body}>{nftSelected.skill?.name}</p>
                            </div>
                          )}
                          <div className={styles.statsContainer}>
                            {nftSelected.type === 1 ?
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
                                  <p className={styles.itemStatTitle}>Energy</p>
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
                                  <p className={styles.itemStatTitle}>Speed</p>
                                  <p className={styles.itemStatNumbers}>
                                    {nftSelected.stat?.moveSpeed} /{" "}
                                    {characterMaxStats.maxMoveSpeed}
                                  </p>
                                </div>
                              </div>
                            </> 
                              :
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
                                  <p className={styles.itemStatTitle}>Damage</p>
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
                                  <p className={styles.itemStatTitle}>Energy</p>
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
                                  <p className={styles.itemStatTitle}>Cooltime</p>
                                  <p className={styles.itemStatNumbers}>
                                    {nftSelected.stat?.coolTime} /{" "}
                                    {weaponMaxStats.maxCoolDown}
                                  </p>
                                </div>
                              </div>
                            </>
                          }
                          </div>
                        </div>
                        <div className={styles.cont2b}>
                          <p className={styles.title}>P2E Info</p>
                          <div className={styles.p2eContainer}>
                            <div className={styles.p2eContainerA}>
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={DAILY}
                                  alt="Dayly gNCoin"
                                />
                                <p className={styles.p2eText}>
                                  Daily gNCoin Battle Count:{" "}
                                  {nftSelected.dailyPlayCount} /{" "}
                                  {nftSelected.maxDailyPlayCount}{" "}
                                </p>
                              </div>
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={PREMIUM}
                                  alt="Battle count"
                                />
                                <p className={styles.p2eText}>
                                  gNCoin Battle Count: {nftSelected.playCount} /{" "}
                                  {nftSelected.maxPlayCount}{" "}
                                </p>
                              </div>
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={COPY}
                                  alt="Copy"
                                />
                                <p className={styles.p2eText}>Copy: VER</p>
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
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={BONUS}
                                  alt="Bonus"
                                />
                                <p className={styles.p2eText}>
                                  Bonus: {nftSelected.rewardMultiplier}
                                </p>
                              </div>
                            </div>
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

                    <div className={styles.rarity}>
                      <p>Rarity: {nftSelected.rarity}</p>
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
            unRegister={unRegister}
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
          />
        )}
      </div>
    </Background>
  );
};

export default CollectionDetail;
