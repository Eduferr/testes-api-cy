/// <reference types = "cypress"/>

import contrato from '../contratos/usuarios.contrato'
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Usuários', () => {

  let nomeCompleto = faker.person.fullName()
  let primeiroNome = nomeCompleto.split(" ")
  let nome = primeiroNome[0]
  let email = nome + Math.floor(Math.random() * 1000) + "@teste.com.br"
  let admin = "true"

  it('Deve validar contrato de usuários', () => {

    cy.request('usuarios').then(Response => {
      return contrato.validateAsync(Response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      methoed: 'GET',
      url: 'usuarios'

    }).should(Response => {
      expect(Response.status).to.equal(200)
      expect(Response.body).to.have.property('quantidade')
      expect(Response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(nomeCompleto, email, "123456", admin)
      .should((Response) => {
        expect(Response.status).equal(201)
        expect(Response.body.message).to.equal('Cadastro realizado com sucesso')
      })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario(nomeCompleto, email, "123456", admin)
      .should((Response) => {
        expect(Response.status).equal(400)
        expect(Response.body.message).to.equal('Este email já está sendo usado')
      })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario(nomeCompleto, "user_" + email, "123456", admin)
      .then(Response => {
        let id = Response.body._id
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          body: {
            "nome": "Edu_santos",
            "email": "editado_" + email,
            "password": "teste",
            "administrador": "true"
          }
        }).should(Response => {
          expect(Response.status).equal(200)
          expect(Response.body.message).equal('Registro alterado com sucesso')
        })
      })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario(nomeCompleto, "user_" + email, "123456", admin)

      .then(Response => {
        let id = Response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`
        }).should(Response => {
          expect(Response.status).to.equal(200)
          expect(Response.body.message).to.equal('Registro excluído com sucesso')
        })
      })
  });
});