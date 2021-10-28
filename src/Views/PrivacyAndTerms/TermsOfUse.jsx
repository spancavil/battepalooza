import React, {useEffect} from 'react';
import BackgroundTerms from './components/Background';
import { terms } from './components/Texts/termsOfUse';
import styles from './styles.module.scss';

const TermsOfUse = () => {

    useEffect(() => {
        let termsII = terms.split(/\n/);
        termsII = termsII.filter(line => line !== "");
        let lineaEntera = "";
        for (const line of termsII) {
            lineaEntera += `<br/>${line}<br/>`
        }
        document.getElementById("contenido").innerHTML = lineaEntera;
        
    }, [])
    //console.log(terms)
    return (
        <BackgroundTerms 
        title = {"Terms of service"}
        sub = {"Last updated: September 14, 2021"}
        >

        <p id ="contenido" className={styles.textContent}></p>

        </BackgroundTerms>
    )
}

export default TermsOfUse
