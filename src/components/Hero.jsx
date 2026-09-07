export default function Hero() {
  return (
    <>
      <section className="hero" id="home" style={{ '--hero-image': `url("${import.meta.env.BASE_URL}assets/images/flood.jpg")` }}>
        <div className="container hero__content">
          <p className="eyebrow eyebrow--light"><span className="status-dot status-dot--light" />Ready · Resilient · Pasig</p>
          <h1>Be ready,<br /><span>Pasigueño.</span></h1>
          <p className="hero__lead">The City Disaster Risk Reduction and Management Office keeps every barangay prepared for typhoons, floods, and earthquakes. Learn the plan, build your kit, and know where to go—before the next storm.</p>
          <div className="hero__actions">
            <a className="button button--bright" href="#preparedness">Start preparing <span aria-hidden="true">→</span></a>
            <a className="button button--ghost" href="#hotlines">Emergency hotlines</a>
          </div>
        </div>
      </section>
      <aside className="alert-bar" aria-label="Portal status notice">
        <div className="container alert-bar__inner">
          <span className="alert-bar__primary"><span className="status-dot" />Information portal</span>
          <span>Weather and river status shown here is not live</span>
          <span className="alert-bar__tag">Preparedness resource</span>
        </div>
      </aside>
    </>
  );
}
