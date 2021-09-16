import React from 'react';
import styles from './styles.module.scss'
import backImg from '../../Assets/img/bg-header-1.png';
import bpBrand from '../../Assets/img/BI-BP-2.png'
import SocialMedia from './Components/SocialMedia';
import NavBar from '../Navbar';

const HomeContainer = () => {
    return (
        <div className = {styles.home} style={{backgroundImage: `url(${backImg})`}}>
            <NavBar/>
            <SocialMedia/>
            <img src={bpBrand} alt=" bp-brand"/>
        </div>
    )
}

export default HomeContainer
