import React, { useEffect } from 'react'
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import { sendAmplitudeData } from '../../../../Utils/amplitude';

const Proccesing = ({nftBuy, handleClose}) => {

  useEffect(()=> {
    setTimeout(()=> {
      //Hardcodeamos el time. Acá iría la llamada a la API
      handleClose(false);
      sendAmplitudeData('Buy Confirmation Marketplace')
    }, 2000)
  }, [handleClose])

    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Proccesing" handleClose={()=>("No hace nada")}>
            <h3 className={styles.textDrop}> {nftBuy.itemName} is being transferred. Please wait while the transfer is being completed
            </h3>
            <img src={nftBuy.thumbnailUrl} alt="nftToBuy"
            style={{
              paddingBottom: 15
            }}
            />
          </Modal>
        </div>
    )
}

export default Proccesing
