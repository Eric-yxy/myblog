var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('./config/default');
var routes = require('./routes');
var pkg = require('./package');
var cookieParser = require('cookie-parser');

var app = express();
//set module
app.set('views' ,path.join(__dirname , 'views'));
app.set('views engine' , 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.static(path.join(__dirname , '/')));
//app.use(exress.static(path.join(__dirname , '')))

app.use(cookieParser());
//app.use(session({
//    secret : '1234',
//    name : 'myblog',
//    cookie : {maxAge : 999999},
//    resave : false,
//    saveUninitialized: true
//}));
app.use(session({
    name : config.session.key,
    secret : config.session.secret,
    cookie : {
        maxAge : 99999
    },
    store : new MongoStore(config.mongodb),
    saveUninitialized: true,
    resave : true
}));
console.log(config.session.maxAge);

app.use(flash());


routes(app);
console.log(config.port);
debugger;

app.listen(config.port , function(){
    console.log(pkg.name + ' is listening on port ' + config.port);
})