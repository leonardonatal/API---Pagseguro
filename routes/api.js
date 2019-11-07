
var pagseguro = require('pagseguro');
var assertionConcern = require('../common/assertionConcern')

var parseString = require('xml2js').parseString;
const checkoutValidationHandler = require('../common/validation-checkout-handler')
module.exports = function (app) { 
    
    // POST

   app.post('/api/checkout', [ checkoutValidationHandler,function(req, resp) {
        console.log("ENTROU NO METODO")
        var pag = new pagseguro({
                email : 'felizbela.modainfantil@gmail.com',
                token: '3414617f-7e83-4a3b-978f-25fed6e0ce65e468e7584e078634fa10d73a52b79178e658-36cf-4fd6-ba08-24cce06a0108',
        });

         //Configurando a moeda e a referência do pedido
         pag.currency('BRL');
        
         //Configuranto URLs de retorno e de notificação (Opcional)
         //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
         pag.setRedirectURL("https://felizbela.com.br");
         pag.setNotificationURL("https://felizbelamodainfantil.com.br/api/notification");
 
         const checkout = req.body.checkout
         
         pag.reference(checkout.reference);
         
          //Configurando as informações do comprador
          pag.buyer({
              name: checkout.sender.name,
              email: checkout.sender.email,
              phoneAreaCode: checkout.sender.phone.areaCode,
              phoneNumber: checkout.sender.phone.value
          });
  
          //Configurando a entrega do pedido
          // fiz uma modificação no pacode pagseguro para aceitar os parametros type e cost de shipping
          pag.shipping({
              type: checkout.shipping.type,
              addressRequired  : checkout.shipping.addressRequired,
              cost : checkout.shipping.cost,
              street: checkout.shipping.address.street,
              number: checkout.shipping.address.number,
              complement: checkout.shipping.address.complement,
              district: checkout.shipping.address.district,
              postalCode: checkout.shipping.address.postalCode,
              city: checkout.shipping.address.city,
              state: checkout.shipping.address.state,
              country: checkout.shipping.address.country
          });
 
          //pag.pagCart.shipping.addressRequired  = checkout.shipping.address.addressRequired
          //pag.pagCart.shipping.cost  = checkout.shipping.address.cost
  
          //Adicionar os produtos no carrinho do pagseguro
          req.body.checkout.items.forEach(function (item, i) {
              
              pag.addItem({
                  id: item.item.id,
                  description: item.item.description,
                  amount: item.item.amount,
                  quantity: item.item.quantity,
                  weight: item.item.weight
              });
          });
  
          console.log("PAGAMENTO",pag.obj)
          //Enviando o xml ao pagseguro
          pag.send(function(err, res) {
              
              if (err) {
                  console.log(err);
                  return resp.status(500).json({ "error": err });
              }
              
              parseString(res, {trim: true}, function (err, result) {
                 const errorRes = assertionConcern.assertArgumentNotHasProperty(result,"checkout","error")
                 return errorRes === undefined ?resp.status(200).json(result) :resp.status(500).json(result) 
              });
          });

        

    }]);

    app.post('/api/checkout-sandbox', [ checkoutValidationHandler,function(req, resp) {
        var pagSandBox = new pagseguro({
            email : 'felizbela.modainfantil@gmail.com',
            token: 'E077C322A871451AA165409132E6DA7E',
            mode:'sandbox'
        });
        
        //Configurando a moeda e a referência do pedido
        pagSandBox.currency('BRL');
        
        //Configuranto URLs de retorno e de notificação (Opcional)
        //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
        pagSandBox.setRedirectURL("https://felizbela.com.br");
        pagSandBox.setNotificationURL("https://felizbelamodainfantil.com.br/api/notification");

        const checkout = req.body.checkout
        
        pagSandBox.reference(checkout.reference);
        
         //Configurando as informações do comprador
         pagSandBox.buyer({
             name: checkout.sender.name,
             email: checkout.sender.email,
             phoneAreaCode: checkout.sender.phone.areaCode,
             phoneNumber: checkout.sender.phone.value
         });
 
         //Configurando a entrega do pedido
         // fiz uma modificação no pacode pagseguro para aceitar os parametros type e cost de shipping
         pagSandBox.shipping({
             type: checkout.shipping.type,
             addressRequired  : checkout.shipping.addressRequired,
             cost : checkout.shipping.cost,
             street: checkout.shipping.address.street,
             number: checkout.shipping.address.number,
             complement: checkout.shipping.address.complement,
             district: checkout.shipping.address.district,
             postalCode: checkout.shipping.address.postalCode,
             city: checkout.shipping.address.city,
             state: checkout.shipping.address.state,
             country: checkout.shipping.address.country
         });

         //pagSandBox.pagCart.shipping.addressRequired  = checkout.shipping.address.addressRequired
         //pagSandBox.pagCart.shipping.cost  = checkout.shipping.address.cost
 
         //Adicionar os produtos no carrinho do pagseguro
         req.body.checkout.items.forEach(function (item, i) {
             
             pagSandBox.addItem({
                 id: item.item.id,
                 description: item.item.description,
                 amount: item.item.amount,
                 quantity: item.item.quantity,
                 weight: item.item.weight
             });
         });
 
         console.log("PAGAMENTO",pagSandBox.obj)
         //Enviando o xml ao pagseguro
         pagSandBox.send(function(err, res) {
             
             if (err) {
                 console.log(err);
                 return resp.status(500).json({ "error": err });
             }
             
             parseString(res, {trim: true}, function (err, result) {
                const errorRes = assertionConcern.assertArgumentNotHasProperty(result,"checkout","error")
                return errorRes === undefined ?resp.status(200).json(result) :resp.status(500).json(result) 
             });
         });
 
         
 
     }]);
}

