"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ldap = require("ldapjs");
var cors = require("cors");
require('dotenv').config();
var app = express();
app.use(cors());
app.use(express.json());
var createNewClient = function () {
    var client = ldap.createClient({
        url: 'ldap://localhost:389',
    });
    return client;
};
app.post('/auth', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    console.log("".concat(username, " is trying to login with ").concat(password, " as a pwd"));
    var client = createNewClient();
    var bindDN = "uid=".concat(username, ",ou=People,dc=test,dc=com");
    client.bind(bindDN, password, function (err) {
        if (err) {
            console.error(err);
            res.status(401).send('Authentication failed');
            return;
        }
        var searchOptions = {
            scope: 'sub',
            filter: "(&(uid=".concat(username, ")(objectClass=posixAccount))"),
            attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail', 'jpegPhoto', 'telephoneNumber'],
        };
        client.search("uid=".concat(username, ",ou=People,dc=test,dc=com"), searchOptions, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving user info');
                return;
            }
            var userAttributes = [];
            result.on('searchEntry', function (entry) {
                var user = {};
                entry.attributes.forEach(function (attribute) {
                    var key = attribute.type;
                    var value = attribute.vals;
                    user[key] = value;
                });
                userAttributes.push(user);
            });
            result.on('end', function () {
                console.log("authentication successfull");
                var userData = userAttributes[0];
                var payload = {
                    user: {
                        role: userData.description,
                        name: userData.cn,
                        email: userData.mail,
                        phoneNumber: userData.telephoneNumber,
                        groupId: userData.gidNumber,
                        imagePath: userData.jpegPhoto,
                    },
                };
                console.log("payload", payload);
                res.status(200).send({
                    message: 'Authentication successful',
                    user: userAttributes[0],
                    groups: userAttributes[0].memberOf, // get groups the user is a member of
                });
            });
        });
    });
});
// Start the server
var PORT = 5005;
app.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
