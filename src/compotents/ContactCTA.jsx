import { NavLink } from "react-router-dom";

export default function ContactCTA() {
  return (
    <NavLink to="/kontakt" className="contact-cta">
      <span>KONTAKT MIG</span>
    </NavLink>
  );
}
