import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NavLink } from "react-router";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  }

  const menuVariants = {
    hidden: { opacity: 0},
    visible: { opacity: 1},
  };

  return (
    <>
      {/* Header med logo og burger-knap */}
      <header className="site-header">
        <NavLink to="/" onClick={closeMenu} className="logo">
          Logo
        </NavLink>
        <div
          className="burger-btn"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          {isOpen ? "Close" : "Menu"}
        </div>
      </header>

      {/* Fullscreen menu overlay */}
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
            <NavLink to="/about" onClick={closeMenu}>
              LEGEPLADS
            </NavLink>
            <hr />
            <NavLink to="/project" onClick={closeMenu}>
              PROJEKTER
            </NavLink>
            <hr />
            <NavLink to="/contact" onClick={closeMenu} className="contact-cta">
              KONTAKT MIG
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
