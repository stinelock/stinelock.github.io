import { NavLink } from "react-router-dom";
import arrowIcon from "/img/arrow-up-right.svg";

export default function Footer() {
  return (
    <footer>
      <div className="big-link-container">
        <div className="link-container">
          <a href="mailto:stine.b.lock@gmail.dk" className="footer-link">
            EMAIL
            <img src={arrowIcon} alt="Email" />
          </a>
          <a href="https://github.com/stinelock">
            GITHUB
            <img src={arrowIcon} alt="GitHub" />
          </a>
        </div>
        <div className="link-container">
          <a href="https://www.linkedin.com/in/stine-blaabjerg-lock-276558325/">
            LINKEDIN
            <img src={arrowIcon} alt="LinkedIn" />
          </a>
          <a href="https://www.linkedin.com/in/stine-blaabjerg-lock-276558325/">
            INSTAGRAM
            <img src={arrowIcon} alt="Instagram" />
          </a>
        </div>
      </div>

      <div id="footer-signature">
        <NavLink to="/#top">
          <img src="/img/signature.png"></img>
        </NavLink>
        <p>&copy; 2025 Stine Blaabjerg Lock</p>
      </div>
    </footer>
  );
}
