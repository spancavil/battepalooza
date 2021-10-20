import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {NftData} from '../../Context/NftProvider';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import Modal from '../../Global-Components/Modal';
import styles from './styles.module.scss';

const ToMarketplace = () => {
  const [nftSelected, setNftSelected] = useState ();
  const [modalUnregister, setmodalUnregister] = useState (false);

  const {nfts, setNft} = useContext (NftData);
  const {id} = useParams ();
  const history = useHistory ();

  useEffect (
    () => {
      const selectedNft = nfts.find (nfts => nfts.id === Number (id));
      setNftSelected (selectedNft);
      setNft (selectedNft);
    },
    [id, nfts, setNft]
  );

  const openModalUnregister = () => {
    setmodalUnregister (true);
  };
  const goBack = () => {
    history.goBack ();
  };

  const unRegister = () => {
    history.push ('/collection');
  };

  const onSale = true;

  return (
    <Background>
      <p className={styles.back} onClick={goBack}>
        &#60; Go back to Collection
      </p>
      {onSale
        ? nftSelected &&
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.imgContainer}>
                  {/* Aca iria el video */}
                </div>
                <div className={styles.text}>
                  <p className={styles.contentNft}>
                    SERIES 1 - TRON WARRIOR <br /> #1234
                  </p>
                  <div>
                    <h3 className={styles.rare}>
                      Rare Skin for Leti.
                      <br />
                      Can be used in Battlepalooza.
                    </h3>
                    <p>Currently registered in Marketplace</p>
                    <p className={styles.price}>Price 2000</p>
                  </div>
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
                    handleClose={() => setmodalUnregister (false)}
                  >
                    <h3 className={styles.textDrop}>
                      Tron Warrior #1234 has been unregistered
                      for sale in the Marketplace
                    </h3>
                    <Button
                      title="CONFIRM"
                      width="176px"
                      onClick={() => unRegister ()}
                    />
                  </Modal>
                </div>}

            </div>
        : nftSelected &&
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.imgContainer}>
                  {/* Aca iria el video */}
                </div>
                <div className={styles.text}>
                  <p className={styles.contentNft}>
                    SERIES 1 - TRON WARRIOR <br /> #1234
                  </p>
                  <h3 className={styles.rare}>
                    Rare Skin for Leti.
                    <br />
                    Can be used in Battlepalooza.
                  </h3>
                  <div className={styles.buttonContainer}>
                    <Button title="REGISTER TO MARKETPLACE" />
                  </div>
                </div>
              </div>
            </div>}
    </Background>
  );
};

export default ToMarketplace;
