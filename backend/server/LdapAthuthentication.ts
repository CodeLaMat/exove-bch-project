const express = require('express');
const { Request, Response, NextFunction } = require('express');

import  * as dotenv from "dotenv";
const cors = require("cors");

const isAuthenticated = false;

dotenv.config();

const app = express();

const LDAPAuth = require('ldapauth-fork');

const ldap = new LDAPAuth({
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
}), (req, res) => {
  res.send('Login successful');
});

// Add protected route that requires authentication
app.get('/dashboard', (req, res) => {
  if (isAuthenticated) {
    res.send('Welcome to the dashboard');
  } else {
    res.redirect('/login');
  }
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});