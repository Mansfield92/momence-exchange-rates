const {defineConfig} = require('cypress');

module.exports = defineConfig({
    video: false,
    chromeWebSecurity: false,
    e2e: {
        baseUrl: 'http://localhost:5173',
        specPattern: 'cypress/e2e/**/*.cy.ts',
        supportFile: 'cypress/support/e2e.ts',
    },
})
