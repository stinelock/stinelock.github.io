import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  { text: "VS Code", top: "10%", left: "15%", speed: 50 },
  { text: "GitHub", top: "20%", left: "60%", speed: -80 },
  { text: "React", top: "18%", left: "25%", speed: 120 },
  { text: "Figma", top: "30%", left: "50%", speed: -60 },
  { text: "Photoshop", top: "30%", left: "10%", speed: 100 },
  { text: "Illustrator", top: "62%", left: "50%", speed: -90 },
  { text: "AfterEffects", top: "55%", left: "30%", speed: 70 },
];
export default function SkillPills() {
  const { scrollYProgress } = useScroll();

  // Her kaldes useTransform én gang per pill **uden for map**
  const yValues = skills.map((skill) =>
    useTransform(scrollYProgress, [0, 1], [0, skill.speed])
  );

  return (
    <div className="skill-container">
      {skills.map(({ text, top, left }, i) => (
        <motion.div
          key={i}
          className="skill-pill"
          style={{
            position: "absolute",
            top,
            left,
            y: yValues[i], // brug transformen fra arrayet
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}
