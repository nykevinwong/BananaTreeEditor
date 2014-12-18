var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');
var partials = require('express-partials'); // provide master page feature
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser'); // process form post request
var csrf = require('csurf'); // prevent Cross-Site Request Forgery (CSRF) when processing form post request
var util = require('./middleware/utilities');
app.set('view options', {defaultLayout: 'layout'});
app.use(partials());

app.set('view engine', 'ejs');
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use('/jslib',  express.static(__dirname + '/bower_components'));

app.use(cookieParser());
app.use(session({secret: 'secret'}));
app.use(bodyParser.json()); // process application/json
app.use(bodyParser.urlencoded({extended: false})); // process application/x-www-form-urlencoded
app.use(csrf()); // add csrf token to the session

app.use(util.authenticated);

app.use(util.csrf); // add csrf token variable to req.local. this can be accessed in login.ejs to render a hidden token field inside a form tag for a form POST request.


app.use(function(req, res, next){
  if(req.session.pageCount)
    req.session.pageCount++;
  else
    req.session.pageCount = 1;
  next();
});

app.get('/', routes.index);
app.get('/login', routes.login); // display login page with the login form
app.get('/logout', routes.logOut);
app.post('/login', routes.loginProcess); // process POST request for login form
app.get('/chat',[util.requireAuthentication], routes.chat);
app.get('/editor', [util.requireAuthentication], routes.editor);


app.get('/error', function(req, res, next){
  next(new Error('A contrived error'));
});

app.get('/users/:uid/assets/:file', routes.accessUserFiles );


app.get('/xml2js/:name', function xml(req, res)
                   {
                   var characterName = req.params.name;
                   var fs = require('fs'),
                       xml2js = require('xml2js');

                   var parser = new xml2js.Parser({mergeAttrs: true, explicitArray : false });

                   fs.readFile(__dirname + '/static/xml/' + characterName + '.xml', function(err, data) {
                       parser.parseString(data, function (err, result) {
                           res.send(result);
                       });

                   });

                   });


app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);
console.log("App server running on port 3000");