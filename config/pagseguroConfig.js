var pagseguro = require('pagseguro');

var pag = new pagseguro({
                email : 'jose.auguto.ara@gmail.com',
                token: '936F5A05D4644E56A0BF0D247EEB9E28',
            });

//Configurando a moeda e a referência do pedido
pag.currency('BRL');

//Configuranto URLs de retorno e de notificação (Opcional)
//ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
pag.setRedirectURL("http://www.lojamodelo.com.br/retorno");
pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao");



//exportar a configuração do pagseguro
module.exports.pagCart = pag