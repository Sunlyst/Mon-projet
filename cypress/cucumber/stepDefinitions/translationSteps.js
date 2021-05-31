import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('I open the Translation page', () => {
    cy.visit('/')
    cy.get('.dl_cookieBanner--buttonAll').click()
    cy.url().should('equal', 'https://www.deepl.com/translator')
})

When(/I write "([^"]*)" in the translation input/, function (sentence) {
    cy.get('.lmt__source_textarea').type(sentence, { delay: 25 })
})

When(/I change translation languages from "([^"]*)" to "([^"]*)"/, function (source, target) {
    cy.get('[dl-test="translator-source-lang-btn"]').click()
    cy.get('[dl-test="translator-lang-option-' + source + '"]').click()
    cy.get('[dl-test="translator-target-lang-btn"]').click()
    cy.get('[dl-test^="translator-lang-option-' + target + '-"]:nth-child(even)').click()
})

Then(/The translation output (should|should not) equal "([^"]*)"/, function (type, output) {
    switch (type) {
        case "should":
            cy.get('#target-dummydiv').should('contain.text', output)
            break
        case "should not":
            cy.get('#target-dummydiv').should('not.contain.text', output)
            break
    }
})
