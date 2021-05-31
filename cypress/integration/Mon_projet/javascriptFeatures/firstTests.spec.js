/// <reference types="cypress"/>

before(() => {
    cy.log('I run once before all tests')
})

beforeEach(() => {
    cy.log('I run before every test')
    cy.visit('');
})

afterEach(() => {
    cy.log('I run after every test')
})

after(() => {
    cy.log('I run once after all tests')
})

describe('Front end testing', () => {
    it('Access the translate page', () => {
        cy.log('This is within my created test')
        cy.get('.dl_translator_page_container').should('be.visible')
        cy.get('.lmt__source_textarea').should((translateInput) => {
            expect(translateInput[0]).to.have.property('autocomplete', 'off')
        })
        cy.url().should('contain', "deepl.com")
    })

    it('Tests tooltip display on glossary button hovering', () => {
        cy.get('[dl-test="glossary-button"]').realHover()
    })

    it('Plans and pricing button visibility', () => {
        cy.viewport(700, 700)
        cy.get('#dl_menu_plans_and_pricing').should('not.be.visible')
    })

    const smallSizes = ['iphone-x', 'ipad-mini']
    smallSizes.forEach((size) => {
        it('Verify download button invisibility on ' + size, () => {
            cy.viewport(size)
            cy.get('a.dl_headerMenu__appButton').should('not.be.visible')
        })
    })

    it('Verify download button visibility', () => {
        cy.viewport(1280, 800)
        cy.get('a.dl_headerMenu__appButton').should('be.visible')
    })

    const sizes = ['iphone-6', 'ipad-2', [1024, 768]]
    describe('Fields', () => {
        sizes.forEach((size) => {
            it('Should display translation fields on ${size} screen', () => {
                if (Cypress._.isArray(size)) {
                    cy.viewport(size[0], size[1])
                } else {
                    cy.viewport(size)
                }
                cy.visit('/')
                cy.get('.lmt__sides_container:nth-child(even)').should('be.visible')
            })
        })
    })

    describe('page display on medium size screen', {
        viewportHeight: 1000,
        viewportWidth: 400,
    }, () => {
        it('does not display application button', () => {
            cy.get('#dl_menu_apps').should('not.be.visible')
        })
        it('shows translation page button', () => {
            cy.get('#dl_menu_translator_simplified').should('be.visible')
        })
    })

    it('Access website pages', { browser: 'chrome' }, () => {
        cy.readFile('cypress/fixtures/pagesData.json').then(data => {
            for (const pageData of data.pageAccessData) {
                cy.log("Asserting that the page with url " + pageData.pageUrlEndpoint + " is accessible and that it displays at least one specific element")
                cy.visit(pageData.pageUrlEndpoint)
                cy.get(pageData.pageSpecificElement).should('be.visible')
            }
        })
    })

    it('Access the translate page', { viewportWidth: 1920, viewportHeight: 1080 }, () => {
        cy.get('.dl_translator_page_container').should('be.visible')
        cy.get('.lmt__source_textarea').should((translateInput) => {
            expect(translateInput[0]).to.have.property('autocomplete', 'off')
        })
    })
})

describe('Data fed front test', () => {
    it('Access website pages', () => {
        cy.readFile('cypress/fixtures/pagesData.json').then(data => {
            for (const pageData of data.pageAccessData) {
                cy.log("Asserting that the page with url " + pageData.pageUrlEndpoint + " is accessible and that it displays at least one specific element")
                cy.visit(pageData.pageUrlEndpoint)
                cy.get(pageData.pageSpecificElement).should('be.visible')
            }
        })
    })

    it('Access website pages from csv data', () => {
        cy.readFile('cypress/fixtures/pagesData.csv').then(data => {
            for (const pageData of data.trim().split('\n').slice(1)) {
                cy.log("Asserting that the page with url " + pageData.split(';')[0] + " is accessible and that it displays at least one element")
                cy.visit(pageData.split(';')[0])
                cy.get(pageData.split(';')[1]).should('be.visible')
            }
        })
    })

    it('Creates new pets based on json data', () => {
        cy.readFile('cypress/fixtures/petData.json').then(data => {
            for (const petData of data.petData) {
                cy.addPet(petData.petCategoryName, petData.petName, petData.petStatus)
            }
        })
    })

    it('Creates new pets based on csv data', () => {
        cy.readFile('cypress/fixtures/petData.csv').then(data => {
            for (const petData of data.trim().split('\n').slice(1)) {
                cy.addPet(petData.split(';')[1], petData.split(';')[0], petData.split(';')[2])
            }
        })
    })
})

describe('Back end testing', () => {
    it('Authenticate within DeepL service', () => {
        cy.visit('')
        cy.authenticate().then(response => {
            cy.log(response.status)
            cy.log('I am authenticated')
        })
    })

    it('Add a new pet in the pet store', () => {
        cy.addPet('dog', 'Pogo', 'available')
    })
})