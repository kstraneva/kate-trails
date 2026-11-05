# Kate's Trails

**[View the site →](https://kstraneva.github.io/kate-trails/)**

Six routes rendered as rotatable 3D terrain maps: Camelback Mountain, the Enchantments, South Kaibab to Bright Angel in the Grand Canyon, Alta trail run, the Presidential Traverse, and the Dipsea.

- Drag to pan, right-drag (or Ctrl-drag) to rotate and tilt, scroll to zoom.
- Click the route or the elevation profile to read distance, elevation and grade at that point.
- Switch basemaps (satellite, topo, streets) and toggle terrain.

Built with React, Vite and [deck.gl](https://deck.gl). Terrain is Mapzen/AWS terrain tiles; imagery from Esri, OpenTopoMap and OpenStreetMap (credited in the viewer).

## Develop
```
npm install
npm run dev
```

## Data
The routes are static JSON in `src/data/` (position, altitude and distance only; no Strava names, dates or accounts). `scripts/export-from-chasingvert.mjs` regenerates them from a locally running [chasingVert](https://github.com/kstraneva/chasing-vert) server. The site makes no Strava calls.

Gain and descent are computed from the elevation data (smoothed, 3 m threshold), so they will differ slightly from Strava's totals.

## Deploy
The included GitHub Actions workflow builds and publishes to GitHub Pages on every push to `main`. Enable it once under **Settings → Pages → Source: GitHub Actions**.
