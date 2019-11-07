const _ = require('lodash')
var assertionConcern = require('../common/assertionConcern')

module.exports = (req, res, next) => {
    
    if(req.body.checkout)
    {
       const error = checkAtributes(req.body.checkout).filter(error => error !==undefined);

        if (error.length > 0) {
            return res.status(500).json({ "errors": error });
        }
    }
    else{
        return res.status(500).json({ "error": "Corpo da requisição inválida" });
    }

    next();
}

function checkAtributes(checkout) {
    
    let err = [];
    
    var errorSender = assertionConcern.assertArgumentNotHasProperty(checkout,"sender","Checkout deve conter um objeto sender válido.")
    
    errorSender === undefined ?err.push(...ValidationSender(checkout.sender)):err.push(errorSender)
    
    var errorDocuments = assertionConcern.assertArgumentNotHasProperty(checkout,"documents","Checkout deve conter um Array de documents.")

    errorDocuments === undefined? err.push(...validationDocuments(checkout.documents)): err.push(errorDocuments)

    var errorShipping = assertionConcern.assertArgumentNotHasProperty(checkout,"shipping","Checkout deve conter um objeto shipping válido.")

    errorShipping === undefined ? err.push(...validationShipping(checkout.shipping)) : err.push(errorShipping)

    var errorItems = assertionConcern.assertArgumentNotHasProperty(checkout,"items","Checkout deve conter um array de items")

    errorItems === undefined ? err.push(...validationItems(checkout.items)) : err.push(errorItems)
    return err;
       
}


function ValidationSender(sender){
    let error = []
    
    error.push(assertionConcern.assertArgumentNullOrEmpty(sender,"Checkout deve conter um objeto sender válido."))
    error.push(assertionConcern.assertArgumentNotEmpty(sender.email,"Campo email é obrigatório."))
    error.push(assertionConcern.assertArgumentNotEmpty(sender.name,"Campo name é obrigatório."))
    
    var errorPhone = assertionConcern.assertArgumentNullOrEmpty(sender.phone,"Sender deve conter um objeto phone válido.")

    errorPhone === undefined? error.push(...validationPhone(sender.phone)): error.push(errorPhone)

    return error
}

function validationPhone(phone){
    const error = []
    error.push(assertionConcern.assertArgumentNotEmpty(phone.areaCode,"Campo areaCode é obrigatório."))
    error.push(assertionConcern.assertArgumentNotEmpty(phone.number,"Campo number é obrigatório."))
    return error
}


function validationDocuments(documents){
    const error = []

    error.push(assertionConcern.assertArgumentTrue(documents instanceof Array,'Documents deve ser um array.'))
    error.push(assertionConcern.assertArgumentFalse(documents.length < 1,'Documents deve ter pelo menos um elemento.'))

    if(documents.length>0){
        for (const item of documents) {
            
            var errorDocument = assertionConcern.assertArgumentNotHasProperty(item,"document","Array documents deve conter itens com objeto document.")

            errorDocument === undefined ? error.push(...validationDocument(item.document)) : error.push(errorDocument)
        }   
    }
    return error
}

function validationDocument(document){
    const error = []
    error.push(assertionConcern.assertArgumentNullOrEmpty(document,"Document deve ser um obejto válido."))
    error.push(assertionConcern.assertArgumentNotEmpty(document.type,"Campo tipo em document é obrigatório."))
    error.push(assertionConcern.assertArgumentNotEmpty(document.value,"Campo value em document é obrigatório."))

    return error
}

function validationShipping(shipping){
    const error = []

    error.push(assertionConcern.assertArgumentNullOrEmpty(shipping.type,"Campo type em shipping é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(shipping.cost,"Campo const em shipping é obrigatório."))

    const errorAddress = assertionConcern.assertArgumentNotHasProperty(shipping,"address","Shipping deve conter um objeto address válido.")

    errorAddress === undefined ? error.push(...validationAddress(shipping.address)): error.push(errorAddress)
    return error
}

function validationAddress(address){
    const error = []
    error.push(assertionConcern.assertArgumentNullOrEmpty(address,"Addree deve ser um objeto válido."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(address.street,"Campo street em address é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(address.city,"Campo city em address é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(address.state,"Campo state em address é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(address.country,"Campo country em address é obrigatório."))
    
    error.push(assertionConcern.assertArgumentNullOrEmpty(address.district,"Campo district em address é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(address.number,"Campo number em address é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(address.postalCode,"Campo postalCode em address é obrigatório."))
    return error
}

function validationItems(items){
    const error = []

    error.push(assertionConcern.assertArgumentTrue(items instanceof Array,'Items deve ser um array.'))
    error.push(assertionConcern.assertArgumentFalse(items.length < 1,'Items deve ter pelo menos um elemento.'))

    if(items.length>0){
        for (const item of items) {
            
            var errorDocument = assertionConcern.assertArgumentNotHasProperty(item,"item","Array items deve conter elementos com objeto item.")

            errorDocument === undefined ? error.push(...validationItem(item.item)) : error.push(errorDocument)
        }   
    }

    return error
}

function validationItem(item){
    const error = []
    error.push(assertionConcern.assertArgumentNullOrEmpty(item,"Item deve ser um obejto válido."))
    error.push(assertionConcern.assertArgumentNotEmpty(item.id,"Campo id em item é obrigatório."))
    error.push(assertionConcern.assertArgumentNotEmpty(item.quantity,"Campo quantity em item é obrigatório."))
    error.push(assertionConcern.assertArgumentNotEmpty(item.description,"Campo description em item é obrigatório."))
    error.push(assertionConcern.assertArgumentNotEmpty(item.amount,"Campo amount em item é obrigatório."))
    error.push(assertionConcern.assertArgumentNotEmpty(item.weight,"Campo weight em item é obrigatório."))
    return error
}