import '@agoric/synpress/support/commands';

Cypress.on('uncaught:exception', () => {
  return false;
});
