import LazyImage from "../compotents/LazyImage";
import PlaygroundLine from "../compotents/Playgroundline";

export default function PlaygroundPage() {
  return (
    <>
      <main className="page-playground">
        <PlaygroundLine />
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
            <LazyImage src="img/vin.png"></LazyImage>
          </div>
          <div className="img-container">
            <LazyImage src="img/sologmaane.png"></LazyImage>
          </div>
          <div className="img-container">
            <LazyImage src="img/omvendt.png"></LazyImage>
          </div>
        </section>
        <h2 id="center">Jeg holder især af farver og deres kontraster</h2>
        <section className="project-imgs">
          <div className="img-container">
            <LazyImage src="img/strik1.jpg"></LazyImage>
          </div>
          <div className="img-container">
            <LazyImage src="img/strik2.jpg"></LazyImage>
          </div>
          <div className="img-container">
            <LazyImage src="img/strik3.jpg"></LazyImage>
          </div>
        </section>
        <section className="instagram">
          <p>Se mine analoge kreationer!</p>
          <a href="https://www.instagram.com/stines.streger?utm_source=ig_web_button_share_sheet&igsh=Mms4MmM5d2N0MHM1">
            <img src="/img/insta-icon.svg" className="insta"></img>
          </a>
        </section>
      </main>
    </>
  );
}
