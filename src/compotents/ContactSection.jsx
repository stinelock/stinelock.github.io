import ContactCTA from "./ContactCTA";
import { forwardRef } from "react";

const ContactSection = forwardRef(({page}, ref) => {
    if (page === "home") {
      return (
        <section ref={ref} className="contact-section">
          <h1>Mangler I praktikant?</h1>
          <ContactCTA />
        </section>
      );
    } else if (page === "kontakt") {
      return (
        <section ref={ref} className="contact-section">
          <h1>Lad os snakke</h1>
          <div>
            <h2>RING</h2>
            <a href="tel:+4529451049">+45 29 45 10 49</a>
          </div>
          <div>
            <h2>SKRIV</h2>
            <a href="mailto:stine.b.lock@gmail.dk">stine.b.lock@gmail.com</a>
          </div>
        </section>
      );
    }


});

export default ContactSection;