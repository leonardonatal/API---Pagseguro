var pagseguro = require('pagseguro');

var pagSandBox = new pagseguro({
    email : 'jose.auguto.ara@gmail.com',
    token: '936F5A05D4644E56A0BF0D247EEB9E28',
    mode:'sandbox'
});

//Configurando a moeda e a referência do pedido
pagSandBox.currency('BRL');

//Configuranto URLs de retorno e de notificação (Opcional)
//ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
pagSandBox.setRedirectURL("http://www.lojamodelo.com.br/retorno");
pagSandBox.setNotificationURL("http://www.lojamodelo.com.br/notificacao");

module.exports.pagCart = pagSandBox