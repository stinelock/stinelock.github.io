import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function PlaygroundLine({ introRef, instagramRef }) {
  const [paths, setPaths] = useState([]);
  const [viewBox, setViewBox] = useState("0 0 800 2850");
  const [svgHeight, setSvgHeight] = useState("auto");
  const isMobile = window.innerWidth < 768;

  const { scrollYProgress } = useScroll();
  const svgRef = useRef(null);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Fetch data
  async function fetchSignature() {
    const res = await fetch("/playgroundline.json");
    const data = await res.json();
    const selected = isMobile ? data.mobile : data.desktop;
    setViewBox(selected.viewBox);
    setPaths(selected.paths);
  }

  useEffect(() => {
    async function setupSvg() {
      await fetchSignature();

      function updateSvgHeight() {
        if (introRef.current && instagramRef.current) {
          const introBottom =
            introRef.current.offsetTop + introRef.current.offsetHeight;
          const instagramTop = instagramRef.current.offsetTop;

          const height = instagramTop - introBottom;

          setSvgHeight(isMobile ? "auto" : height > 0 ? height : 0);
        }
      }

      updateSvgHeight();

      window.addEventListener("resize", updateSvgHeight);
      return () => window.removeEventListener("resize", updateSvgHeight);
    }

    setupSvg();
  }, [introRef, instagramRef]);

  useEffect(() => {
    console.log("Calculated SVG height:", svgHeight);
  }, [svgHeight]);

  return (
    <div style={{ position: "relative" }}>
      <motion.svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={{ width: "100%", height: svgHeight }}
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {paths.map((path, index) =>
            path.scroll ? (
              <motion.path
                key={index}
                d={path.d}
                className={path.className}
                initial={{ pathLength: 0 }}
                style={{ pathLength }}
              />
            ) : (
              <motion.path
                key={index}
                d={path.d}
                className={path.className}
                initial={{
                  strokeDashoffset: isMobile ? 800 : 1000,
                }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: path.duration,
                  delay: path.delay,
                  ease: "easeOut",
                }}
              />
            )
          )}
        </g>
      </motion.svg>
    </div>
  );
}
