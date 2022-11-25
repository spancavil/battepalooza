import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { PackData } from "../Context/PackProvider";
import { UserData } from "../Context/UserProvider";
import dropService from "../Services/drop.service";
import marketService from "../Services/market.service";
import nftService from "../Services/nft.service";
import { logOutAmplitude } from "../Utils/amplitude";
import { fireAlertAsync } from "../Utils/sweetAlert2";

const useTransactionNft = (
    { 
        buyPack = false, 
        buyMarket = false, 
        burnNft = false,
        quantity = 0,
        packBuy = {},
        nft = {},
        trigger = true,
        processingComplete = () => {},
        handleClose = () => {}
    } = {},
) => {
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [forteTxText, setForteTxText] = useState("");
    const [step1, setStep1] = useState(true); //buyShop
    const [step2, setStep2] = useState(false); //getBlockchainTxStatus

    const { userData } = useContext(UserData);
    const { setTxResultPackBuy } = useContext(PackData);

    const history = useHistory();

    const lockedStep1 = useRef(false)

    //Paso uno, hacemos la compra, y la API nos devuelve el Id de la tx
    //para consultar en Forte
    useEffect(() => {
        console.log(trigger);
        //Buy pack or buy marketplace or burn
        const functionStep1 = async () => {
            //Solo entra en caso de estar en el paso 1
            if (step1 && !lockedStep1.current && trigger) {
                lockedStep1.current = true
                console.log(buyMarket);
                if (buyPack) console.log("Step 1. BuyShopNft");
                if (buyMarket) console.log("Step 1. Buy marketplace");
                if (burnNft) console.log("Step 1. Burn NFT");
                if (Object.keys(userData).length !== 0) {
                    try {
                        let response;
                        if (buyPack) {
                            response = await dropService.buyShop(
                                packBuy.id,
                                userData.pid,
                                quantity,
                                userData.bpToken
                            );
                        }
                        if (buyMarket) {
                            response =
                                await marketService.buyProductMarketplace(
                                    userData.pid,
                                    nft.sellerPid,
                                    nft.uniqueId,
                                    userData.bpToken
                                );
                        }
                        if (burnNft) {
                            response = await nftService.burnNft(
                                userData.bpToken,
                                userData.pid,
                                nft.uuid
                            );
                        }
                        console.log(response);
                        if (response.error.text !== "") {
                            if (response.error.text.includes("authorized")) {
                                fireAlertAsync(
                                    "Warning",
                                    "Session expired, please login again."
                                ).then(() => {
                                    localStorage.removeItem("userBP");
                                    logOutAmplitude();
                                    history.push("/");
                                });
                            } else {
                                setStatus("error");
                                setError(response?.error?.text);
                            }
                            //Si no hay errores seteamos el forteTxId para el paso 2.
                        } else {
                            setForteTxText(response.forteTxId);
                            setStep1(false);
                            setStep2(true);
                        }
                    } catch (error) {
                        setStatus("error");
                        setError(error?.message);
                    }
                    lockedStep1.current = false
                }
            }
        };

        functionStep1();
    }, [
        userData, 
        setForteTxText, 
        history, 
        packBuy, 
        step1, 
        quantity,
        buyMarket,
        burnNft,
        buyPack,
        nft,
        trigger
    ]);

    //Paso 2
    //Con el id de la tx vamos haciendo la consulta del status de la operación en la blockchain.
    useEffect(() => {
        let forteStatusInterval;
        if (forteTxText !== "" && Object.keys(userData).length !== 0 && step2) {
            console.log(`Step 2. Get forte tx`);
            console.log(`Forteid: ${forteTxText}, Status: ${status}`);

            const getStatusForte = async () => {
                try {
                    const response = await dropService.getTransactionStatus(
                        userData.pid,
                        forteTxText,
                        userData.bpToken
                    );
                    if (response.error.text !== "") {
                        if (response.error.text.includes("authorized")) {
                            fireAlertAsync(
                                "Warning",
                                "Session expired, please login again."
                            ).then(() => {
                                localStorage.removeItem("userBP");
                                logOutAmplitude();
                                history.push("/");
                                window.location.reload();
                            });
                        } else {
                            setStatus("error");
                            setError(response?.error?.text);
                            setTimeout(() => {
                                handleClose();
                            }, 3000);
                        }
                    } else {
                        //Response OK, no errors
                        //console.log(`Status on proccessing: ${response.status}`);
                        setStatus(response.status);
                        if (response.status === "completed") {
                            console.log(response);
                            setTxResultPackBuy(response?.txResult);
                        }
                    }
                } catch (error) {
                    setStatus("error");
                    setError(error?.message);
                    setTimeout(() => {
                        handleClose();
                    }, 3000);
                }
            };

            //We call the status of the transaction in forte each 0.5 secs
            forteStatusInterval = setInterval(getStatusForte, 500);
            setTimeout(() => {
                if (status !== "pending" && status !== "") {
                    clearInterval(forteStatusInterval);
                    if (step2 && status === "completed") {
                        setTimeout(() => {
                            processingComplete();
                        }, 3000);
                    }
                }
            }, 1000);
        }
        //Interval clear at component will unmount
        return () => {
            clearInterval(forteStatusInterval);
        };
    }, [
        forteTxText,
        userData,
        history,
        status,
        handleClose,
        processingComplete,
        step2,
        setTxResultPackBuy,
        error?.message,
    ]);

    return [status, error];
};

export default useTransactionNft;
