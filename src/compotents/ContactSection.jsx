import ContactCTA from "./ContactCTA";

export default function ContactSection({page}) {

    if (page === "home"){
        return (
          <section className="contact-section">
              <h1>Mangler i praktikant?</h1>
              <ContactCTA />
          </section>
        );
    }

    else if (page === "contact"){
  return (
    <section className="contact-section">
      <h1>Lad os snakke</h1>
      <div>
        <h3>RING</h3>
        <a href="tel:+4529451049">+45 29 45 10 49</a>
      </div>
      <div>
        <h3>SKRIV</h3>
        <a href="mailto:stine.b.lock@gmail.dk">stine.b.lock@gmail.com</a>
      </div>
    </section>
  );
}
}
