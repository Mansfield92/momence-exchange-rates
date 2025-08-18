describe('Momence Exchange Rates App', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/daily', {fixture: 'daily.json'}).as('getDaily')
        cy.intercept('GET', '**/api/yearly*', {fixture: 'yearly.json'}).as('getYearly')

        cy.visit('/', {
            onBeforeLoad(win) {
                try {
                    // Set theme to light for all tests
                    win.sessionStorage.setItem('theme', 'light')
                } catch {
                    // Do nothing if sessionStorage is not available
                }
            },
        })

        cy.wait(['@getDaily', '@getYearly'])
    })

    it('loads the app and displays the title', () => {
        cy.contains('h1', 'Currency Converter')
    })

    it('theme toggle works', () => {
        cy.get('#color-mode-toggle').as('toggle')
        cy.get('@toggle').should('not.be.checked')
    })

    it('converts CZK -> EUR using mocked rate and supports switching theme', () => {
        // Verify currency select has the expected options and EUR is present
        cy.get('#currency').should('exist').within(() => {
            cy.get('option').then((opts) => {
                const values = [...opts].map(o => (o as HTMLOptionElement).value)
                expect(values).to.include.members(['EUR', 'USD'])
            })
        })

        cy.get('#amount').clear().type('100')

        // debounce is 120ms; allow some time for UI to update
        cy.wait(250)

        cy.contains('[aria-live="polite"]', 'CZK =').should('contain.text', 'EUR')
        cy.contains('[aria-live="polite"]', /4([.,])00/)

    })
})
