import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";
/* import Button from "../../../../Global-Components/Button"; */
import { useParams, useHistory } from "react-router";
import marketService from "../../../../Services/market.service";
import Loader from "../../../../Global-Components/Loader";
import {
  logOutAmplitude,
  sendAmplitudeData,
} from "../../../../Utils/amplitude";
import { UserData } from "../../../../Context/UserProvider";
import fireToast, { fireAlertAsync } from "../../../../Utils/sweetAlert2";
import HP from "../../Assets/Sprite_Icon_Stat_01.png";
import ENERGY from "../../Assets/Sprite_Icon_Stat_02.png";
import SPEED from "../../Assets/Sprite_Icon_Stat_04.png";
// import DAILY from "../../Assets/Sprite_Icon_Reward_35.png";
import PREMIUM from "../../Assets/Sprite_Icon_Premium_03.png";
import COPY from "../../Assets/Sprite_Icon_Premium_05.png";
import SERIAL from "../../Assets/Sprite_Icon_Premium_02.png";
// import BONUS from "../../Assets/Sprite_Icon_Premium_04.png";
import { NftData } from "../../../../Context/NftProvider";
import useModifyDetail from "../../../../Hooks/useModifyDetail";
import Button from "../../../../Global-Components/Button";
import Clone from "../Clone";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import PremiumModal from "../Premium";
import StatusBar from "../../../../Global-Components/StatusBar";

