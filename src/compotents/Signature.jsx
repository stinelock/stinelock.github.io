import { motion } from "motion/react";
import { useState, useEffect } from "react";


export default function Signatur() {
const [paths, setPaths] = useState([]);

useEffect(() => {
 fetchSignature();
}, []);

async function fetchSignature(){
  const response = await fetch("/signature.json");
  const data = await response.json();
  setPaths(data);
  console.log(data);
}

  return (
    <motion.svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 861 223.26"
      className="signature"
    >
      <g id="Layer_1-2" data-name="Layer 1-2">
        {paths.map((path, index) => {
          const MotionComponent =
            motion.path;
          return (
            <MotionComponent
              key={index}
              className={path.className}
              d={path.d} // For "path"
              points={path.points} // For "polyline"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: path.duration,
                delay: path.delay,
                ease: "easeOut",
              }}
            />
          );
        })}
      </g>
    </motion.svg>
  );
}
