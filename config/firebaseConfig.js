var admin = require('firebase-admin');

var serviceAccount = require('./oshop-54073-firebase-adminsdk-kv8fb-7355726f61.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://oshop-54073.firebaseio.com/'
  });

  module.exports.admin = admin;