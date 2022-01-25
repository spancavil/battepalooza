import React, {useEffect} from 'react';
import BackgroundTerms from './components/Background';
import { terms } from './components/Texts/termsOfUse';
import styles from './styles.module.scss';

const TermsOfService = () => {

    useEffect(() => {
        let termsII = terms.split(/\n/);
        termsII = termsII.filter(line => line !== "");
        let lineaEntera = "";
        for (const line of termsII) {
            lineaEntera += `<br/>${line}<br/>`
        }
        document.getElementById("contenido").innerHTML = lineaEntera;
        
    }, [])
    
    return (
        <BackgroundTerms 
        title = {"BATTLEPALOOZA TERMS & CONDITIONS OF USE"}
        sub = {"Last Updated: January 23, 2022"}
        >

        <p id ="contenido" className={styles.textContent}></p>

        </BackgroundTerms>
    )
}

export default TermsOfService
