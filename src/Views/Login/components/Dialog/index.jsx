import React from "react";
import AuthDialog from "../../../../Global-Components/AuthDialog";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import styles from "./styles.module.scss";

const Dialog = () => {
    return (
        <AuthDialog title={"Welcome to Battlepalooza"}>
            <p className={styles.text}>
                Compete in real-time against live contestants from around the
                world for real-world prizes in a 24-player battle royale. Grab
                as many coins as you can in the arena without getting fragged.
                Survive until the end to take home the big loot!
            </p>
            <ButtonRounded title={"CREATE ACCOUNT"} color="Lalala"/>
        </AuthDialog>
    );
};

export default Dialog;
