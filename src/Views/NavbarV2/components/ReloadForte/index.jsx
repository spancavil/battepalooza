import * as React from "react";
import styles from "./styles.module.scss";
/**
 *
 * @param handleClick The function when clicked
 * @param className "normal" => not clicked "rotate" => loading
 * @returns
 */
function ReloadForte({ handleClick, clase }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      width="20"
      height="20"
      fill="#1e90ff"
      viewBox="0 0 24 24"
      className={clase === "normal" ? styles.normal : styles.reload}
    >
      <path
        fill="current"
        fillRule="evenodd"
        d="M20.3 13.43c-.524-.163-1.083.127-1.25.65-.97 2.964-3.751 4.957-6.87 4.92-3.914.044-7.125-3.086-7.18-7 .055-3.913 3.266-7.044 7.18-7 1.698-.004 3.343.587 4.65 1.67l-2.17-.36c-.545-.09-1.06.28-1.15.824v.006c-.09.545.28 1.06.824 1.15h.006l4.24.7h.17c.116 0 .231-.02.34-.06.037-.014.07-.034.1-.06.072-.027.14-.064.2-.11l.09-.11c0-.05.09-.09.13-.15.04-.06 0-.1.05-.14.028-.058.051-.118.07-.18l.75-4c.105-.552-.258-1.085-.81-1.19-.552-.105-1.085.258-1.19.81l-.27 1.45C16.536 3.8 14.395 3 12.18 3 7.162 2.956 3.055 6.982 3 12c.055 5.018 4.162 9.044 9.18 9 4.01.062 7.59-2.503 8.82-6.32.157-.53-.145-1.086-.675-1.243l-.025-.007z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ReloadForte;
