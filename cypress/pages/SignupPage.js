class SignupPage {
    //Metódo usado para ir para página principal
    go() {
        //Faz a adequação da proporçao da tela, para o tamanho desejado
        //cy.viewport(1440, 900); Retirado porque agora é feita a configuração no arquivo 'cypress.json' passando as dimensões padrão
        //Faz o acesso a página que serão feitos os testes
        cy.visit('/'); //feita alteração para '/'(barra) porque '/'(barra) indica a página principal da URL da BugerEats e o conteúdo da URL está como default também no arquivo de configuração 'cypress.json'
        //Faz a ação do click onde tem um link para o cadastro
        cy.get('a[href="/deliver"]').click()
        //Faz o check se está na página certa
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');

    }
    //Metódo que preenche todos os campos
    fillForm(deliver) {
        //Insere dados nos campos, nome, cpf, email e whatsapp
        cy.get('[name=fullName]').type(deliver.name);
        cy.get('[name=cpf]').type(deliver.cpf);
        cy.get('[name=email]').type(deliver.email);
        cy.get('[name=whatsapp]').type(deliver.whatsapp);

        //Insere dados no cep e a ação do click no botão que tem o valor "Buscar Cep" 
        cy.get('[name=postalcode]').type(deliver.address.postalcode);
        cy.get('[type=button][value="Buscar CEP"]').click();

        //Insere dados nos campos numero do endereço e details do endereço
        cy.get('[name=address-number]').type(deliver.address.number);
        cy.get('[name=address-details]').type(deliver.address.details);

        //Validando se os campos Cidade, district e street estão com as informações esperadas
        cy.get('[name=address]').should('have.value', deliver.address.street);
        cy.get('[name=city-uf]').should('have.value', deliver.address.city_state);
        cy.get('[name=district]').should('have.value', deliver.address.district);

        //Clicando o metódo de entrega
        cy.contains('.delivery-method li', deliver.delivery_method).click();

        //Atribuindo foto de documentos
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh);
    }
    //Metódo que executa o click para submeter as informações preenchidas
    submit() {
        //Clicar no botão de 'Cadastra-se para fazer entregas' e ver se o retorno terá sucesso
        cy.get('form button[type="submit"]').click();
    }

    //Verifica se o usuário foi criado com sucesso
    modalContentShouldBe(expetedMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expetedMessage);
    }

    //Verifica se o CPF está inválido
    alertMessageShouldBe(expetedMessage) {
        //cy.get('.alert-error').should('have.text', expetedMessage)
        cy.contains('.alert-error', expetedMessage).should('be.visible')

    }


}
export default new SignupPage;//Momento em que a classe já é exportada com instanciação usando o 'new'