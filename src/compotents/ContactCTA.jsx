import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const MotionNavLink = motion(NavLink);

export default function ContactCTA() {
  return (
    <MotionNavLink to="/contact" className="contact-cta" whileHover="hover">
      <motion.div
        className="background"
        variants={{
          initial: { height: "0%" },
          hover: { height: "100%" },
        }}
        initial="initial"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <span>KONTAKT MIG</span>
    </MotionNavLink>
  );
}
