import arrowIcon from "/img/arrow-up-right.svg";

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2025 My Portfolio</p>

      <div className="link-container">
        <a href="mailto:stine.b.lock@gmail.dk" className="footer-link">
          EMAIL
          <img src={arrowIcon} alt="Email Icon" />
        </a>
        <a href="https://github.com/stinelock">
          GITHUB
          <img src={arrowIcon} alt="GitHub Icon" />
        </a>
        <a href="https://www.linkedin.com/in/stinelock">
          LINKEDIN
          <img src={arrowIcon} alt="LinkedIn Icon" />
        </a>
      </div>
    </footer>
  );
}
