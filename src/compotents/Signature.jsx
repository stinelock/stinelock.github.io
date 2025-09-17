import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Signature() {
  const [paths, setPaths] = useState([]);
  const [viewBox, setViewBox] = useState("");
  const { scrollYProgress } = useScroll();

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

  console.log(paths);

  return (
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

          if (path.scroll) {
            // Scroll-baseret animation

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
