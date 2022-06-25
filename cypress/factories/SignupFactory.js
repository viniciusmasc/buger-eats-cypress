var faker = require('faker')
var cpf = require('gerador-validador-cpf')

//Esse código é um módulo que irá me auxiliar nos testes de forma menos repetitiva, sendo feitas alterações
export default {
    deliver: function () {
        //Essas três váriaveis são importadas da biblioteca faker, tem por função gerar nome e sobrenome, e email  de forma aleatórias
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        var email = faker.internet.email(firstName)
        
        var data = {
            name: `${firstName} ${lastName}`, //Essa é a forma usada para concatenar a variável firstName+lastName atribuindo um "espaço entre elas
            cpf: cpf.generate(),
            email: email,
            whatsapp: '7199999999',
            address: {
                postalcode: '41345566',
                street: 'Rua Doutor Alfredo Ramalho',
                number: '24',
                details: 'N/A',
                district: 'Fazenda Grande IV',
                city_state: 'Salvador/BA'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        return data
    }
}