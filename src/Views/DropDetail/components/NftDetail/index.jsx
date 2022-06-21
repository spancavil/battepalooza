import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./styles.module.scss";
/* import Button from "../../../../Global-Components/Button"; */
import Loader from "../../../../Global-Components/Loader";
import HP from "../../Assets/Sprite_Icon_Stat_01.png";
import ENERGY from "../../Assets/Sprite_Icon_Stat_02.png";
import SPEED from "../../Assets/Sprite_Icon_Stat_04.png";
// import DAILY from "../../Assets/Sprite_Icon_Reward_35.png";
import PREMIUM from "../../Assets/Sprite_Icon_Premium_03.png";
/* import COPY from "../../Assets/Sprite_Icon_Premium_05.png";
import SERIAL from "../../Assets/Sprite_Icon_Premium_02.png"; */
// import BONUS from "../../Assets/Sprite_Icon_Premium_04.png";
import cross from "../../../../Assets/img/crossNftMarketDetail.png";
import { NftData } from "../../../../Context/NftProvider";
import useModifyDetail from "../../../../Hooks/useModifyDetail";
import StatusBar from "../../../../Global-Components/StatusBar";

const NftDetail = ({
  chosenNft: nftRaw,
  confirmBuy,
  handleClose,
  checkout,
  processing,
  buyComplete,
}) => {

  const { characterMaxStats, weaponMaxStats, nftStatic, clanStatic, rarityStatic, repIdStatic, premiumBuff } = useContext(NftData);
  const [loading, setLoading] = useState(false);

  const div = useRef();

  const chosenNft = useModifyDetail(nftRaw, nftStatic, clanStatic, rarityStatic, repIdStatic, premiumBuff)

  useEffect(() => {
    setLoading(true);
  }, []);

  //On escape it will close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && !checkout && !processing && !buyComplete) {
        handleClose()
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose, checkout, processing, buyComplete])

  const handleBuy = () => {
    confirmBuy(chosenNft);
  }

  return (
    <>
      <div className={styles.container} ref={div}>
        {chosenNft && (
          <div className={styles.card}>
            <div className={styles.cardContainer}>

              <div className={styles.header}>
                <h2 className={styles.remain}>Remain: {chosenNft.leftAmount}/{chosenNft.limitAmount}</h2>
                <div onClick={handleClose} style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={cross}
                    alt="close"
                  />
                </div>
              </div>

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
                          </div>
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
                                      {chosenNft.stat?.energyRecovery}
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
                                  <StatusBar color={"yellow"} value={chosenNft.stat?.coolTime} maxValue={chosenNft.stat?.coolTime <= 2 ? 2 : chosenNft.stat?.maxEnergy} />
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
                            {/* <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={COPY}
                                  alt="Copy"
                                />
                                <p className={styles.p2eText}>Clone: {chosenNft.cloneCount} count left</p>
                              </div> */}
                          </div>
                          {/* <div className={styles.p2eContainerB}>
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
                              <div className={styles.p2eItemContainer}>
                                <img
                                  className={styles.p2eIcon}
                                  src={BONUS}
                                  alt="Bonus"
                                />
                                <p className={styles.p2eText}>
                                  Bonus: {chosenNft.rewardMultiplier}
                                </p>
                              </div>
                            </div>
                            <Button
                                  title="Clone info"
                                  onClick={handleShowClone}
                                  width = {'170px'}
                                  style = {{margin: '12px 12px 12px 40px'}}
                            /> */}
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
                    {/* <p className={styles.rarity}>Fee: {chosenNft.fee}</p>
                      <p className={styles.rarity}>
                        Seller: {chosenNft.sellerName}
                      </p> */}
                    <p className={styles.rarity}>
                      Rarity: {chosenNft.rarity}
                    </p>
                  </div>
                </div>

                <div className={styles.button}>
                  <button onClick={() => handleBuy(chosenNft)}>
                    {chosenNft.price} NCoin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NftDetail;
