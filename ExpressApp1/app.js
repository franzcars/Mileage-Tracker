'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AmazonStrategy = require('passport-amazon').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var get = require('./routes/get');
var put = require('./routes/put');



var AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
var AWS_REGION = process.env.AWS_REGION;
var COGNITO_IDENTITY_POOL_ID = process.env.COGNITO_IDENTITY_POOL_ID;
var IAM_ROLE_ARN = process.env.IAM_ROLE_ARN;
var COGNITO_DATASET_NAME = process.env.COGNITO_DATASET_NAME;
var COGNITO_KEY_NAME = process.env.COGNITO_KEY_NAME;
var CALLBACKURL = process.env.CALLBACKURL;
var AMAZON_CLIENT_ID = 'AKIAIY6IW2QCA2WYF6UQ';
var AMAZON_CLIENT_SECRET = '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';


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/get', get);
app.use('/put', put);

passport.use(new AmazonStrategy({
    clientID: AMAZON_CLIENT_ID,
    clientSecret: AMAZON_CLIENT_SECRET,
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        profile.token = accessToken;
        var user = profile;
        done(null, user);
    });
    }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/amazon',
    passport.authenticate('amazon', {
        scope: ['profile']
    }),
    function (req, res) {
        // The request will be redirected to Amazon for authentication, so this
        // function will not be called.
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
