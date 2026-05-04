import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';

export default defineConfig({
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
        supportFile: 'cypress/support/component.tsx',
        viewportWidth: 1440,
        viewportHeight: 900,
        env: {
            failOnSnapshotDiff: false,
        },
        setupNodeEvents(on) {
            addMatchImageSnapshotPlugin(on);
        },
    },
});
