"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var createToken = function (payload) {
    var jwtse = 'WnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/';
    console.log("jwt: ", jwtse);
    console.log("jwt2: ", process.env.JWT_SECRET);
    return new Promise(function (resolve, reject) {
        jwt.sign(payload, jwtse, { expiresIn: 3600 }, function (err, token) {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.default = createToken;