const NftDetail = ({ nfts, setNft, setNftListing }) => {

  const history = useHistory();

  const [chosenNftRaw, setChosenNftRaw] = useState({});
  const [loading, setLoading] = useState(false);
  const [clone, setClone] = useState(false);
  const [premium, setPremium] = useState(false)
  const [position, setPosition] = useState({positionX: '', positionY: ''})
  const { nftId } = useParams();

  let nftSplitted = nftId.split("-");
  const uid = nftSplitted[0];
  const seller = nftSplitted[1];

  const {
    characterMaxStats,
    weaponMaxStats,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic,
  } = useContext(NftData);
  const { userData } = useContext(UserData);

  console.log(premiumStatic);

  const desktop = useMediaQuery('(min-width: 799px) and (max-width: 1199px)')

  const hd = useMediaQuery('(min-width: 1200px)')

  useEffect(() => {
    (async () => {
      const response = await marketService.getNftMarketplaceDetail(seller, uid);
      if (response.error.text !== "") {
        if (response.error.text.includes("authorized")) {
          fireAlertAsync(
            "Warning",
            "Session expired, please login again."
          ).then(() => {
            localStorage.removeItem("userBP");
            logOutAmplitude();
            history.push("/");
            window.location.reload();
          });
        } else {
          fireAlertAsync(response.error.text).then(() => {
            history.push("/");
          });
        }
      }

      setChosenNftRaw(response.product);
    })();
  }, [uid, seller, history]);

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleBuy = () => {
    if (Object.keys(userData).length !== 0) {
      setNft(chosenNft);
      sendAmplitudeData("Buy request Marketplace");
    } else {
      fireToast("Need login", 1200, "300px");
    }
  };

  /*   const handleList = () => {
    ("Click on list");
    setNftListing(chosenNft);
  }; */

  const goBack = () => {
    history.goBack();
  };

  const handleShowClone = () => {
    setClone(true);
  };

  const handleShowPremium = (e) => {
    console.log(e);
    setPosition({
      positionY: e.nativeEvent.offsetY
    })
    setPremium(true)
  }

  const chosenNft = useModifyDetail(
    chosenNftRaw,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic
  );

  console.log(chosenNft);

  return (
    <>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Marketplace
      </p>

      <div className={styles.container}>
        {chosenNft && (
          <div className={styles.card}>
            <div className={styles.text}>
              <div className={styles.cardContainer}>
                <div className={styles.topContainer}>
                  <div className={styles.videoContainer}>
                    {chosenNft.movieUrl ? (
                      <>
                        {loading && (
                          <div className={styles.loadMessageContainer}>
                            <Loader />
                          </div>
                        )}
                        <video
                          onCanPlayThrough={() => setLoading(false)}
                          className={styles.pinVideo}
                          src={chosenNft.movieUrl}
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
                              chosenNft.type === 1
                                ? styles.cont3
                                : styles.cont3Weapon
                            }
                          >
                            <div className={styles.cont3a}>
                              <p className={styles.title}>Abilities</p>
                              <span className={styles.featuresContainer}>
                                {chosenNft.ability?.features.map((x, i) => (
                                  <p key={i} className={styles.features}>
                                    {x} &nbsp;
                                  </p>
                                ))}
                              </span>
                              <p className={styles.abilityText}>
                                :{chosenNft.ability?.text}
                              </p>
                            </div>
                            <div className={styles.cont3b}>
                              <p className={styles.title}>Character Story</p>
                              <p className={styles.storyText}>
                                {chosenNft.storyText}
                              </p>
                              <Button
                                title="Premium buff"
                                onClick={handleShowPremium}
                                width={hd ? "240px" : desktop ? "200px": "170px"}
                                style={{ margin: "10px 0 10px 10px" }}
                              />
                            </div>
                            {/* <div className={styles.cont3b}>
                            </div> */}
                          </div>
                          {chosenNft.skill && (
                            <div className={styles.skillsContainer}>
                              <p className={styles.title}>Skill</p>
                              <p className={styles.body}>
                                {chosenNft.skill?.name}
                              </p>
                            </div>
                          )}
                          <div className={styles.statsContainer}>
                            {chosenNft.type === 1 ? (
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
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <p className={styles.itemStatTitle}>
                                        HP
                                      </p>
                                      <p>
                                        {chosenNft.stat?.maxHealth}
                                      </p>
                                    </div>
                                    <StatusBar color={"red"} value={chosenNft.stat?.maxHealth} maxValue={characterMaxStats.maxHealth} />

                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={ENERGY}
                                    alt="Energy icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <p className={styles.itemStatTitle}>
                                        Energy
                                      </p>
                                      <p>
                                        {chosenNft.stat?.energyRecovery}/
                                        {characterMaxStats.maxEnergyRecovery}
                                      </p>
                                    </div>
                                    <StatusBar color={"green"} value={chosenNft.stat?.energyRecovery} maxValue={characterMaxStats.maxEnergyRecovery} />

                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={SPEED}
                                    alt="Speed icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <p className={styles.itemStatTitle}>
                                        Speed
                                      </p>
                                      <p>
                                        {chosenNft.stat?.moveSpeed}
                                      </p>
                                    </div>
                                    <StatusBar color={"yellow"} value={chosenNft.stat?.moveSpeed} maxValue={characterMaxStats.maxMoveSpeed} />
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
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <p className={styles.itemStatTitle}>
                                        Damage
                                      </p>
                                      <p>
                                        {chosenNft.stat?.damage}
                                      </p>
                                    </div>
                                    <StatusBar color={"red"} value={chosenNft.stat?.damage} maxValue={weaponMaxStats.maxDamage} />
                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={ENERGY}
                                    alt="Energy icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <p className={styles.itemStatTitle}>
                                        Energy
                                      </p>
                                      <p>
                                        {chosenNft.stat?.consumeEnergy}/
                                        {chosenNft.stat?.maxEnergy}
                                      </p>
                                    </div>

                                    <StatusBar color={"green"} value={chosenNft.stat?.consumeEnergy} maxValue={chosenNft.stat?.maxEnergy} />
                                  </div>
                                </div>
                                <div className={styles.itemStatContainer}>
                                  <img
                                    className={styles.icon}
                                    src={SPEED}
                                    alt="Speed icon"
                                  />
                                  <div className={styles.itemStatInfo}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <p className={styles.itemStatTitle}>
                                        Cooltime
                                      </p>
                                      <p>
                                        {chosenNft.stat?.coolTime}
                                      </p>
                                    </div>
                                    <StatusBar color={"yellow"} value={chosenNft.stat?.coolTime} maxValue={chosenNft.stat?.coolTime < 2 ? 2 : chosenNft.stat?.maxEnergy} />
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
                                  Bonus multiplier: {chosenNft.rewardMultiplier}
                                </p>
                              </div>
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={COPY}
                                  alt="Copy"
                                />
                                <p className={styles.p2eText}>
                                  Clone:{" "}
                                  {chosenNft.maxCloneCount -
                                    chosenNft.cloneCount}{" "}
                                  count left
                                </p>
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
                                  Serial Number: #{chosenNft.serial}
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
                              width={!hd ? "170px" : "210px"}
                              style={{ margin: "12px 12px 12px 40px" }}
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
                      <p className={styles.itemName}>{chosenNft.itemName}</p>
                      <p className={styles.repName}>[ {chosenNft.repName} ]</p>
                    </div>

                    <div className={styles.rarityContainer}>
                      {/* <p className={styles.rarity}>Fee: {chosenNft.fee}</p> */}
                      <p className={styles.rarity}>
                        Seller: {chosenNft.sellerName}
                      </p>
                      <p className={styles.rarity}>
                        Rarity: {chosenNft.rarity}
                      </p>
                    </div>
                  </div>

                  <div className={styles.button}>
                    <button onClick={() => handleBuy()}>
                      {chosenNft.price} NCoin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {clone && (
        <div className={styles.bg}>
          <Clone setClone={() => setClone(false)} />
        </div>
      )}
      {premium && (
        <div className={styles.bg} style={position.positionY ? {position: 'fixed', top: position.positionY}: null}>
          <PremiumModal setPremium={() => setPremium(false)} premiumBuffs={chosenNft.premiumBuff} />
        </div>
      )}
    </>
  );
};

export default NftDetail;
