
import * as ldap from 'ldapjs';
import * as dotenv from 'dotenv';


dotenv.config();

const express = require('express');
const { Request, Response, NextFunction } = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const serverUrl = 'ldap://192.168.100.36:389';
const adminDn = 'cn=admin,dc=test,dc=com';
const adminPassword = process.env.BIND_CREDENTIALS;
const searchBase = 'dc=test,dc=com';
const searchFilter = '(uid=john)';

const client = ldap.createClient({
  url: serverUrl,
});

console.log("adminpass: ", adminPassword );

const bindClient = (client: ldap.Client, adminDn: string, adminPassword: string) => {
  return new Promise<void>((resolve, reject) => {
    client.bind(adminDn, adminPassword, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const search = (client: ldap.Client, searchBase: string, searchFilter: string) => {
  return new Promise<ldap.SearchCallbackResponse>((resolve, reject) => {
    client.search(searchBase, {
      scope: 'sub',
      filter: searchFilter,
    }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        res.on('searchEntry', (entry) => {
            return new Promise((resolve) => {
              resolve(entry);
            });
          });
        res.on('error', (err) => {
          reject(err);
        });
      }
    });
  });
};

(async () => {
  try {
    if (typeof adminPassword === "undefined") {
        throw new Error("Admin password is not defined");
      }
    await bindClient(client, adminDn, adminPassword);
    const result = await search(client, searchBase, searchFilter);
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.unbind();
  }
})();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
