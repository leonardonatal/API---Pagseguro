var request = require('request-promise')
var parser = require('xml2json-light');
var admin = require('firebase-admin');
var _ = require('lodash')

var serviceAccount = require('../config/oshop-54073-firebase-adminsdk-kv8fb-7355726f61.json');
var assertionConcern = require('../common/assertionConcern')

const arrayStatus = [{ key: "A", description: "Aguardando pagamento", index: 1 }, { key: "E", description: "Em analise", index: 2 }, { key: "P", description: "PAGO", index: 3 }, { key: "C", description: "Cancelado", index: 7 }]
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://oshop-54073.firebaseio.com/'
});


module.exports = function (app) {

    app.post("/api/notification", [function (req, res) {
        console.log("RECEIVE NOTIFICATION CODE: ", req.body.notificationCode)
        const code = req.body.notificationCode
        const credentials = {
            email: "felizbela.modainfantil@gmail.com",
            //token: "E077C322A871451AA165409132E6DA7E" //sandbox
            token: "3414617f-7e83-4a3b-978f-25fed6e0ce65e468e7584e078634fa10d73a52b79178e658-36cf-4fd6-ba08-24cce06a0108" //producao
        }

        var options = {
            method: 'GET',
            //uri: `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/notifications/${code}?email=${credentials.email}&token=${credentials.token}` //sandbox
            uri: `https://ws.pagseguro.uol.com.br/v2/transactions/notifications/${code}?email=${credentials.email}&token=${credentials.token}` //producao
        }

        return request(options).then(function (response) {
            const erros = []
            console.log("ENTROU ======")
            const json = parser.xml2json(response)

            erros.push(...validationTransactions(json))
            console.log("ERRORS",erros.length)
            if(erros.length <= 0){

                const transactions = json.transaction;
                const status = transactions.status;
                const ref = transactions.reference
    
                updateStatus(status, ref).then(result=>{
    
                    return res.status(200).json(result)
                }).catch(error=>{
                    return res.status(500).json(error)
                })
            }
            else{
                return res.status(500).json(errors)
            }

        }).catch(function (error) {
            
            console.log("error",error)
            return res.status(500).json(error)
        })
    }])
}

function updateStatus(statusinfo, refe) {
   return new Promise((resolve, reject) => {
        var db = admin.database()
        console.log("DATA BASE", db)
        var db = admin.database()

        var ref = db.ref(`orders/${refe}`)
        ref.once("value", function (snapshot) {
            if(snapshot.val()){
                const order = snapshot.val()
                status = order.status
                status.push({ ...arrayStatus.find(x => x.index === Number(statusinfo)), createAt: new Date().getTime() })
                status = _.unionBy(status,"index")
                ref.update({ "status": status }).then(result => {
                   return resolve({message:"order Atualizada com sucesso",referencia:refe})
                }).catch(error => {
                    return reject({error:"Não foi possivel atualizar order de referencia",referencia:refe})
                });
            }
            else{
                return reject({error:"codigo de refenrecia da transação iválida",reference:refe})
            }
        })
    });
}

function validationTransactions(body){
    const errors = []
    
    if(body.transaction){

        errors.push(assertionConcern.assertArgumentNullOrEmpty(body.transaction,"codigo de transação invalida"))
        errors.push(assertionConcern.assertArgumentNullOrEmpty(body.transaction.status,"status de transação invalida"))
        errors.push(assertionConcern.assertArgumentNullOrEmpty(body.transaction.reference,"reference de transação invalida"))
    }
    else{
        errors.push("não foi encontrada transação com o codigo informado.")
    }

    return errors.filter(x=>x !== undefined)
}