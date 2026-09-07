import SectionHeading from './SectionHeading';
import { hazards } from '../data/siteData';

export default function HazardsSection() {
  return (
    <section className="section" id="hazards">
      <div className="container">
        <SectionHeading eyebrow="Know the threats" title="Hazards that affect Pasig" intro="Understand what to expect, watch official advisories, and take action before conditions become dangerous." />
        <div className="hazard-grid">
          {hazards.map((hazard) => (
            <article className="hazard-card" key={hazard.title}>
              <span className="icon-box"><img src={hazard.icon} alt="" /></span>
              <h3>{hazard.title} <small>{hazard.localName}</small></h3>
              <p>{hazard.description}</p>
              <a href="#preparedness">How to prepare <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
