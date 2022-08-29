import React, { useContext, useState, useEffect } from "react";
import Background from "../../Global-Components/Background";
import Button from "../../Global-Components/Button";
import styles from "./styles.module.scss";
import { PackData } from "../../Context/PackProvider";
import CardAnimation from "../CardAnimation";
import Loader from "../../Global-Components/Loader";
import { UserData } from "../../Context/UserProvider";
import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import nftService from "../../Services/nft.service";
import { useHistory } from "react-router-dom";

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /open-pack */
const OpenPack = () => {
    const [flow, setFlow] = useState(3);
    const { packSelected, txResult } = useContext(PackData);
    const { userData } = useContext(UserData);
    const [loading, setLoading] = useState(false);
    const [canContinue, setCanContinue] = useState(false);
    const [nftsOpenPack, setNftsOpenPack] = useState([]);
    const history = useHistory();

    const nextFlow = () => {
        setFlow(flow + 1);
    };

    // const openLater = () => {
    //   history.push ('/');
    // };

    const timerFlow = () => {
        setTimeout(() => {
            setCanContinue(true);
        }, 7000);
    };

    const handleContinue = () => {
        nextFlow();
    };

    useEffect(() => {
        /* const fetchData = async () => {
            const uuids = Object.keys(txResult.nftItems);
            if (Object.keys(userData).length !== 0) {
                for (const uuid of uuids) {
                    try {
                        const response =
                            await nftService.getNftCollectionDetail(
                                userData.bpToken,
                                userData.pid,
                                uuid
                            );
                        const canContinue = checkErrorMiddleware(
                            response,
                            history
                        );
                        if (canContinue) {
                            setNftsOpenPack((value) => [
                                ...value,
                                response.nft,
                            ]);
                        }
                    } catch (error) {
                        alert(error.message);
                    }
                }
            }
        };
        userData.email && fetchData(); */

        setNftsOpenPack([
            {
                dailyPlayCount: 0,
                maxDailyPlayCount: 12,
                rewardMultiplier: 4,
                storyText:
                    "Although he has a tough and wild personality, he was given the wrong avatar and turned into a teddy bear.",
                skill: {
                    id: 27,
                    name: "Defense Up",
                },
                ability: {
                    text: "When the Defence Gear is activated, the Defence Gear will take damage instead of the player's HP.",
                    features: ["Energy Shield"],
                },
                stat: {
                    maxHealth: 2300,
                    energyRecovery: 15,
                    moveSpeed: 9,
                },
                buff: [
                    {
                        id: 15,
                        name: "Auto HP recovery",
                        value: 8,
                    },
                    {
                        id: 19,
                        name: "Debuff duration",
                        value: 9,
                    },
                    {
                        id: 18,
                        name: "Buff Duration",
                        value: 7,
                    },
                ],
                nftRelated: {
                    parent: null,
                    child: null,
                },
                uuid: "1abdbe3a-44f4-4a8b-96b3-63396366126b",
                type: 1,
                itemId: 28,
                itemName: "Fusion Ted",
                repName: "Agent Ted",
                clan: 4,
                rarity: "EPIC",
                sealed: true,
                salesState: 0,
                serial: 5,
                cloneCount: 0,
                movieUrl:
                    "https://battlepalooza-web.s3.amazonaws.com/movieClips/characters/FusionTed_Epic.mp4",
                thumbnailUrl:
                    "https://battlepalooza-web.s3.amazonaws.com/thumbnails/characters/Sprite_Shop_Character_03_Pre3.png",
                acquired: 1661795591726,
            },
        ]);
    }, [txResult, history, userData]);

    console.log(nftsOpenPack);

    return (
        <Background>
            {flow === 1 && (
                <div className={styles.container}>
                    <div className={styles.deg}>
                        <div className={styles.card}>
                            <img src={packSelected.thumbnailUrl} alt="pack" />
                            <div className={styles.down}>
                                <Button title="OPEN" onClick={nextFlow} />
                                {/* <p onClick={openLater}>OPEN LATER</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {flow === 2 && (
                <div className={styles.container2}>
                    <div className={styles.videoContainer}>
                        {packSelected.openMovieUrl ? (
                            <>
                                {loading && (
                                    <div
                                        className={styles.loadMessageContainer}
                                    >
                                        <Loader />
                                    </div>
                                )}
                                <video
                                    onCanPlayThrough={() => {
                                        setLoading(false);
                                        timerFlow();
                                    }}
                                    className={styles.pinVideo}
                                    src={packSelected.openMovieUrl}
                                    muted
                                    autoPlay
                                />
                            </>
                        ) : (
                            <h2>Video under development...</h2>
                        )}
                        {canContinue && (
                            <div style={{ zIndex: 2, overflow: "visible" }}>
                                <Button
                                    onClick={handleContinue}
                                    title={"Continue"}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {flow === 3 && <CardAnimation nfts={nftsOpenPack} />}
        </Background>
    );
};

export default OpenPack;
