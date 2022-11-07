import React from "react";
import styles from "./styles.module.scss";

const ButtonRounded = ({ color = "blue", title, onClick, additionalStyles}) => {
    return (
        <button
            onClick={onClick}
            className={
                color === "blue" ? 
                styles.buttonBlue 
                : 
                color === "disabled" ?
                styles.buttonDisabled
                :
                styles.buttonYellow
            }
            style = {{...additionalStyles}}
        >
            {title}
        </button>
    );
};

export default ButtonRounded;
