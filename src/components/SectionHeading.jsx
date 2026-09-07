export default function SectionHeading({ eyebrow, title, intro, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  );
}
