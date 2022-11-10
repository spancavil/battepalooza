import React, {useState, useEffect, createRef} from "react";
import styles from "./style.module.scss";

/**
 * Input para los dialogs
 * @param label Titulo del input
 * @param width Ancho del input individual
 * @param type Tipo de input (number, email, etc)
 * @param handleChange Función que devuelve el valor del input
 */

const SixInput = ({
    label,
    width,
    widthContainer,
    type,
    handleChangeVerificationCode,
    autoComplete = "off",
}) => {
    const [inputValues, setInputValues] = useState({
        verification1: "",
        verification2: "",
        verification3: "",
        verification4: "",
        verification5: "",
        verification6: "",
    });
    const inputs = [1, 2, 3, 4, 5, 6];
    const inputsRefs = inputs.map(()=> createRef());;

    const handleNumber = (e) => {
      const inputValue = e.target.value;
      const inputName = e.target.name;
      const inputIndex = Number(inputName.replace("verification", "")) - 1;
      //Si no es el value indicado, no se hace nada
      if (!/^\d{1}$/.test(inputValue) && inputValue !== "") {
        return
      }
      //Salto de casilleros
      if (inputValue === "" && inputIndex > 0){
        inputsRefs[inputIndex - 1].current.focus()
      }
      if(inputIndex < 5 && inputValue !== ""){
        inputsRefs[inputIndex + 1].current.focus()
      }
      //Setteo final de los inputs
      setInputValues({
        ...inputValues,
        [inputName]: inputValue
      });
    }

    useEffect(()=> {
      let numberJoin = "";
      for (const key in inputValues) {
        if (Object.hasOwnProperty.call(inputValues, key)) {
          const element = inputValues[key];
          numberJoin += element
        }
      }
      handleChangeVerificationCode(numberJoin)
    }, [inputValues, handleChangeVerificationCode])

    const handlePaste = (e) => {
      const number = e.clipboardData.getData('text');
      let codigoAux = number
      if (number.length === 7) {
        codigoAux = number.replace(/\s+/g, "");
      }
      if (!/^\d{6}$/.test(codigoAux)) {
        return;
      } else {
        const _numbers = codigoAux.split("");
        let values;
        for (let index = 0; index < _numbers.length; index++) {
          values = {
            ...values,
            [`verification${index + 1}`]: _numbers[index]
          }
        }
        setInputValues(values);
      }
    }

    return (
        <div
            className={styles.inputContainerWhite}
            style={{ width: widthContainer ? widthContainer : null }}
        >
            <label htmlFor={label}>{label}</label>
            <div className={styles.inputsContainer}>
              {inputs.map((input) => {
                  return (
                      <input
                          ref = {inputsRefs[inputs.indexOf(input)]}
                          onPaste={handlePaste}
                          key={input}
                          required
                          autoComplete={autoComplete}
                          id={`verification${input}`}
                          name={`verification${input}`}
                          style={{ width: width }}
                          onChange={handleNumber}
                          autoFocus={input === 1 ? true : false}
                          value = {inputValues[`verification${input}`]}
                          // pattern="\d*"
                          type="number"
                      />
                  );
              })}
            </div>
        </div>
    );
};

export default SixInput;
