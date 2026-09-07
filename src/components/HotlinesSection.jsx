import SectionHeading from './SectionHeading';
import { hotlines } from '../data/siteData';

export default function HotlinesSection() {
  return (
    <section className="section section--navy" id="hotlines">
      <div className="container">
        <div className="hotline-heading">
          <SectionHeading eyebrow="Reach us anytime" title="Pasig City emergency hotlines" intro="Save these numbers now. In an emergency, state your name, exact location, and what happened." light />
          <div className="emergency-badge"><span>Primary emergency line</span><a href="tel:86430000">8643-0000</a></div>
        </div>
        <div className="hotline-grid">
          {hotlines.map((hotline) => (
            <article className="hotline-card" key={hotline.category}>
              <p className="hotline-card__category">{hotline.category}</p>
              <a className="hotline-card__number" href={hotline.href}>{hotline.number}</a>
              {hotline.secondaryNumber && <><span className="hotline-card__or">or</span><a className="hotline-card__number hotline-card__number--secondary" href={hotline.secondaryHref}>{hotline.secondaryNumber}</a></>}
              <p className="hotline-card__label">{hotline.label}</p>
            </article>
          ))}
        </div>
        <p className="hotline-note">Calls may be subject to your network provider. For immediate life-threatening danger, contact the appropriate emergency service.</p>
      </div>
    </section>
  );
}
