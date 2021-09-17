import React from 'react';
import styles from './styles.module.scss'
import backImg from '../../Assets/img/bg-header-1.png';
import bpBrand from '../../Assets/img/BI-BP-2.png'
import SocialMedia from './Components/SocialMedia';
import Button from '../../Global-Components/Button';
import Modal from '../../Global-Components/Modal';

const HomeContainer = () => {
    return (
        <div className = {styles.home} style={{backgroundImage: `url(${backImg})`}}> 
            <SocialMedia/>
            <div className={styles.brand}>
                <img src={bpBrand} alt="bp-brand"/>
            </div>
            <div className={styles.botones}>
                <Button title="Watch trailer"/>
                <Button title="Download now"/>
            </div>
            <Modal title="Hola">
                <h2>Under pressure</h2>
            </Modal> 
        </div>
    )
}

export default HomeContainer
