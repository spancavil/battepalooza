import React from 'react';
import styles from './styles.module.scss'
import backImg from '../../Assets/img/bg-header-1.png';
import backImgFooter from '../../Assets/img/bg-footer.png';
import bpBrand from '../../Assets/img/BI-BP-2.png';
import SocialMedia from './Components/SocialMedia';
import Button from '../../Global-Components/Button';
import Footer from './Components/Footer';

const HomeContainer = () => {
    return (
        <div className={styles.container}>
            <div className = {styles.content} style={{backgroundImage: `url(${backImg}), url(${backImgFooter})`}}> 
                <SocialMedia/>
                <div className={styles.brand}>
                    <img src={bpBrand} alt="bp-brand"/>
                </div>
                <div className={styles.botones}>
                    <Button title="Watch trailer"/>
                    <Button title="Download now"/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default HomeContainer
