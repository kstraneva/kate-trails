import { elevationStats } from './stats.js';

const files = import.meta.glob('./data/*.json', { eager: true, import: 'default' });

const META = [
  { slug: 'camelback', name: 'Camelback', place: 'Phoenix, Arizona', kind: 'Trail run' },
  { slug: 'enchantments', name: 'Enchantments', place: 'Alpine Lakes Wilderness, Washington', kind: 'Hike' },
  { slug: 'grand-canyon', name: 'Grand Canyon', place: 'Grand Canyon, Arizona', kind: 'Hike' },
  { slug: 'utah-trail-run', name: 'Alta', place: 'Alta, Utah', kind: 'Trail run' },
  { slug: 'presidential-traverse', name: 'Presidential Traverse', place: 'White Mountains, New Hampshire', kind: 'Hike' },
  { slug: 'dipsea-race', name: 'Dipsea', place: 'Mill Valley to Stinson Beach, California', kind: 'Trail run' },
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
