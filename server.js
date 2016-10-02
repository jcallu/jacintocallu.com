
var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var favicon = require('serve-favicon');
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(bodyParser.json({limit: '500mb'}));
app.use(cookieParser());
app.use(favicon(__dirname+"/public/img/favicon.ico"));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('partials', __dirname + '/views/partials');
app.set('views', __dirname + '/views');
app.use(cookieSession({  secret: "s3Cur3", key: "sessionId_123!" }));
app.disable("x-powered-by");
app.use(function(req,res,next){
  res.render('index.ejs', {page: 'index'}, function(err, html) {
    if ( !err ) {
      return res.status(200).send(html);
    }
    if ( err ){ //escape express application.js favicon.ico error
      console.error("Unknown Request ",err,req.params);
      return next()
    }
    // if( typeof res.sendfile !== 'function' ) return res.redirect( '/logout' );
    res.status(404).sendfile(__dirname + '/views/index.ejs', '', function(err) {
      if (err) { console.error("vgp_ui/app/api/server.js 404 sendfile error =>",err); }
      return;
    });
  });
})
var UIServer = http.createServer(function (req, res, next) {
  app(req, res, next)
}).listen(80);
UIServer.timeout = 1000 * 60 * 15; // 15 minutes
UIServer.on('listening',function(){
  console.log("running")
});
