import Brand from './components/Brand';
import ChatWidget from './components/ChatWidget';
import EvacuationSection from './components/EvacuationSection';
import HazardsSection from './components/HazardsSection';
import Header from './components/Header';
import Hero from './components/Hero';
import HotlinesSection from './components/HotlinesSection';
import PreparednessSection from './components/PreparednessSection';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <HazardsSection />
        <PreparednessSection />
        <EvacuationSection />
        <HotlinesSection />
      </main>
      <footer className="footer">
        <div className="container footer__inner"><Brand compact /><p>City Hall Complex, Caruncho Ave · Ready · Resilient · Pasig</p></div>
      </footer>
      <ChatWidget />
    </>
  );
}
