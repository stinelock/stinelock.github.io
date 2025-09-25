import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Signature({ introRef, contactRef }) {
  const [paths, setPaths] = useState([]);
  const [viewBox, setViewBox] = useState("0 0 800 2850");
  const [svgHeight, setSvgHeight] = useState("auto");
  const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });
  const isMobile = window.innerWidth < 768;

  const { scrollYProgress } = useScroll();

  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const imageRef = useRef(null);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);


  //Fetch data
  async function fetchSignature() {
    const res = await fetch("/signature.json"); //fetch data
    const data = await res.json();

    // Vælg mellem mobile og desktop paths
    const selected = isMobile ? data.mobile : data.desktop;
    setViewBox(selected.viewBox);
    setPaths(selected.paths);
  }

  //dynamisk kalkulering af svg højde baseret på intro og contact sektioner
  useEffect(() => {
    async function setupSvg() {
      await fetchSignature();

      function updateSvgHeight() {
        if (introRef?.current && contactRef?.current) {
          const introBottom =
            introRef.current.offsetTop + introRef.current.offsetHeight;

          const contactTop = contactRef.current.offsetTop;

          const height = contactTop - introBottom;

          isMobile
            ? setSvgHeight("auto")
            : setSvgHeight(height > 0 ? height : 0);
        }
      }

      updateSvgHeight();

      window.addEventListener("resize", updateSvgHeight);
      return () => window.removeEventListener("resize", updateSvgHeight);
    }

    setupSvg();
  }, [introRef, contactRef]);

  useEffect(() => {
    const calculateImagePosition = () => {
      if (pathRef.current && svgRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        const endPoint = pathRef.current.getPointAtLength(pathLength);

        const svg = svgRef.current;
        const point = svg.createSVGPoint();
        point.x = endPoint.x;
        point.y = endPoint.y;

        // Konverter til skærmkoordinater
        const transformed = point.matrixTransform(svg.getScreenCTM());

        // Find containerens bounding box
        const containerRect = svg.parentElement.getBoundingClientRect();

        // Juster så top/left bliver relative til containeren
        setImagePosition({
          top: transformed.y - containerRect.top,
          left: transformed.x - containerRect.left,
        });
      }
    };

    calculateImagePosition();

    const resizeObserver = new ResizeObserver(() => {
      calculateImagePosition();
    });

    if (imageRef.current) {
      resizeObserver.observe(imageRef.current);
    }

    // Cleanup function
    return () => {
      resizeObserver.disconnect();
    };
  }, [paths, svgHeight]);

  return (
    <div style={{ position: "relative" }}>
      <motion.svg
        ref={svgRef}
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={{ width: "100%", height: svgHeight }}
        preserveAspectRatio="xMidYMid meet"
      >
        <g id="Layer_1-2" data-name="Layer 1-2">
          {paths.map((path, index) => {
            const MotionPath = React.forwardRef((props, ref) => {
              return <motion.path {...props} ref={ref} />;
            });
            const isLastPath = index === paths.length - 1;
            const setPathRef = (el) => {
              if (isLastPath) {
                pathRef.current = el;
              }
            };
            if (path.scroll) {
              return (
                <MotionPath
                  key={index}
                  ref={(el) => {
                    if (isLastPath) {
                      pathRef.current = el;
                    }
                  }}
                  d={path.d}
                  className={path.className}
                  initial={{ pathLength: 0 }}
                  style={{ pathLength }}
                />
              );
            } else {
              // Automatisk animation
              return (
                <MotionPath
                  key={index}
                  className={path.className}
                  ref={setPathRef}
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
        className="phone"
        style={{
          position: "absolute",
          top: `${imagePosition.top}px`,
          left: `${imagePosition.left}px`,
          transform: "translate(-60%, -15%)",
          width: isMobile ? "100px" : "200px",
          height: "auto",
          zIndex: 0,
        }}
      />
    </div>
  );
}
