import { NavLink } from "react-router-dom";
import arrowIcon from "/img/arrow-up-right.svg";

export default function Footer() {
  return (
    <footer>
      <div className="link-container">
        <a href="mailto:stine.b.lock@gmail.dk" className="footer-link">
          EMAIL
          <img src={arrowIcon} alt="Email Icon" />
        </a>
        <a href="https://github.com/stinelock">
          GITHUB
          <img src={arrowIcon} alt="GitHub Icon" />
        </a>
        <a href="https://www.linkedin.com/in/stine-blaabjerg-lock-276558325/">
          LINKEDIN
          <img src={arrowIcon} alt="LinkedIn Icon" />
        </a>
      </div>
      <div className="footer-signature">
        <NavLink to="/">
          <img src="/img/signature.png"></img>
        </NavLink>
        <p>&copy; 2025 Stine Blaabjerg Lock</p>
      </div>
    </footer>
  );
}
