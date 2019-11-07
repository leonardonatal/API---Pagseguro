var express       = require("express");
var allowCors     = require('./config/cors')
var app           = express.createServer();

//configuração do express
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(allowCors)
  app.use(app.router);
});

//configuração das rotas
require('./routes')(app);
require('./routes/api')(app);
require('./routes/email')(app);
require('./routes/notifications')(app);
require('./routes/frete')(app);


app.configure('development', function(){
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
   app.use(express.errorHandler());
});

app.listen(process.env.port ||5000,  function(){
   console.log("A mágica acontece na porta %d em modo %s",app.address().port, app.settings.env);
});



