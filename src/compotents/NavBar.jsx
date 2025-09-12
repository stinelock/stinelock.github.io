import { useState } from "react";
import { NavLink } from "react-router";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
}

    return (
      <>
        <nav className="mobile-nav">
          <div className="burger-menu">
            <NavLink className="logo" to="/">
              <img src="" alt="Hjem" />
            </NavLink>
            <span className="nav-btn" on onClick={toggleMenu}>
              menu
            </span>
          </div>

          {isOpen && 
            <div className="menulist">
              <NavLink to="/about">LEGEPLADS</NavLink>
              <hr />
              <NavLink to="/project">PROJEKTER</NavLink>
              <hr />
              <NavLink to="/contact">KONTAKT MIG</NavLink>
            </div>}
        </nav>
        <nav className="nav-desktop">
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

