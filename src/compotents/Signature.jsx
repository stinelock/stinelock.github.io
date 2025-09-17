import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Signature({ introRef, contactRef }) {
  const [paths, setPaths] = useState([]);
  const [viewBox, setViewBox] = useState("");
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [scrollTarget, setScrollTarget] = useState(null);

  // Brug useEffect for at vente på, at refs er tilgængelige
  useEffect(() => {
    if (introRef?.current && contactRef?.current) {
      setScrollTarget([introRef.current, contactRef.current]);
    }
  }, [introRef, contactRef]);

  // Kun opret useScroll når scrollTarget eksisterer
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end end"],
  });

  const pathRef = useRef(null);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    fetchSignature();
  }, []);

  async function fetchSignature() {
    const res = await fetch("/signature.json");
    const data = await res.json();

    const isMobile = window.innerWidth < 768;
    const selected = isMobile ? data.mobile : data.desktop;
    setViewBox(selected.viewBox);
    setPaths(selected.paths);
  }

  useEffect(() => {
    if (pathRef.current) {
      const pathEl = pathRef.current;
      const point = pathEl.getPointAtLength(pathEl.getTotalLength());

      // Konverter til skærmpixels
      const pt = pathEl.ownerSVGElement.createSVGPoint();
      pt.x = point.x;
      pt.y = point.y;
      const screenPoint = pt.matrixTransform(
        pathEl.ownerSVGElement.getScreenCTM()
      );

      setEndPoint({ x: screenPoint.x, y: screenPoint.y });
    }
  }, [paths]);

  console.log(paths);

  if (!viewBox || !paths.length) {
    return null;
  } //sørger for at der er data før der renderes

  return (
    <div id="signature-container">
      <motion.svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        className="signature"
      >
        <g id="Layer_1-2" data-name="Layer 1-2">
          {paths.map((path, index) => {
            const MotionComponent = motion.path;
            const ref = path.scroll ? pathRef : null;

            if (path.scroll) {
              return (
                <MotionComponent
                  key={index}
                  ref={ref}
                  d={path.d}
                  className={path.className}
                  initial={{ pathLength: 0 }}
                  style={{ pathLength }}
                />
              );
            } else {
              // Automatisk animation
              return (
                <MotionComponent
                  key={index}
                  className={path.className}
                  d={path.d}
                  initial={{ strokeDashoffset: 1000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: path.duration,
                    delay: path.delay,
                    ease: "easeOut",
                  }}
                />
              );
            }
          })}
        </g>
      </motion.svg>
      <img
        src="/img/phone.png"
        alt="End of scroll path"
        id="phone"
        style={{
          position: "absolute",
          left: `${endPoint.x}px`,
          top: `${endPoint.y}px`,
          transform: "translate(-60%, -8%)", // justér efter behov
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
