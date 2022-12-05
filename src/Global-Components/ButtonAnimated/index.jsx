import { useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";

const ButtonAnimated = ({ content = "loading", onClick }) => {
  const [animation, setAnimation] = useState(styles.off);

  const className =
    animation &&
    content.toLowerCase() !== "completed" &&
    content.toLowerCase() !== "error" &&
    content.toLowerCase() !== "failed"
      ? animation
      : styles[content];

  useEffect(() => {
    setAnimation(styles.off);

    setTimeout(() => {
      setAnimation(styles.buttonContainer);
    }, 1000);
  }, [content]);

  return (
    <div className={className}>
      {content.toLowerCase() !== "completed" &&
        content.toLowerCase() !== "error" &&
        content.toLowerCase() !== "failed" ? (
          <>
            <button />
            <span>{content === "" ? "Loading" : content}</span>
          </>
        )
        : null
      }

      {content.toLowerCase() === "completed" ? <Success onClick={onClick}/> : null}
      {(content.toLowerCase() === "error" ||
        content.toLowerCase() === "failed") ? <Error onClick={onClick}/> : null}
    </div>
  );
};

const Success = ({ onClick }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M27 9L13 23L6 16"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Error = ({ onClick }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M25 7L7 25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 25L7 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ButtonAnimated;
