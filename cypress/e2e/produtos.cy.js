/// <reference types ="cypress"/>
import contrato from '../contratos/produtos.contrato'

describe.skip('Teste de API em Produtos', () => {

    //Login para captura do token
    beforeEach(() => {
        //tkn =token
        cy.token('edu@qa.com', '123456').then(tkn => {
            token = tkn
        })
    });
    let token //Recebendo o token após login

    it('Deve validar contrato de produtos com sucesso', () => {
        cy.request('produtos').then(Response => {
            return contrato.validateAsync(Response.body)
        })
    });

    it('Deve listar Produtos com Sucesso - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).should(Response => {
            expect(Response.status).equal(200)
            expect(Response.body).to.have.property('produtos')
        })

    });
    it('Deve cadastrar produto com sucesso - POST', () => {
        //Nome do produto gerado de forma dinâmica
        let produto = 'Produto EBAC - ' + Math.floor(Math.random() * 1000000000)
        cy.cadastrarProduto(token, produto, 10, 'Cabo de dados', 100)
            .should((Response) => {
                expect(Response.status).equal(201)
                expect(Response.body.message).equal('Cadastro realizado com sucesso')
            })
    });
    it('Deve validar mensangem de nome produto já cadastro - POST', () => {
        cy.cadastrarProduto(token, 'Cabo USB 001', 10, 'Cabo de dados', 100)
            .should(Response => {
                expect(Response.status).equal(400)
                expect(Response.body.message).equal('Já existe produto com esse nome')
            })
    });
    it('Deve editar um produto com sucesso - PUT', () => {
        let produto = 'Produto Ebac editado - ' + Math.floor(Math.random() * 1000000000)
        cy.cadastrarProduto(token, produto, 10, 'aula', 100)
            .then(Response => {
                let id = Response.body._id // pegando o id para editar o produto
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                    body: {
                        "nome": produto,
                        "preco": 100,
                        "descricao": "aula editado",
                        "quantidade": 101
                    }
                }).should(Response => {
                    expect(Response.status).equal(200)
                    expect(Response.body.message).equal('Registro alterado com sucesso')
                })
            })
    });
    it('Deve deletar um produto com sucesso - DELETE', () => {
        cy.cadastrarProduto(token, "produto a ser deletado", 100, "delete", 50)
            .then(Response => {
                let id = Response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: { authorization: token }
                }).should(Response => {
                    expect(Response.status).to.equal(200)
                    expect(Response.body.message).equal('Registro excluído com sucesso')
                })

            })


    });

});