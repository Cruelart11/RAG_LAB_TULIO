import SectionHeading from './SectionHeading';
import { evacuationGroups } from '../data/siteData';

export default function EvacuationSection() {
  return (
    <section className="section" id="evacuation">
      <div className="container">
        <div className="heading-row">
          <SectionHeading eyebrow="Where to go" title="Designated evacuation centers" intro="Center availability depends on the emergency. Wait for official instructions and use the safest route." />
          <a className="text-link" href="tel:86430000">Confirm an open center <span aria-hidden="true">→</span></a>
        </div>
        <div className="evacuation-grid">
          {evacuationGroups.map((group) => (
            <article className="location-card" key={group.area}>
              <div className="location-card__heading"><span className="pin" aria-hidden="true">⌖</span><h3>{group.area}</h3></div>
              <ul>{group.centers.map((center) => <li key={center}>{center}</li>)}</ul>
              {group.note && <p className="location-card__note">{group.note}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
