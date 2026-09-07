import { useEffect, useState } from 'react';
import Brand from './Brand';
import { navItems } from '../data/siteData';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="container header__inner">
        <Brand />
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span className="sr-only">Toggle navigation</span>
          <span /><span /><span />
        </button>
        <nav id="site-navigation" className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => <a key={item.target} href={`#${item.target}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a className="button button--small" href="tel:86430000">Call DRRMO</a>
        </nav>
      </div>
    </header>
  );
}
