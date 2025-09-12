import { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <>
      <nav className="mobile-nav">
        <div className="burger-menu">
          <NavLink className="logo" to="/">
            Logo
          </NavLink>
          <span className="nav-btn" onClick={toggleMenu}>
            {isOpen ? "close" : "menu"}
          </span>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="menulist"
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
              <NavLink to="/contact">KONTAKT MIG</NavLink>
            </motion.div>
          )}
        </AnimatePresence>
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
}
