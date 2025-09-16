export default function PlaygroundPage() {
  return (
    <>
      <main className="page-playground">
        <section className="intro-playground">
          <h1>Legeplads</h1>
          <p>Jeg arbejder i mere end skærmstørrelser og pixels</p>
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
        <section className="project-imgs">
          <div className="img-container">
            <img></img>
          </div>
          <div className="img-container">
            <img></img>
          </div>
          <div className="img-container">
            <img></img>
          </div>
        </section>
        <section className="instagram">
          <p>Flere analoge kreationer</p>
          <a href="https://www.instagram.com/stines.streger?utm_source=ig_web_button_share_sheet&igsh=Mms4MmM5d2N0MHM1">
            <img src="/img/insta-icon.svg"></img>
          </a>
        </section>
      </main>
    </>
  );
}
