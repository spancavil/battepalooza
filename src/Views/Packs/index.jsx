import { RemainingPack } from "./components/RemainingPack";
import { useContext } from "react";
import { PackData } from "../../Context/PackProvider";
import { FirstPack } from "./components/FirstPack";
import { useHistory } from "react-router-dom";

import Background from "../../Global-Components/Background";
import Footer from "../../Global-Components/Footer";
import styles from "./styles.module.scss";

const Packs = () => {
    const { setPack, packData } = useContext(PackData);
    const history = useHistory();

    const setSelectedCard = (packId) => {
        setPack(packId);
        history.push(`/packs/${packId}`);
    };

    const handleFindOut = () => {
        history.push(`/packs/${packData?.packInfo?.id}`);
    };

    return (
        <Background>
            <section className={styles.packsSection}>
                <h4>PACKS</h4>

                <div className={styles.packs}>
                    <FirstPack
                        onClick={handleFindOut}
                    />

                    <div className={styles.remainingPacks}>
                        {packData?.nftPackProducts?.map((pack) => {
                            return (
                                <RemainingPack
                                    onClick={setSelectedCard}
                                    key={pack?.id}
                                    pack={pack}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </Background>
    );
};

export default Packs;
