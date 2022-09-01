import React from "react";
import AuthDialog from "../../../../Global-Components/AuthDialog";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import Input from "../../../../Global-Components/Input";
import Loader from "../../../../Global-Components/Loader";
import Divider from "../Divider";
import styles from "./styles.module.scss";

const Dialog = ({ setEmail, sendCode, loading }) => {
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
                        around the world for real-world prizes in a 24-player
                        battle royale. Grab as many coins as you can in the
                        arena without getting fragged. Survive until the end to
                        take home the big loot!
                    </p>
                    <ButtonRounded
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
                        autoComplete="on"
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
};

export default Dialog;
