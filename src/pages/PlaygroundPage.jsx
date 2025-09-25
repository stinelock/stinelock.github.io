import { useRef } from "react";
import LazyImage from "../components/LazyImage";
import PlaygroundLine from "../components/PlaygroundLine";

export default function PlaygroundPage() {
  const introRef = useRef(null);
  const instagramRef = useRef(null);

  return (
    <>
      <main className="page-playground">
        <div className="playground-line-container">
          <PlaygroundLine introRef={introRef} instagramRef={instagramRef} />
        </div>
        <section className="intro-playground" ref={introRef}>
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
        <section className="instagram" ref={instagramRef}>
          <p>Se mine analoge kreationer!</p>
          <a href="https://www.instagram.com/stines.streger?utm_source=ig_web_button_share_sheet&igsh=Mms4MmM5d2N0MHM1">
            <img src="/img/insta-icon.svg" className="insta"></img>
          </a>
        </section>
      </main>
    </>
  );
}
