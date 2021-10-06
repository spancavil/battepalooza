import React, { useEffect, useState } from 'react'
import Background from '../../Global-Components/Background';
import Modal from '../../Global-Components/Modal';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import SubMessage from '../../Global-Components/SubMessage';
import { createRandomNumber } from '../../Utils/createQueue';
import image1 from '../../Assets/sprites/cardpack01.png';
import ProgressBar from './components/ProgressBar';

const JoinDrop = () => {

    const [number, setNumber] = useState("")
    const [milliseconds, setMilliseconds] = useState(0);
    const [finishCount, setFinishCount] = useState(false);
    const [buy, setBuy] = useState(false);

    const handleBuy = () => {
        setBuy(true);
    }

    const handleCount = () => {
        setFinishCount(true);
    }

    const handleOpen = () => {
        console.log("Me abro!")
    }

    const handleLater = () => {
        console.log("Después...");
    }

    const cantidad = 100;;
    const packName = "Rare Pack";

    const pack = {
        id: 1,
        imgSrc: image1,
        description : {
            text1: "Rare Series 1 Release",
            text2: "1 - DROP 1",
            text3: "2,00 PACK",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 100000,
        stock: 300,
        soldOut: false,
        sale: true,
    }

    useEffect(() => {
        setNumber(createRandomNumber(5,15));
    }, [])
    
    useEffect(()=> {
        setMilliseconds(number*500)
    }, [number])

    console.log(finishCount);
    return (
        <Background>
            <div className = {styles.parentContent}>
                <div className={styles.content}>
                    <span className={styles.line1}>
                        {pack.description.text1} {pack.description.text2} <br/> {pack.stock} packs left <br/><br/>
                    </span>
                    
                    <span className={styles.line2}>
                        You are in Line! <br/>
                    </span>

                    <span className={styles.line3}>
                        <br/>Your number is {number} <br/><br/>
                    </span>
                    <span className={styles.line4}>
                        Expected wait time {number*0.5} seconds
                    </span>
                    {!finishCount && <ProgressBar
                        width={"100%"}
                        totalTime={milliseconds}
                        finish = {handleCount}
                    />}
                    {finishCount && <div style={{
                                            width: "100%",
                                            border: "1px solid white",
                                            height: "33px"
                                        }}>
                                            <div style ={{
                                                width: "100%",
                                                backgroundColor: '#0146D5',
                                                height: '33px'
                                            }}
                                            />
                                        </div>}
                </div>
                <div className = {styles.cardImage}>

                </div>
            </div>
            {(finishCount && !buy) && 
                <div className ={styles.parentContainerModal}>
                <Modal title = "Checkout">
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
            }
            {buy &&
                <div className ={styles.parentContainerModal}>
                <Modal title="Confirmation">
                    <h3 className={styles.textDrop}>Congratulations! Your purchase was succesful! <br/>Will you open the Pack now?</h3>
                    <div className={styles.modalButtons}>
                        <Button
                            title="Open"
                            onClick = {handleOpen}
                            width = "176px"
                        />
                        <Button
                            title="Later"
                            onClick = {handleLater}
                            width = "176px"
                            style={{backgroundColor: "#0149DB"}}
                        />
                    </div>
                </Modal>
                </div>
            }
        </Background>
    )
}

export default JoinDrop;
