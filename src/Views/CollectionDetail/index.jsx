import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NftData } from "../../Context/NftProvider";
import { UserData } from "../../Context/UserProvider";
import Background from "../../Global-Components/Background";
import Button from "../../Global-Components/Button";
import Input from "../../Global-Components/Input";
import Modal from "../../Global-Components/Modal";
import nftService from "../../Services/nft.service";
import styles from "./styles.module.scss";
// import defaultVideoCharacter from "../../Services/Videos/Characters/CyborgTed/DarkMax_Epic_1.mp4";
// import defaultVideoWeapon from "../../Services/Videos/Weapons/Hammer/hellGreen.mp4";
import { logOutAmplitude } from "../../Utils/amplitude";
import Loader from "../../Global-Components/Loader";

const CollectionDetail = () => {
  const [nftSelected, setNftSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [arrayBonus, setArrayBonus] = useState();
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false);
  const [modalRegister2, setmodalRegister2] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);
  const [nav, setNav] = useState("INFO");

  const { userData } = useContext(UserData);
  const { setNftPrice, weaponMaxStats, characterMaxStats } =
    useContext(NftData);
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
      console.log(nftSelected.buff);
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
      // console.log("Registraaaa")
      const sale = true;
      // console.log(nftSelected, inputPrice, userData.pid, sale)
      const nftUpdated = setNftPrice(
        nftSelected,
        inputPrice,
        userData.pid,
        sale
      );
      console.log(nftUpdated);
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

  const CardContent = () => {
    return (
      <div className={styles.dataContainer}>
        <div>
          <h3 className={styles.rare}>{nftSelected.itemName}</h3>
          <p className={styles.repName}>({nftSelected.repName})</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.btnContainer}>
            <button
              onClick={() => setNav("INFO")}
              className={nav === "INFO" ? styles.btn : styles.btnDes}
            >
              Info
            </button>
            <button
              onClick={() => setNav("STATS")}
              className={nav === "STATS" ? styles.btn : styles.btnDes}
            >
              Stats
            </button>
          </div>
          {nav === "INFO" ? (
            <div className={styles.info}>
              <div className={styles.item}>
                <p>Rarity: </p>
                <p>{nftSelected.rarity}</p>
              </div>
              <div className={styles.item}>
                <p>Type: </p>
                {nftSelected.type === 1 ? <p>CHARACTER</p> : <p>WEAPON</p>}
              </div>
              <div className={styles.item}>
                <p>Serial: </p>
                <p>{nftSelected.serial}</p>
              </div>
              <div className={styles.itemBlue}>
                <p>gNCoin Battle Count: </p>
                <p>
                  {nftSelected.playCount}/{nftSelected.maxPlayCount}
                </p>
              </div>
              <div className={styles.itemBlue}>
                <p>daily gNCoin Battle Count:</p>
                <p>
                  {nftSelected.dailyPlayCount}/{nftSelected.maxDailyPlayCount}
                </p>
              </div>
              <div className={styles.item}>
                <p>Bonus: </p>
                <p>{arrayBonus?.map((bonusProp) => `${bonusProp[1]} `)}</p>
              </div>
            </div>
          ) : (
            <div className={styles.info}>
              <p className={styles.desc}>{nftSelected.storyText}</p>

              {nftSelected.type === 1 ? (
                <>
                  <div className={styles.item}>
                    <p>HP:</p>
                    <p>
                      {nftSelected.stat.maxHealth} /{characterMaxStats.maxHealth}
                    </p>
                  </div>
                  <div className={styles.item}>
                    <p>Energy:</p>
                    <p>
                      {nftSelected.stat.energyRecovery} /
                      {characterMaxStats.maxEnergyRecovery}
                    </p>
                  </div>
                  <div className={styles.item}>
                    <p>Speed:</p>
                    <p>
                      {nftSelected.stat.moveSpeed} /
                      {characterMaxStats.maxMoveSpeed}
                    </p>
                  </div>
                  <div className={styles.item}>
                    <p>Skill: </p>
                    <p>{nftSelected.skill.name}</p>
                  </div>
                  <div className={styles.item}>
                    <p>Abilities: </p>
                    <p>
                      {nftSelected.ability.features.map((feature, index) => (
                        <span className={styles.abilitiesItem}> {index === 0 ? "" : "-" } {feature}</span>
                      ))}
                    </p>
                  </div>
                  <div className={styles.item}>
                    <p>{nftSelected.ability.text}</p>
                  </div>
                </>
              ) : (
                nftSelected.type === 2 && (
                  <>
                    <div className={styles.item}>
                      <p>Damage:</p>
                      <p>
                        {nftSelected.stat.damage} / {weaponMaxStats.maxDamage}
                      </p>
                    </div>

                    <div className={styles.item}>
                      <p>Energy:</p>
                      <p>
                        {nftSelected.stat.consumeEnergy} /
                        {nftSelected.stat.maxEnergy}
                      </p>
                    </div>
                    <div className={styles.item}>
                      <p>Cooldown:</p>
                      <p>
                        {nftSelected.stat.coolTime} /
                        {weaponMaxStats.maxCoolDown}
                      </p>
                    </div>
                    <div className={styles.item}>
                    <p>Abilities: </p>
                    <p>
                      {nftSelected.ability.features.map((feature, index) => (
                        <span className={styles.abilitiesItem}> {index === 0 ? "" : "-" } {feature}</span>
                        ))}
                    </p>
                  </div>
                  </>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Background>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Collection
      </p>
      {nftSelected &&
        (nftSelected.inMarket && modalRegister2 === false ? (
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.imgContainer}>
              { nftSelected.movieUrl ?
                <>
                  {loading && (
                    <div className={styles.loadMessageContainer}>
                      <Loader />
                    </div>
                  )}
                  <video
                    onCanPlayThrough={() => setLoading(false)}
                    className={styles.pinVideo}
                    src={
                    nftSelected.movieUrl
                    }
                    muted
                    autoPlay
                    loop
                  />
                </>
                :
                <h2 style={{textAlign: "center"}}>
                  No video for this character
                </h2>
                }
              </div>
              <div className={styles.text}>
                <CardContent />

                <p className={styles.price}>Price {nftSelected.price} nCoin</p>
                <div className={styles.buttonContainer}>
                  <Button
                    onClick={openModalUnregister}
                    title="UNREGISTER TO MARKETPLACE"
                  />
                </div>
              </div>
            </div>
            {modalUnregister && (
              <div className={styles.parentContainerModal}>
                <Modal
                  title="Confirmation"
                  handleClose={() => setmodalUnregister(false)}
                >
                  <h3 className={styles.textDrop}>
                    Tron Warrior #1234 has been unregistered for sale in the
                    Marketplace
                  </h3>
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingBottom: "25px",
                    }}
                  >
                    <Button
                      modal={true}
                      title="CONFIRM"
                      width="176px"
                      onClick={unRegister}
                    />
                  </div>
                </Modal>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.imgContainer}>
                { nftSelected.movieUrl ?
                <>
                  {loading && (
                    <div className={styles.loadMessageContainer}>
                      <Loader />
                    </div>
                  )}
                  <video
                    onCanPlayThrough={() => setLoading(false)}
                    className={styles.pinVideo}
                    src={
                    nftSelected.movieUrl
                    }
                    muted
                    autoPlay
                    loop
                  />
                </>
                :
                <h2>
                  No video for this character
                </h2>
                }
              </div>
              <div className={styles.text}>
                <CardContent />

                <div className={styles.buttonContainer}>
                  <Button
                    title="REGISTER TO MARKETPLACE"
                    onClick={openModalRegister1}
                  />
                </div>
              </div>
            </div>
            {modalRegister1 && (
              <div className={styles.parentContainerModal}>
                <Modal
                  title="Register to Marketplace"
                  handleClose={() => setmodalRegister1(false)}
                >
                  <div className={styles.modalContent}>
                    <p className={styles.subtitle}>
                      All registered NFT will appear at the Marketplace
                    </p>
                    <p className={styles.content}>Tron Warrior #1234</p>
                    <div className={styles.inputContainer}>
                      <Input
                        label="Input price"
                        handleChange={(precio) => handleInputChange(precio)}
                        widthContainer={"90%"}
                        width={"100%"}
                      />
                      <p>NCoin</p>
                    </div>
                    <p className={styles.fee}>Fee (5%)</p>
                    <p className={styles.ncoin}>
                      {inputPrice > 0 ? (inputPrice * 0.05).toFixed(0) : 0}{" "}
                      NCoin
                    </p>
                    <hr />
                    <p className={styles.afterFee}>
                      {inputPrice > 0
                        ? (inputPrice - inputPrice * 0.05).toFixed(0)
                        : 0}{" "}
                      NCoin (Amount received after fee)
                    </p>
                  </div>
                  <div>
                    <Button
                      title="REGISTER"
                      width="176px"
                      onClick={Register}
                      modal={true}
                    />
                  </div>
                </Modal>
              </div>
            )}
            {modalRegister2 && (
              <div className={styles.parentContainerModal}>
                <Modal
                  title="Confirmation"
                  handleClose={() => setmodalRegister2(false)}
                >
                  <h3 className={styles.textDrop}>
                    Tron Warrior #1234 has been registered <br />
                    for sale in the Marketplace
                  </h3>
                  <div
                    style={{ paddingBottom: "25px" }}
                    className={styles.buttonsContainer}
                  >
                    <Button
                      modal={true}
                      title="MARKETPLACE"
                      width="198px"
                      onClick={handleMarket}
                    />
                    <Button
                      modal={true}
                      title="CONFIRM"
                      width="198px"
                      onClick={() => setmodalRegister2(false)}
                    />
                  </div>
                </Modal>
              </div>
            )}
          </div>
        ))}
    </Background>
  );
};

export default CollectionDetail;
