export default function Brand({ compact = false }) {
  return (
    <a className={`brand ${compact ? 'brand--compact' : ''}`} href="#home" aria-label="Pasig City DRRMO home">
      <span className="brand__mark" aria-hidden="true">PC</span>
      <span className="brand__copy">
        <span className="brand__name">Pasig City <strong>DRRMO</strong></span>
        {!compact && <span className="brand__tagline">Disaster Risk Reduction &amp; Mgmt</span>}
      </span>
    </a>
  );
}
