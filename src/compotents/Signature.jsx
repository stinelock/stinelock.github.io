import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Signature({ introRef, contactRef }) {
  const [paths, setPaths] = useState([]); // array til pathobjekter
  const [viewBox, setViewBox] = useState("0 0 800 2850");
  const [svgHeight, setSvgHeight] = useState("auto"); // state til svg højde
  const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });

  const { scrollYProgress } = useScroll(); // scroll progress for hele siden

  const svgRef = useRef(null); // ref til SVG-elementet
  const pathRef = useRef(null); // ref til DOM-elementet med ref={pathRef}
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]); //pathLength er værdien mellem 0-1 der afspejler scrollYProgress

  //Fetch data
  async function fetchSignature() {
    const res = await fetch("/signature.json"); //fetch data
    const data = await res.json();

    // Vælg mellem mobile og desktop paths
    const isMobile = window.innerWidth < 768;
    const selected = isMobile ? data.mobile : data.desktop;
    setViewBox(selected.viewBox);
    setPaths(selected.paths);
  }

  //dynamisk kalkulering af svg højde baseret på intro og contact sektioner
  useEffect(() => {
    async function setupSvg() {
      await fetchSignature(); // Step 1: hent paths

      function updateSvgHeight() {
        if (introRef?.current && contactRef?.current) {
          const introBottom =
            introRef.current.offsetTop + introRef.current.offsetHeight;

          const contactTop = contactRef.current.offsetTop;

          const height = contactTop - introBottom;

          if (window.innerWidth < 768) {
            // Mobile: Use auto height for responsiveness
            setSvgHeight("auto");
          } else {
            // Tablet/Desktop: Set explicit height
            setSvgHeight(height > 0 ? height : 0);
          }
        }
      }

      updateSvgHeight();

      window.addEventListener("resize", updateSvgHeight);
      return () => window.removeEventListener("resize", updateSvgHeight);
    }

    setupSvg();
  }, [introRef, contactRef]);

  useEffect(() => {
  console.log("Paths:", paths);
  console.log("SVG Ref:", svgRef.current);
  console.log("Path Ref:", pathRef.current);

    // Calculate the position of the image when the path is available
    if (pathRef.current && svgRef.current) {
      console.log("Path Ref:", pathRef.current);
      console.log("SVG Ref:", svgRef.current);

      const pathLength = pathRef.current.getTotalLength();
      console.log("Path Length:", pathLength);

      const endPoint = pathRef.current.getPointAtLength(pathLength); // Get the end point of the path
      console.log("End Point:", endPoint);
      // Get the bounding box of the SVG in the viewport
      const svgRect = svgRef.current.getBoundingClientRect();
      console.log("SVG Rect:", svgRect);

      // Calculate the position of the image relative to the viewport
      setImagePosition({
        top: svgRect.top + endPoint.y,
        left: svgRect.left + endPoint.x,
      });
    } else {
      console.log("Path Ref or SVG Ref is null");
    }
  }, [paths, svgHeight]);

  console.log(imagePosition);

  return (
    <div style={{ position: "relative" }}>
      <motion.svg
        ref={svgRef}
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={{ width: "100%", height: svgHeight }} // sætter svg højde dynamisk
        preserveAspectRatio="xMidYMid meet"
      >
        <g id="Layer_1-2" data-name="Layer 1-2">
          {paths.map((path, index) => {
            const MotionComponent = motion.path;

            if (path.scroll) {
              // Scroll-baseret animation (path med scroll: true)
              return (
                <MotionComponent
                  key={index}
                  ref={index == path.length - 1 ? pathRef : null}
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
        alt="Phone"
        style={{
          position: "absolute",
          top: `${imagePosition.top}px`,
          left: `${imagePosition.left}px`,
          transform: "translate(-50%, -50%)", // Center the image at the end of the path
          width: "50px", // Adjust the size of the image
          height: "auto", // Maintain aspect ratio
        }}
      />
    </div>
  );
}
