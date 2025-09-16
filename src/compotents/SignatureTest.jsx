import { motion } from "framer-motion"; // Correct import for Framer Motion
import { useState, useEffect, useRef } from "react";

export default function SignatureTest() {
  const [paths, setPaths] = useState([]);
  const scrollPathRef = useRef(null);

  // Fetch JSON
  useEffect(() => {
    async function fetchSignature() {
      const res = await fetch("/testsignature.json");
      if (!res.ok) {
        console.error("Kunne ikke hente JSON", res.status);
        return;
      }
      const data = await res.json();
      setPaths(data);
      console.log(data);
    }
    fetchSignature();
  }, []);

  // Scroll-animation for the last path
  useEffect(() => {
    const path = scrollPathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.visibility = "visible"; // Make visible when ready

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollPosition / maxScroll;
      path.style.strokeDashoffset = length * (1 - progress); // Update strokeDashoffset
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1500 3000"
      style={{ width: "100%", height: "auto" }}
    >
      <g>
        {paths.slice(0, -1).map((path, index) => (
          <motion.path
            key={index}
            d={path.d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        ))}
      </g>

      {paths.length > 0 && (
        <path
          ref={scrollPathRef}
          d={paths[paths.length - 1].d}
          style={{ visibility: "hidden" }} // Initially hidden
        />
      )}
    </svg>
  );
}
