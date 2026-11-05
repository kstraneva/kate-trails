import React from 'react';

const SIZE = 80;
const PAD = 6;
const MAX_POINTS = 200;

function outlinePath(latlng) {
  const step = Math.max(1, Math.floor(latlng.length / MAX_POINTS));
  const sampled = latlng.filter((_, i) => i % step === 0);
  const midLat = sampled.reduce((sum, [lat]) => sum + lat, 0) / sampled.length;
  const xs = sampled.map(([, lng]) => lng * Math.cos((midLat * Math.PI) / 180));
  const ys = sampled.map(([lat]) => -lat);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const scale = (SIZE - 2 * PAD) / Math.max(maxX - minX, maxY - minY);
  const offsetX = (SIZE - (maxX - minX) * scale) / 2;
  const offsetY = (SIZE - (maxY - minY) * scale) / 2;
  return sampled
    .map((_, i) => `${i ? 'L' : 'M'}${((xs[i] - minX) * scale + offsetX).toFixed(1)},${((ys[i] - minY) * scale + offsetY).toFixed(1)}`)
    .join('');
}

export default function TrailCards({ peaks, activeSlug, onSelect }) {
  return (
    <nav className="cards">
      {peaks.map((p) => (
        <button key={p.slug} className={`card${p.slug === activeSlug ? ' active' : ''}`} onClick={() => onSelect(p.slug)}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} aria-hidden="true">
            <path d={outlinePath(p.streams.latlng)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="card-name">{p.name}</span>
        </button>
      ))}
    </nav>
  );
}
