const _ = require('lodash')
var assertionConcern = require('../common/assertionConcern')

module.exports = (req, res, next) => {
    
    if(req.body.frete)
    {
       const error = checkAtributes(req.body.frete).filter(error => error !==undefined);

        if (error.length > 0) {
            return res.status(500).json({ "errors": error });
        }
    }
    else{
        return res.status(500).json({ "error": "Corpo da requisição inválida" });
    }

    next();
}

function checkAtributes(frete) {
    const error = []
    console.log("FRETE",frete)
    
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nCdServico,"Campo nCdServico é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.sCepOrigem,"Campo sCepOrigem é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.sCepDestino,"Campo sCepDestino é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nVlPeso,"Campo nVlPeso é obrigatório."))

    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nCdFormato,"Campo nCdFormato é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nVlComprimento,"Campo nVlComprimento é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nVlAltura,"Campo nVlAltura é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nVlLargura,"Campo nVlLargura é obrigatório."))

    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nVlDiametro,"Campo nVlDiametro é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.sCdMaoPropria,"Campo sCdMaoPropria é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.nVlValorDeclarado,"Campo nVlValorDeclarado é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(frete.sCdAvisoRecebimento,"Campo sCdAvisoRecebimento é obrigatório."))
    console.log("ERROR",error)
    return error
}