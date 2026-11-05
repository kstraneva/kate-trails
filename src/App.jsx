import React, { useState } from 'react';
import { PEAKS } from './peaks.js';
import RouteSpace from './RouteSpace.jsx';
import TrailCards from './TrailCards.jsx';

const miles = (m) => `${(m / 1609.344).toFixed(1)} mi`;
const feet = (m) => `${Math.round(m * 3.28084).toLocaleString()} ft`;

export default function App() {
  const fromHash = () => PEAKS.find((p) => p.slug === window.location.hash.slice(1))?.slug || PEAKS[0].slug;
  const [slug, setSlugState] = useState(fromHash);
  const setSlug = (s) => { window.location.hash = s; setSlugState(s); };
  const peak = PEAKS.find((p) => p.slug === slug);
  const { stats } = peak;

  return (
    <div className="page">
      <header>
        <TrailCards peaks={PEAKS} activeSlug={slug} onSelect={setSlug} />
      </header>
      <section className="info">
        <div>
          <h2>{peak.name}</h2>
          <div className="sub">{peak.place} · {peak.kind} · {peak.date}</div>
        </div>
        <dl>
          <div><dt>Distance</dt><dd>{miles(stats.distance)}</dd></div>
          <div><dt>Gain</dt><dd>▲ {feet(stats.gain)}</dd></div>
          <div><dt>Descent</dt><dd>▼ {feet(stats.descent)}</dd></div>
          <div><dt>High / low</dt><dd>{feet(stats.high)} / {feet(stats.low)}</dd></div>
        </dl>
      </section>
      <main>
        <RouteSpace key={peak.slug} streams={peak.streams} mode="grade" />
      </main>
    </div>
  );
}
