import { defineConfig } from 'vite';
import { readFileSync, readdirSync } from 'node:fs';

// Ship the third-party notices (and the license texts they point to) with every build, next to index.html.
function thirdPartyNotices() {
  return {
    name: 'third-party-notices',
    apply: 'build',
    generateBundle() {
      // .txt so browsers show it instead of downloading it
      this.emitFile({ type: 'asset', fileName: 'THIRD-PARTY-NOTICES.txt', source: readFileSync('THIRD-PARTY-NOTICES.md') });
      for (const f of readdirSync('licenses')) this.emitFile({ type: 'asset', fileName: `licenses/${f}`, source: readFileSync(`licenses/${f}`) });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [thirdPartyNotices()],
  build: {
    target: 'es2020',
    sourcemap: false,
    // The shared Python interpreter chunk (src/lib/minipy + codepanel, loaded only by the programming sims) is ~620 kB
    // minified / ~230 kB gzipped; everything else stays well under 500 kB.
    chunkSizeWarningLimit: 700,
  },
  server: {
    port: 5173,
    open: true,
  },
});
