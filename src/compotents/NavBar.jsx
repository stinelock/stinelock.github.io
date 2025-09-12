import { useState } from "react";
import { NavLink } from "react-router";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);

    return (
      <>
        <nav className="mobile-nav">
          <div className="burger-menu">
            <i className="nav-btn" on onClick={toggleMenu}></i>
          </div>

          <div className={`menu ${isOpen ? "open" : "closed"}`}>
            <NavLink to="/">
              <img src="" alt="Hjem" />
            </NavLink>
            <NavLink to="/about">LEGEPLADS</NavLink>
            <NavLink to="/project">PROJEKTER</NavLink>
            <NavLink to="/contact">KONTAKT MIG</NavLink>
          </div>
        </nav>
        <nav className="desktop-nav">
            <NavLink to="/">
              <img src="" alt="Hjem" />
            </NavLink>
            <NavLink to="/about">LEGEPLADS</NavLink>
            <NavLink to="/project">PROJEKTER</NavLink>
            <NavLink to="/contact">KONTAKT MIG</NavLink>
        </nav>
      </>
    );
  };
}
