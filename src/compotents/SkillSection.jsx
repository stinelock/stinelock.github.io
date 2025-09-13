import SkillPill from "./SkillPill";

export default function SkillSection({ skills }) {
    return (
        <section className="skill-section">
    <SkillPill skill="Adobe Photoshop" />
    <SkillPill skill="Adobe Illustrator" />
    <SkillPill skill="Adobe XD" />
        </section>
    );
}