import SectionHeading from './SectionHeading';
import { preparednessSteps } from '../data/siteData';

export default function PreparednessSection() {
  return (
    <section className="section section--blue" id="preparedness">
      <div className="container preparedness-layout">
        <div className="preparedness-copy">
          <SectionHeading eyebrow="Four simple steps" title="Prepare your family today" intro="A few decisions made now can save precious time during an emergency." />
          <div className="steps">
            {preparednessSteps.map((step) => (
              <article className="step" key={step.number}>
                <span className="step__number">{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </article>
            ))}
          </div>
        </div>
        <figure className="preparedness-photo">
          <img src={`${import.meta.env.BASE_URL}assets/images/volunteers.png`} alt="Volunteers packing food and relief supplies" />
          <figcaption><span>Prepared communities recover faster.</span><small>Plan together · Practice together</small></figcaption>
        </figure>
      </div>
    </section>
  );
}
