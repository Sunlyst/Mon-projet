import { Given, And, When, Then, After, Before } from "cypress-cucumber-preprocessor/steps";
 
Before(() => { cy.log('I run before each scenario') })
 
After(() => { cy.log('I run after each scenario') })
 
Given(/I open the Deepl page/, function () {
    cy.visit('/')
    cy.get('#dl_translator').should('be.visible')
})
 
And(/I write "([^"]*)" in the translation input/, function (sentence) {
    cy.get('.lmt__source_textarea').type(sentence, { delay: 25 })
})
 
When(/I click on the delete button/, function () {
    cy.get('[dl-test="translator-source-clear-button"]').click()
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
