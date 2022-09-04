import React from "react";
import AuthDialog from "../../../../Global-Components/AuthDialog";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import Input from "../../../../Global-Components/Input";
import Loader from "../../../../Global-Components/Loader";
import Divider from "../Divider";
import SixInput from "../SixInput";
import styles from "./styles.module.scss";

const Dialog = ({
    setEmail,
    sendCode,
    loading,
    type,
    handleChangeVerificationCode,
    handleConfirmCode,
    handleSignup
}) => {
    if (type === "login") {
        return (
            <AuthDialog title={loading ? "" : "Welcome to Battlepalooza"}>
                {loading ? (
                    <div className={styles.loaderContainer}>
                        <Loader />
                    </div>
                ) : (
                    <>
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
                            onClick={sendCode}
                        />
                    </>
                )}
            </AuthDialog>
        );
    }
    return (
        <AuthDialog title={loading ? "" : "Send verification"}>
            {loading ? (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            ) : (
                <>
                    <p className={styles.text}>
                        Input the 6 digit code that has been sent to your email
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
                        Did not receive email? Check your spam folder.<br/> If you
                        have not received you email,contact support.
                    </p>
                </>
            )}
        </AuthDialog>
    );
};

export default Dialog;
