Cypress.Commands.add('authenticate', () => {
    cy.request({
        method: 'POST',
        url: 'https://w.deepl.com/account',
        body: {
            id: 5110002,
            jsonrpc: "2.0",
            method: "login",
            params: {
                email: "zenityformation@yopmail.com",
                password: "Zenity2021",
                keepLogin: true
            }
        },
    })
})

Cypress.Commands.add('addPet', (petCategoryName, petName, petStatus) => {
    cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet',
        body: {
            "id": 0,
            "category": {
                "id": 0,
                "name": petCategoryName
            },
            "name": petName,
            "status": petStatus
        },
    }).then(response => {
        cy.log(response.status)
        cy.log(JSON.stringify(response.body))
    })
})

const { MailSlurp } = require("mailslurp-client");
const apiKey = "5c18aa804e522079a93d6bfd299414cc0fc76ae9e6bb983c726e262b11ba2b05";
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
    return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
    return mailslurp.waitForLatestEmail(inboxId);
});
