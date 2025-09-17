import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Signature({ introRef, contactRef }) {
  const [paths, setPaths] = useState([]); // array til pathobjekter
  const { scrollYProgress } = useScroll(); // scroll progress for hele siden
  const [viewBox, setViewBox] = useState("0 0 800 2850");
  const [svgHeight, setSvgHeight] = useState(2850); // state til svg højde

  const pathRef = useRef(null); // ref til DOM-elementet med ref={pathRef}
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]); //pathLength er værdien mellem 0-1 der afspejler scrollYProgress

  useEffect(() => {
    fetchSignature();
  }, []);

  async function fetchSignature() {
    const res = await fetch("/signature.json"); //fetch data
    const data = await res.json();

    // Vælg mellem mobile og desktop paths
    const isMobile = window.innerWidth < 768;
    const selected = isMobile ? data.mobile : data.desktop;
    setViewBox(selected.viewBox);
    setPaths(selected.paths);
  }

  useEffect(() => {
    async function setupSvg() {
      await fetchSignature(); // Step 1: hent paths

      function updateSvgHeight() {
        if (introRef?.current && contactRef?.current) {
          const introBottom =
            introRef.current.getBoundingClientRect().bottom + window.scrollY;
          const contactTop =
            contactRef.current.getBoundingClientRect().top + window.scrollY;
          const height = contactTop - introBottom;
          setSvgHeight(height > 0 ? height : 0);
        }
      }

      updateSvgHeight(); // Step 2: opdater højde

      window.addEventListener("resize", updateSvgHeight);
      return () => window.removeEventListener("resize", updateSvgHeight);
    }

    setupSvg();
  }, [introRef, contactRef]);

  console.log(paths);

  return (
    <motion.svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={{height: svgHeight}} // sætter svg højde dynamisk
    >
      <g id="Layer_1-2" data-name="Layer 1-2">
        {paths.map((path, index) => {
          const MotionComponent = motion.path;

          if (path.scroll) {
            // Scroll-baseret animation (path med scroll: true)
            return (
              <MotionComponent
                key={index}
                ref={pathRef}
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
  );
}
