import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { NftData } from '../../Context/NftProvider';
import { UserData } from '../../Context/UserProvider';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import nftService from '../../Services/nft.service';
import styles from './styles.module.scss';
import defaultVideoCharacter from '../../Services/Videos/Characters/CyborgTed/DarkMax_Epic_1.mp4';
import defaultVideoWeapon from '../../Services/Videos/Weapons/Hammer/hellGreen.mp4';
import { logOutAmplitude } from '../../Utils/amplitude';

const CollectionDetail = () => {
  const [nftSelected, setNftSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [arrayBonus, setArrayBonus] = useState();
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false);
  const [modalRegister2, setmodalRegister2] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  const { userData } = useContext(UserData)
  const { setNftPrice, weaponMaxStats, characterMaxStats } = useContext(NftData);
  const { uuid } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(
    () => {
      const fetchData = async () => {
        if (Object.keys(userData).length !== 0) {
          try {
            const response = await nftService.getNftCollectionDetail(
              userData.bpToken,
              userData.pid,
              uuid)

            //Logout en caso de error
            if (response.error.text !== '') {
              if (response.error.text.includes ('authorized')) {
                alert ('Session expired, please login again.');
                localStorage.removeItem ('userBP');
                logOutAmplitude();
                history.push ('/');
                window.location.reload ();
              } else {
                alert (response.error.text);
              }
            } else {
              setNftSelected(response.nft);
            }

          } catch (error) {
            alert(error.message)
          }
        }
      }
      userData.email && fetchData()
    },
    [uuid, userData, history]
  );

  useEffect(() => {
    if (nftSelected) {
      const arrayBonus = Object.entries(nftSelected.buff[0]);
      console.log(nftSelected.buff);
      setArrayBonus(arrayBonus);
    }
  }, [nftSelected, setArrayBonus])

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
    const sale = false
    const user = "BOT"
    setNftPrice(nftSelected, inputPrice, user, sale)
    history.push('/collection');
  };
  const Register = () => {
    if (inputPrice > 0) {
      // console.log("Registraaaa")
      const sale = true
      // console.log(nftSelected, inputPrice, userData.pid, sale)
      const nftUpdated = setNftPrice(nftSelected, inputPrice, userData.pid, sale);
      console.log(nftUpdated);
      setNftSelected(nftUpdated);
      setmodalRegister1(false);
      setmodalRegister2(true);
    } else {
      return
    }
  };
  const handleMarket = () => {
    history.push('/marketplace');
  };
  const handleInputChange = (value) => {
    setInputPrice(value)
  }

  const CardContent = () => {
    return (
      <>
        <h3 className={styles.rare}>
          {nftSelected.itemName}
        </h3>
        <p>({nftSelected.repName})</p>
        <p>Rarity: {nftSelected.rarity}</p>
        {nftSelected.type === 1 ? <p>Character</p> : <p>Weapon</p>}
        <p>Serial: {nftSelected.serial}</p>
        <p>gNCoin Battle Count: {nftSelected.playCount}/{nftSelected.maxPlayCount}</p>
        <p>daily gNCoin Battle Count: {nftSelected.dailyPlayCount}/{nftSelected.maxDailyPlayCount}</p>
        <p>Bonus: {arrayBonus?.map(bonusProp => `${bonusProp[1]} `)}</p>
        <p className={styles.price}>Stats</p>
        <p>Story: {nftSelected.storyText}</p>
        {
          nftSelected.type === 1 ?
          <>
            <p>HP: {nftSelected.stat.maxHealth} / {characterMaxStats.maxHealth}</p>
            <p>Energy: {nftSelected.stat.energyRecovery} / {characterMaxStats.maxEnergyRecovery}</p>
            <p>Speed: {nftSelected.stat.moveSpeed} / {characterMaxStats.maxMoveSpeed}</p>
            <p>Skill: {nftSelected.skill.name}</p>
          </>
          :
          nftSelected.type === 2 &&
          <>
            <p>Damage: {nftSelected.stat.damage} / {weaponMaxStats.maxDamage}</p>
            <p>Energy: {nftSelected.stat.consumeEnergy} / {nftSelected.stat.maxEnergy}</p>
            <p>Cooldown: {nftSelected.stat.coolTime} / {weaponMaxStats.maxCoolDown}</p>
          </>
        }
        <p>{nftSelected.ability.text}</p>
        <p>Abilities: {nftSelected.ability.features.map(feature => `- ${feature}`)}</p>
      </>
    )
  }

  return (
    <Background>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Collection
      </p>
      {nftSelected && (
        nftSelected.inMarket && modalRegister2 === false
          ?
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.imgContainer}>
                {loading && (
                  <div className={styles.loadMessageContainer}>
                      <p className={styles.loadMessage}>Loading...</p>
                  </div>
                )
                }
                {/* POR AHORA UN VIDEO POR DEFAULT, LUEGO SE CAMBIA POR LOS ASSETS */}
                <video
                  onCanPlayThrough={()=>setLoading(false)}
                  className={styles.pinVideo}
                  src={nftSelected.type === 1 ? defaultVideoCharacter : defaultVideoWeapon}
                  muted
                  autoPlay
                  loop
                />
              </div>
              <div className={styles.text}>

                <CardContent/>
                
                <p className={styles.price}>Price {nftSelected.price} nCoin</p>
                <div className={styles.buttonContainer}>
                  <Button
                    onClick={openModalUnregister}
                    title="UNREGISTER TO MARKETPLACE"
                  />
                </div>
              </div>
            </div>
            {modalUnregister &&
              <div className={styles.parentContainerModal}>
                <Modal
                  title="Confirmation"
                  handleClose={() => setmodalUnregister(false)}

                >
                  <h3 className={styles.textDrop}>
                    Tron Warrior #1234 has been unregistered
                    for sale in the Marketplace
                  </h3>
                  <div style={{ width: '100%', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '25px' }}>
                    <Button
                      modal={true}
                      title="CONFIRM"
                      width="176px"
                      onClick={unRegister}
                    />
                  </div>
                </Modal>
              </div>}
          </div>

          :

          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.imgContainer}>
                {loading && (
                  <div className={styles.loadMessageContainer}>
                      <p className={styles.loadMessage}>Loading...</p>
                  </div>
                )
                }
                <video
                  onCanPlayThrough={()=>setLoading(false)}
                  className={styles.pinVideo}
                  src={nftSelected.type === 1 ? defaultVideoCharacter : defaultVideoWeapon}
                  muted
                  autoPlay
                  loop
                />
              </div>
              <div className={styles.text}>

                <CardContent/>

                <div className={styles.buttonContainer}>
                  <Button
                    title="REGISTER TO MARKETPLACE"
                    onClick={openModalRegister1}
                  />
                </div>
              </div>
            </div>
            {modalRegister1 &&
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
                      <Input label="Input price" handleChange={(precio) => handleInputChange(precio)} widthContainer={"90%"} width={"100%"} />
                      <p>NCoin</p>
                    </div>
                    <p className={styles.fee}>Fee (5%)</p>
                    <p className={styles.ncoin}>{inputPrice > 0 ? (inputPrice * 0.05).toFixed(0) : 0} NCoin</p>
                    <hr />
                    <p className={styles.afterFee}>
                      {inputPrice > 0 ? (inputPrice - inputPrice * 0.05).toFixed(0) : 0} NCoin (Amount received after fee)
                    </p>
                  </div>
                  <div>
                    <Button title="REGISTER" width="176px" onClick={Register} modal={true} />
                  </div>
                </Modal>
              </div>}
            {modalRegister2 &&
              <div className={styles.parentContainerModal}>
                <Modal
                  title="Confirmation"
                  handleClose={() => setmodalRegister2(false)}
                >
                  <h3 className={styles.textDrop}>
                    Tron Warrior #1234 has been registered <br />
                    for sale in the Marketplace
                  </h3>
                  <div style={{ paddingBottom: '25px' }} className={styles.buttonsContainer}>
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
              </div>}
          </div>)}
    </Background>
  );
};

export default CollectionDetail;
