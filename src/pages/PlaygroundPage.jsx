export default function PlaygroundPage() {
  return (
    <>
      <main className="page-playground">
        <section className="intro-playground">
          <h1>Legeplads</h1>
          <h2>
            Jeg arbejder med skærmstørrelser og pixels,
            <br />
            men leger med penselsstrøg og stribestrik
          </h2>
        </section>
        <section className="project-imgs">
          <div className="img-container">
            <img src="img/vin.png"></img>
          </div>
          <div className="img-container">
            <img src="img/sologmaane.png"></img>
          </div>
          <div className="img-container">
            <img src="img/omvendt.png"></img>
          </div>
        </section>
        <h2 id="center">Jeg holder især af farver og deres kontraster</h2>
        <section className="project-imgs">
          <div className="img-container">
            <img src="img/strik1.jpg"></img>
          </div>
          <div className="img-container">
            <img src="img/strik2.jpg"></img>
          </div>
          <div className="img-container">
            <img src="img/strik3.jpg"></img>
          </div>
        </section>
        <section className="instagram">
          <p>Find analoge kreationer</p>
          <a href="https://www.instagram.com/stines.streger?utm_source=ig_web_button_share_sheet&igsh=Mms4MmM5d2N0MHM1">
            <img src="/img/insta-icon.svg"></img>
          </a>
        </section>
      </main>
    </>
  );
}
