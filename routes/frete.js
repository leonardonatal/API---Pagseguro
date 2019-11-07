var request = require('request-promise')
var parser = require('xml2json-light')
var Correios = require('node-correios')
const freteValidationHandler = require('../common/validation-frete-handler')
module.exports = function(app){
    
    
    app.post("/api/calcula-frete",[freteValidationHandler,function(req,res,next){
        const correios = new Correios();
        const frete = req.body.frete
        const args = frete
        try {
            
            correios.calcPreco(args, function (err, result) {
                console.log("err",err);
                if(err){
                    return res.status(500).json(err)
                    
                }
                console.log("result",result);
                return res.status(200).json(result);
              });
        } catch (error) {
            return res.status(500).json({error:"Não foi possível calcular o frete nesse momento."})
        }
    }])
}
