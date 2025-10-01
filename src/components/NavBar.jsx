import { AnimatePresence, motion } from "motion/react";
// import { stagger } from "motion/react";
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
    closed: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const navItems = [
    {
      type: "link",
      to: "/",
      label: "PROJEKTER",
      state: { scrollTo: "projects" },
    },
    {
      type: "hr",
    },
    {
      type: "link",
      to: "/legeplads",
      label: "LEGEPLADS",
    },
    {
      type: "hr",
    },
    {
      type: "link",
      to: "/kontakt",
      label: "KONTAKT MIG",
      className: "contact-cta",
    },
  ];

  const MotionNavLink = motion.create(NavLink);

  return (
    <>
      {/* Header med logo og burger-knap */}
      <header className="site-header">
        <NavLink to="/" onClick={handleLogoClick}>
          <img src="/img/logo.png" alt="Logo" className="logo" />
        </NavLink>

        {/*Desktop navigation */}
        <nav className="nav-desktop">
          <NavLink to="/" state={{ scrollTo: "projects" }} className="not-cta">
            PROJEKTER
          </NavLink>
          <NavLink to="/legeplads" className="not-cta">
            LEGEPLADS
          </NavLink>
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
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navItems.map((item, i) =>
              item.type === "link" ? (
                <MotionNavLink
                  key={i}
                  to={item.to}
                  onClick={closeMenu}
                  variants={itemVariants}
                  {...(item.state ? { state: item.state } : {})}
                  className={item.className}
                >
                  {item.label}
                </MotionNavLink>
              ) : (
                <motion.hr key={i} variants={itemVariants} />
              )
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
