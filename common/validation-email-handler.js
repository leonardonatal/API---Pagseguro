const _ = require('lodash')
var assertionConcern = require('../common/assertionConcern')

module.exports = (req, res, next) => {
    
    if(req.body.sender)
    {
       const error = checkAtributes(req.body.sender).filter(error => error !==undefined);

        if (error.length > 0) {
            return res.status(500).json({ "errors": error });
        }
    }
    else{
        return res.status(500).json({ "error": "Corpo da requisição inválida" });
    }

    next();
}

function checkAtributes(sender) {
    const error = []
    
    error.push(assertionConcern.assertArgumentNullOrEmpty(sender.email,"Campo email é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(sender.body,"Campo body é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(sender.subject,"Campo subject é obrigatório."))
    error.push(assertionConcern.assertArgumentNullOrEmpty(sender.title,"Campo title é obrigatório."))
    return error
}