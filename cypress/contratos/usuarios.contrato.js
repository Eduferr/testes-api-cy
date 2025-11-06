const validaDados = require('joi')

const usuariosEsquema = validaDados.object({

    usuarios: validaDados.array().items({
        nome: validaDados.string(),
        email: validaDados.string(),
        password: validaDados.string(),
        administrador:validaDados.string(),
        _id: validaDados.string()
    }),
        quantidade: validaDados.number()
})

export default usuariosEsquema