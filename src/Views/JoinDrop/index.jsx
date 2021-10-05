import React from 'react'
import Background from '../../Global-Components/Background';
import Modal from '../../Global-Components/Modal';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import SubMessage from '../../Global-Components/SubMessage';

const JoinDrop = () => {

    const handleBuy = () => {
        console.log("Hola")
    }

    const cantidad = 100;;
    const packName = "Rare Pack";

    return (
        <Background>
            <div className ={styles.parentContainerActive}>


                <Modal title = "Checkout" className ={styles.modalContainer}>
                    <h3 className={styles.textDrop}>
                        Will you use {cantidad} nCoin to buy {packName}
                    </h3>
                    <Button
                    title = "BUY"
                    width = "176px"
                    onClick = {handleBuy}
                    />
                    <SubMessage
                    text = "Not enough nCoin?"
                    link = "/account"
                    textLink = "Charge now"
                    />
                </Modal>

            </div>
        </Background>
    )
}

export default JoinDrop;
