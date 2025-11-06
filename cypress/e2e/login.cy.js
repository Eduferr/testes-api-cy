/// <reference types = "cypress"/>

describe('Teste de API - Login', () => {
  it('Deve realizar login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
              "email": "fulano@qa.com",
              "password": "teste"
            }
    }).then((Response) =>{
      cy.log(Response.body.authorization)
      expect(Response.body.message).to.eql('Login realizado com sucesso')
      expect(Response.status).to.eql(200)
    })
  })
})