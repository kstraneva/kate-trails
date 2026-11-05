import { elevationStats } from './stats.js';

const files = import.meta.glob('./data/*.json', { eager: true, import: 'default' });

const META = [
  { slug: 'camelback', name: 'Camelback', place: 'Phoenix, Arizona', date: '2025-04-25', kind: 'Trail run' },
  { slug: 'enchantments', name: 'The Enchantments', place: 'Alpine Lakes Wilderness, Washington', date: '2020-07-11', kind: 'Hike' },
  { slug: 'grand-canyon', name: 'Grand Canyon', place: 'Grand Canyon, Arizona', date: '2020-12-23', kind: 'Hike' },
  { slug: 'utah-trail-run', name: 'Little Cottonwood', place: 'Alta, Utah', date: '2025-07-09', kind: 'Trail run' },
];

export const PEAKS = META.map((m) => {
  const streams = files[`./data/${m.slug}.json`];
  const { gain, descent } = elevationStats(streams.altitude);
  return {
    ...m,
    streams,
    stats: {
      distance: streams.distance.at(-1),
      gain, descent,
      high: Math.max(...streams.altitude),
      low: Math.min(...streams.altitude),
    },
  };
});
