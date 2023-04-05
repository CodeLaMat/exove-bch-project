"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var _a = require('express'), Request = _a.Request, Response = _a.Response, NextFunction = _a.NextFunction;
var dotenv = require("dotenv");
var cors = require("cors");
var isAuthenticated = false;
dotenv.config();
var app = express();
var LDAPAuth = require('ldapauth-fork');
var ldap = new LDAPAuth({
    url: 'ldap://192.168.100.36:389',
    bindDN: 'cn=admin,dc=test,dc=com',
    bindCredentials: process.env.BIND_CREDENTIALS,
    searchBase: 'dc=test,dc=com',
    searchFilter: '(uid={{username}})'
});
app.use(cors());
// Add LDAP authentication middleware to '/login' route
app.post('/login', ldap.auth({
    usernameField: 'username',
    passwordField: 'password',
    sessionName: 'myapp_session',
    sessionSecret: 'myapp_secret',
    failureRedirect: '/login'
}), function (req, res) {
    res.send('Login successful');
});
// Add protected route that requires authentication
app.get('/dashboard', function (req, res) {
    if (isAuthenticated) {
        res.send('Welcome to the dashboard');
    }
    else {
        res.redirect('/login');
    }
});
var port = process.env.PORT || 5050;
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
