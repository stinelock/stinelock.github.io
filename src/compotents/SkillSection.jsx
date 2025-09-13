import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  { text: "VS Code", top: "10%", left: "15%", speed: 50, rotation: 5 },
  { text: "GitHub", top: "20%", left: "60%", speed: -80, rotation: -10 },
  { text: "React", top: "15%", left: "25%", speed: 120, rotation: 15 },
  { text: "Figma", top: "30%", left: "55%", speed: -60, rotation: 0 },
  { text: "Photoshop", top: "28%", left: "20%", speed: 100, rotation: -5 },
  { text: "Illustrator", top: "45%", left: "50%", speed: -90, rotation: 10 },
  { text: "AfterEffect", top: "45%", left: "30%", speed: 70, rotation: -15 },
];
export default function SkillPills() {
  const { scrollYProgress } = useScroll();

  // Her kaldes useTransform én gang per pill **uden for map**
  const yValues = skills.map(skill =>
    useTransform(scrollYProgress, [0, 1], [0, skill.speed])
  );

  return (
    <div className="skill-container" style={{ position: "relative", height: "200vh" }}>
      {skills.map(({ text, top, left, rotation }, i) => (
        <motion.div
          key={i}
          className="skill-pill"
          style={{
            position: "absolute",
            top,
            left,
            y: yValues[i],  // brug transformen fra arrayet
            rotate: rotation, // manuel rotation
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}