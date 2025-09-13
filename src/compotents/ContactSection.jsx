import ContactCTA from "./ContactCTA";

export default function ContactSection() {
  return (
    <section className="contact-section">

        {/* Jeg tænker at jeg i den her sektoin kan lave en conditional rendering hvor mit tlf og email skal vises hvis man er på "/Contact" params?? og CTA knap hvis det er på forsiden*/}
        
      <h2>Kontakt mig</h2>
      <ContactCTA />
    </section>
  );
}
