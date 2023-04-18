"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var ldap = require("ldapjs");
var cors = require("cors");
var createToken_1 = require("../src/middleware/createToken");
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
var generateToken = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("userData", userData);
                payload = {
                    user: {
                        role: userData.description,
                        name: userData.cn,
                        email: userData.mail,
                    }
                };
                console.log("payload: ", payload);
                return [4 /*yield*/, (0, createToken_1.default)({ payload: payload })];
            case 1:
                token = _a.sent();
                return [2 /*return*/, token];
        }
    });
}); };
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
            attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail',],
        };
        // modify the search DN to search for the specific user
        var searchDN = "uid=jason,ou=People,dc=test,dc=com";
        client.search(searchDN, searchOptions, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving user info');
                return;
            }
            var userAttributes = [];
            result.on('searchEntry', function (entry) {
                userAttributes.push(entry.object);
            });
            result.on('end', function () {
                console.log("authentication successful");
                console.log("userAttributes", userAttributes);
                var userData = userAttributes[0];
                var userToken = generateToken(userData).then(function (token) {
                    res.status(200).send({
                        message: 'Authentication successful',
                        user: userAttributes[0],
                        groups: userAttributes[0].memberOf,
                        token: token,
                    });
                })
                    .catch(function (error) {
                    console.log(error);
                });
                ;
            });
        });
    });
});
// Start the server
var PORT = 5000;
app.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
