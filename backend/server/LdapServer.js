"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var ldap = require("ldapjs");
var app = express();
var createNewClient = function () {
    var client = ldap.createClient({
        url: 'ldap://localhost:389',
    });
    return client;
};
app.get('/auth', function (req, res) {
    var _a = req.query, username = _a.username, password = _a.password;
    var client = createNewClient();
    var bindDN = "uid=".concat(username, ",ou=People,dc=test,dc=com");
    client.bind(bindDN, password, function (err) {
        if (err) {
            console.error(err);
            res.status(401).send('Authentication failed');
            return;
        }
        console.log("authenication passed");
        var searchOptions = {
            scope: 'sub',
            filter: "(uid=".concat(username, ")"),
            attributes: ['cn'],
        };
        client.search("uid=".concat(username, ",ou=People,dc=test,dc=com"), searchOptions, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving user info');
                return;
            }
            var userAttributes = [];
            result.on('searchEntry', function (entry) {
                userAttributes.push(entry.object);
            });
            console.log("searchEntry entered");
            console.log("userAttributes", userAttributes[0]);
            result.on('end', function () {
                res.status(200).send({
                    message: 'Authentication successful',
                    user: userAttributes[0],
                });
            });
            console.log("userAttributes", userAttributes[0]);
        });
    });
});
// Start the server
var PORT = 5000;
app.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
