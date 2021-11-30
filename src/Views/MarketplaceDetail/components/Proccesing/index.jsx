import React from 'react'
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';

const Proccesing = ({nftBuy, handleClose}) => {

    setTimeout(()=> {
      //Hardcodeamos el time
      handleClose(false);
    }, 2000)

    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Checkout" handleClose={()=>console.log("No hace nada")}>
            <h3 className={styles.textDrop}> {nftBuy.title1} is being transferred. Please wait while the transfer is being completed
            </h3>
            <img src={nftBuy.imgSrc.default} alt="nftToBuy"
            style={{
              paddingBottom: 15
            }}
            />
          </Modal>
        </div>
    )
}

export default Proccesing
