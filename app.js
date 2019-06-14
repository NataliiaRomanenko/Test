var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var config = require('./config');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var routes = require('./middleware/routes');
var errorHandler = require('./middleware/errorHandler');

//var session = require('express-session');
//var sessionStore = require('./middleware/libs/sessionStore');
var ip = require('ip');
var fs = require('fs');



//SSL
/*var options = {
    key: fs.readFileSync('./ssl/server.key', 'utf8'),//privatekey.pem
    cert: fs.readFileSync('./ssl/server.crt', 'utf8'),//certificate.pem
};*/

var app = express();
app.set('port', config.get('port'));
app.disable('x-powered-by');

//webPack
var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var configWP = require('./config/webpack.config.js');
var webpackHRM = require('webpack-hot-middleware');
var compiler = webpack(configWP);
app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath:  configWP.output.publicPath,
}));
app.use((webpackHRM)(compiler));

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(cookieParser(""));

//Routes
routes(app);
app.use(express.static(path.join(__dirname, './public')));
app.use('/*', function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');
    console.log('index filename path: ', filename);
    compiler.outputFileSystem.readFile(filename, function(err, result){
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
 });
//Error Handler middleware
errorHandler(app);
//Create Server
var server = http.createServer(app);
server.listen(config.get('port'), function(){
    console.log('Express server listening on ip:',ip.address(),',port:',config.get('port'));
});





