import { defineConfig } from 'cypress';

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
    },
});
