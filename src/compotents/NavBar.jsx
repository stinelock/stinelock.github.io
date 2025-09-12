import { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuVariants = {
    hidden: { opacity: 0},
    visible: { opacity: 1},
  };

  return (
    <>
      {/* Header med logo og burger-knap */}
      <header className="site-header">
        <NavLink className="logo" to="/">
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
            <NavLink to="/about">LEGEPLADS</NavLink>
            <hr />
            <NavLink to="/project">PROJEKTER</NavLink>
            <hr />
            <NavLink to="/contact" className="contact-cta">KONTAKT MIG</NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
