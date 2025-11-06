// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
    }).then(Response => {
        return Response.body.authorization
    })
})

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
    cy.request({
        method: 'POST',
        url: 'produtos',
        headers: { authorization: token }, //o token vem da variável declarada no top
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        failOnStatusCode: false // para driblar a validação do cypress para código 2xx ou 3xx
    })
})

Cypress.Commands.add('cadastrarUsuario', (nome, email, senha, admin) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": admin
        },
        failOnStatusCode: false

    })
})