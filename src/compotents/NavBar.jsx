import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import ContactCTA from "./ContactCTA";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    closeMenu();
    navigate("/", { state: { scrollTo: "top" } }); // Pass state to trigger scroll-to-top
  };


  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);

  };

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {/* Header med logo og burger-knap */}
      <header className="site-header">
        <NavLink to="/" onClick={handleLogoClick}>
          <img src="/img/logo.png" alt="Logo" className="logo" />
        </NavLink>

        {/*Desktop navigation */}
        <nav className="nav-desktop">
          <NavLink to="/" state={{ scrollTo: "projects" }}>
            PROJEKTER
          </NavLink>
          <NavLink to="/legeplads">LEGEPLADS</NavLink>
          <ContactCTA />
        </nav>

        {/* Burger-knap */}
        <div
          className="burger-btn"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          {isOpen ? "Luk" : "Menu"}
        </div>
      </header>

      {/* Mobil menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="main-navigation"
            className="menu-overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <NavLink
              to="/"
              state={{ scrollTo: "projects" }}
              onClick={closeMenu}
            >
              PROJEKTER
            </NavLink>
            <hr />
            <NavLink to="/legeplads" onClick={closeMenu}>
              LEGEPLADS
            </NavLink>
            <hr />
            <NavLink to="/kontakt" onClick={closeMenu} className="contact-cta">
              KONTAKT MIG
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
