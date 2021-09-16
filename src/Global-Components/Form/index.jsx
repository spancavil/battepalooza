import React from 'react';

const Form = ({
  inputs,
  buttons,
  title,
  subtitle,
  desc,
  width,
  height,
  condiciones,
}) => {
  return (
    /* Me parece que esas son las props que tiene que tener para reutilizarlo en las 4 pantallas 😎 */
    /* inputs, buttons, title, subtitle, desc, width, height, condiciones */
    /* Habria que ver el tema de los estados y para validar el componente */
    /* Ver lo de PropTypes tambien */

    (
      <div width={width} height={height}>
        <form>
          <i /> {/* Icono de Cerrar */} {/* ⚠ SIEMPRE HAY ⚠ */}
          <h2 /> {title} {/* Titulo */} {/* ⚠ SIEMPRE HAY ⚠ */}
          {subtitle && <span />}

          {inputs.map ()} {/* Input/s con su label ¿Validacion? */}

          {buttons.map ()}
          {/* Boton/s para submitear */}
          {/* ⚠ SIEMPRE HAY ⚠ */}

          {condiciones && <div> <checkbox /> <span /></div>}
          {/* Checkbox para aceptar terminos y condiciones */}

          {desc && <span />} {/* Letra chica debajo del boton */}
        </form>
      </div>
    )
  );
};

export default Form;
