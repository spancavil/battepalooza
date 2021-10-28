import React, {useEffect} from 'react';
import BackgroundTerms from './components/Background';
import { privacy } from './components/Texts/privacyPolicy';
import styles from './styles.module.scss';

const Privacy = () => {

    useEffect(() => {
        let privacyII = privacy.split(/\n/);
        privacyII = privacyII.filter(line => line !== "");
        let lineaEntera = "";
        for (const line of privacyII) {
            lineaEntera += `<br/>${line}<br/>`
        }
        document.getElementById("contenido").innerHTML = lineaEntera;
        
    }, [])
    //console.log(terms)
    return (
        <BackgroundTerms 
        title = {"BATTLEPALOOZA PRIVACY POLICY"}
        sub = {"Last updated: September 14, 2021"}
        >

            <p id ="contenido" className={styles.textContent}></p>

        </BackgroundTerms>
    )
}

export default Privacy;
