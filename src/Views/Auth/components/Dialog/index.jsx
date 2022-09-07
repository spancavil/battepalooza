import React from "react";
import AuthDialog from "../../../../Global-Components/AuthDialog";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import Input from "../../../../Global-Components/Input";
import Loader from "../../../../Global-Components/Loader";
import Divider from "../Divider";
import SixInput from "../SixInput";
import styles from "./styles.module.scss";
/* import AppNway from "../../../../Assets/img/App nWayPlay 1.png";
import passCode from "../../../../Assets/img/PassCode 1.png"; */
import { useHistory } from "react-router-dom";

const Dialog = ({
    setEmail,
    sendCode,
    loading,
    type,
    handleChangeVerificationCode,
    handleConfirmCode,
    handleSignup,
    handleLink,
    linkingMessage,
}) => {
    const history = useHistory();
    if (type === "login") {
        return (
            <AuthDialog title={loading ? "" : "Welcome to Battlepalooza"}>
                {loading ? (
                    <div className={styles.loaderContainer}>
                        <Loader />
                    </div>
                ) : (
                    <form onSubmit={sendCode} style={{overflow: "visible"}}>
                        <p className={styles.text}>
                            Compete in real-time against live contestants from
                            around the world for real-world prizes in a
                            24-player battle royale. Grab as many coins as you
                            can in the arena without getting fragged. Survive
                            until the end to take home the big loot!
                        </p>
                        <ButtonRounded
                            onClick={handleSignup}
                            title={"CREATE ACCOUNT"}
                            color="blue"
                            additionalStyles={{ margin: "32px 0" }}
                        />
                        <Divider />
                        <Input
                            type="text"
                            inputType="white"
                            label={"E-mail"}
                            width={"100%"}
                            widthContainer={"100%"}
                            handleChange={setEmail}
                            autoComplete={"on"}
                        />
                        <ButtonRounded
                            title={"GET CODE"}
                            color="yellow"
                            additionalStyles={{ margin: "32px 0" }}
                        />
                    </form>
                )}
            </AuthDialog>
        );
    }
    if (type === "verification") {
        return (
            <AuthDialog title={loading ? "" : "Send verification"}>
                {loading ? (
                    <div className={styles.loaderContainer}>
                        <Loader />
                    </div>
                ) : (
                    <>
                        <p className={styles.text}>
                            Input the 6 digit code that has been sent to your
                            email
                        </p>
                        <SixInput
                            label={"Code"}
                            width={"40px"}
                            handleChangeVerificationCode={
                                handleChangeVerificationCode
                            }
                        />
                        <ButtonRounded
                            title={"VERIFY"}
                            color="yellow"
                            additionalStyles={{ margin: "32px 0" }}
                            onClick={handleConfirmCode}
                        />
                        <p className={styles.subText}>
                            Did not receive email? Check your spam folder.
                            <br /> If you have not received you email,contact
                            support.
                        </p>
                    </>
                )}
            </AuthDialog>
        );
    }
    if (type === "user-not-found") {
        return (
            <AuthDialog title={"nWayPlay Account"}>
                <span className={styles.text}>
                    You are registered to one of nWayPlay's services. Press
                    proceed to link your nWayPlay account.
                </span>
                {/* <span className={styles.subText}>
                    If you already have played Battlepalooza without linking a
                    nWayPlay account, proceed as follows
                </span>
                 <p className={styles.subText}>
                    Please link your account with nWayPlay using the mobile app
                    in order to bring your saved data or game progress. If you
                    do not link your Battlepalooza account using the mobile app,
                    you might lose your game progress. We will not be
                    responsible for lost data, or merge accounts for users who
                    have more than one account. Please follow the following
                    steps using the mobile app in order to link your account:
                    <br />
                    <br />
                    1) From the Lobby go to Settings
                    <br />
                    2) Press nWayPlay <br />
                    3) Input your email and press Send Passcode
                    <br />
                    4) Input the Passcode sent to your email and press Verify.
                    <br />
                </p>
                <div className={styles.imgContainer}>
                    <img
                        className={styles.imgModal}
                        src={AppNway}
                        alt="App Nway"
                    />
                    <img
                        className={styles.imgModal}
                        src={passCode}
                        alt="Passcode"
                    />
                </div> */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                        gap: "4%",
                        overflow: "visible",
                        padding: '3%',
                    }}
                >
                    <ButtonRounded
                        color="blue"
                        title={linkingMessage}
                        onClick={handleLink}
                    />
                    <ButtonRounded
                        color="blue"
                        title="CANCEL"
                        onClick={() => history.push("/")}
                    />
                </div>
            </AuthDialog>
        );
    }
    if (type === "linking-success") {
        return (
            <AuthDialog title={"Success!"}>
                <span className={styles.text}>
                    The email you entered linked successfully!
                </span>
                <span className={styles.text}>
                    Your Battlepalooza account was created.
                </span>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        width: "100%",
                        padding: "3%",
                        gap: "4%",
                    }}
                >
                    <ButtonRounded
                        title="OK"
                        color="blue"
                        onClick={() => history.push("/")}
                    />
                </div>
            </AuthDialog>
        );
    }
};

export default Dialog;
