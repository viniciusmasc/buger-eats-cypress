import signup from '../pages/SignupPage'; //feita instanciação no export na pagina SignupPage com uso da palavra reservada 'new' para instanciar no export, deixando assim assim mais clean o code 
import signupFactory from '../factories/SignupFactory' //feito o import já instanciando do módulo de factories

//Nome do teste
describe('Singup', () => {
    /**   Nesse caso foi feita uma atualização no código que usando JS no arquivo factory, é possível deixar mais clean a mantenabilidade do código 
        beforeEach(function () {
        cy.fixture('deliver').then((d)=> {
        this.deliver = d    
         }) 
        });*/

    //Nome do caso de teste
    it('User should be an deliver', function () {
        //Cria a nova massa de testes a partir desse ponto puxando a info do signupFactory
        var deliver = signupFactory.deliver();
        //Faz o acesso da página testada, já com a validação
        signup.go();
        //Preenche os campos
        signup.fillForm(deliver);
        //Faz o click no botão de cadastro
        signup.submit();
        //Esta const é atribuida para que seja chamada no metódo 'modalContentShouldBe()', dessa forma se a mensagem for mudada basta alterar nesta const
        const expetedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        //Valida se o cadastro foi feito com sucesso
        signup.modalContentShouldBe(expetedMessage);
    });

    //Nome do caso de teste
    it('Invalid document', function () {
        //Cria a nova massa de testes a partir desse ponto puxando a info do factory
        var deliver = signupFactory.deliver();
        //Gera cpf inválido
        deliver.cpf = '111444333AA'

        //Faz o acesso da página testada, já com a validação
        signup.go();
        //Preenche os campos
        signup.fillForm(deliver);
        //Faz o click no botam de cadastro
        signup.submit();
        //Valida se o CPF foi está com invalido
        signup.alertMessageShouldBe('Oops! CPF inválido');

    });
    //Nome do caso de teste
    it('Invalid email', function () {
        //Cria a nova massa de testes a partir desse ponto puxando a info do factory
        var deliver = signupFactory.deliver();
        deliver.email = 'user.com.br'

        //Faz o acesso da página testada, já com a validação
        signup.go();
        //Preenche os campos
        signup.fillForm(deliver);
        //Faz o click no botam de cadastro
        signup.submit();
        //Valida se o CPF foi está com invalido
        signup.alertMessageShouldBe('Oops! Email com formato inválido.');

    });
    //Esse teste com context tem por objetivo que ao teste falhar ele continue executando o teste, para verificar os demais campos, nesse caso foi passada a palavara email com hífem para que ocorrece o erro
    context('Required field', function () {
        //Massa de teste feita em array
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]
        //o uso do before, tem por função a execução do acesso e click no botão de cadastro ao executar uma vez o teste
        before(function(){
            signup.go();
            signup.submit();
        });
        //forEach feito para percorrer o array 'messages' feito anteriormente, dessa forma é feita a passagem mensagem por mensagem. A variável 'msg' é criada somente para passar o paramento esperado que são as mensagens anteriores do array
        messages.forEach(function(msg){
            //esse ponto faz uma concatenação, passando mensagem
            it(`${msg.field} is required`, function() {
                signup.alertMessageShouldBe(msg.output)
            });
        })

    });
    //Verifica se todos os campos estão com alerta de obrigatoriedade, faz o mesmo que o código acima, porém nesse caso se for alterado algum campo na página e não for alterado no teste, o teste inteiro quebra
 /**   it('Required fiel', function () {

        signup.go();
        signup.submit();
        signup.alertMessageShouldBe('É necessário informar o nome');
        signup.alertMessageShouldBe('É necessário informar o CPF');
        signup.alertMessageShouldBe('É necessário informar o email');
        signup.alertMessageShouldBe('É necessário informar o CEP');
        signup.alertMessageShouldBe('É necessário informar o número do endereço');
        signup.alertMessageShouldBe('Selecione o método de entrega');
        signup.alertMessageShouldBe('Adicione uma foto da sua CNH');

    }); */
});