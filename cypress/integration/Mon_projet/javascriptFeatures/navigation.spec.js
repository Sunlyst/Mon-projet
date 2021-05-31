describe('Navigation', () => {

    it('Access the translate page from press page', () => {
        cy.visit('/press')
        cy.get('.dl_cookieBanner--buttonAll').click()
        cy.get('#dl_menu_translator_simplified').click()
        cy.url().should('equal', 'https://www.deepl.com/translator')
    })

})