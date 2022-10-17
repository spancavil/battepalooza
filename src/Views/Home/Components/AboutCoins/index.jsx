import Button from "../../../../Global-Components/Button";
import styles from "./styles.module.scss";

const AboutCoins = ({ desktop, hd }) => {
 /*  useEffect(() => {
    const about = document.getElementById("about");
    const fondo = document.getElementById("content2");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (hd) {
        if (scrollY > 300 && scrollY < 1000) {
          fondo.style.left = (scrollY - 750) * 0.03 - 5 + "px";
          about.style.right = (scrollY - 750) * 0.03 + 14 + "px";

          about.style.top = (scrollY - 400) * 0.1 + 10 + "px";
        }
      } else if (desktop) {
        if (scrollY > 300 && scrollY < 700) {
          fondo.style.left = (scrollY - 750) * 0.04 - 10.5 + "px";
          about.style.right = (scrollY - 750) * 0.04 + 18 + "px";
          about.style.top = (scrollY - 400) * 0.05 + "px";
        }
        //Mobile and ipads
      } else {
        if (scrollY > 200 && scrollY < 1000) {
          fondo.style.left = (scrollY - 750) * 0.025 - 10 + "px";
          about.style.left = -(scrollY - 750) * 0.025 - 8 + "px";
        }
      }
    };

    window.addEventListener("scroll", parallax);

    return () => {
      window.removeEventListener("scroll", parallax);
    };
  }, [desktop, hd]); */

  return (
    <div className={styles.content2} id="content2">
      <article id="about">
        <h2>
          Play Battlepalooza <br /> with NCoins!<b>!</b>
        </h2>
        <h4>
          Battlepalooza is <b>powered</b> by Forte.
        </h4>
        <p>For more information press the button below.</p>
        <a href={"https://forte.io/"} rel="noreferrer" target="_blank">
          <Button title={"About Forte"} />
        </a>
      </article>
    </div>
  );
};

export default AboutCoins;
