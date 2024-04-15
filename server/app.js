import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import handlebars from 'handlebars';
import hbs from 'express-handlebars';
import hbshelpers from 'handlebars-helpers';
import session from 'express-session';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import breadcrumbs from 'express-breadcrumbs';
import homePageRouter from './routers/homePage';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { config } from 'dotenv';
import dbConnecter from './dbConnecter';
import mongoose from 'mongoose';
import User from './models/User';

config();
dbConnecter();

/*
const userData = {
    firstName: "Saleem",
    lastName: "Karkabi",
    team: "Blue"
}

const userData2 = {
    firstName: "Saleem",
    lastName: "Karkabi",
    team: "Red"
}

User.addUser(userData).then(output => {
    console.log(output)
}).catch(err => {
    console.error(err)
})

User.addUser(userData2).then(output => {
    console.log(output)
}).catch(err => {
    console.error(err)
})

*/
User.getAllUsers().then(users => {
    console.log(users);
})

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper("counter", function (index){
    return index + 1;

});

handlebars.registerHelper("greaterThan", function(x, y){
    console.log(x)
    console.log(y)
    if(x > y){
        return true;
    }else{
        return false;
    }
})

handlebars.registerHelper("getElement", function (array, index, property){
    return array[parseInt(index)][property];

});

handlebars.registerHelper("add", function (a, b){
    return a + b;

});

handlebars.registerHelper("multiply", function (a, b){
    return a + b;

});


handlebars.registerHelper('isdefined', function (value, compare) {
    return value === compare;

});

  handlebars.registerHelper('console', function (value){
    return console.log("Outputting " + JSON.stringify(value));

})

handlebars.registerHelper('stringify', function (value){
    return JSON.stringify(value);

})

handlebars.registerHelper('formatDate', function (value){
    if(value){
        return value.toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit'})

    }else{
        return "Pending Confirmation"

    }
    
})

handlebars.registerHelper("getArray", function(array, spot){
    return (array[parseInt(spot)]);

})

handlebars.registerHelper("inarray", function(array, value){
    if(array){
        const found = array.find(arr => {
            return arr.id === value
        })
    
        return found
    }

    return false
    

})

handlebars.registerHelper("upperCaseFirst", function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  })
handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
const app = express();

const multiHelpers = hbshelpers()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
    'hbs', 
    hbs(
        {
            helpers: multiHelpers,
            extname: 'hbs', 
            defaultLayout: 'layout', 
            layoutsDir: __dirname + '/views/', 
            handlebars: allowInsecurePrototypeAccess(handlebars)
        }
    )
)

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(
    {
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie : {maxAge: 120 * 60 * 1000},
    }
));

app.use(flash());
app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();

});

app.use('/', homePageRouter);

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.validation_error_msg = req.flash('validation_error_msg');
    res.locals.error = req.flash('error');
    next();

});

app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome({name: 'Dashboard', url: '/'}));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use((req, res, next) =>
{
    next(createError(404));
});

/**
 * Error handler
 */

app.use((err, req, res, next) =>
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    
});
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
})

export default app;
