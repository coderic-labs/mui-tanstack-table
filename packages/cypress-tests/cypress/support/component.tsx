import { mount } from 'cypress/react';
import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';
import './commands';
import './providers';

Cypress.Commands.add('mount', mount);
addMatchImageSnapshotCommand({ failureThreshold: 0, failureThresholdType: 'pixel', e2eSpecDir: 'cypress/component/' });

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}
