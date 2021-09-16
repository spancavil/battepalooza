import React from 'react';
import styles from './styles.module.scss'
import backImg from '../../Assets/img/bg-header-1.png';
import bpBrand from '../../Assets/img/BI-BP-2.png'
import SocialMedia from './Components/SocialMedia';
import NavBar from '../Navbar';
import Button from '../../Global-Components/Button';

const HomeContainer = () => {
    return (
        <div className = {styles.home} style={{backgroundImage: `url(${backImg})`}}>
            <NavBar/>
            <SocialMedia/>
            <div className={styles.brand}>
                <img src={bpBrand} alt="bp-brand"/>
            </div>
            <div className={styles.botones}>
                <Button title="Watch trailer"/>
                <Button title="Download now"/>
            </div>
        </div>
    )
}

export default HomeContainer
