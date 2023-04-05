const express = require('express');
import * as ldap from 'ldapjs';
import { SearchEntryObject, SearchOptions } from 'ldapjs';

const app = express();

const createNewClient = () => {
  const client = ldap.createClient({
    url: 'ldap://192.168.100.36:389',
  });

  return client;
};

app.get('/auth', (req, res) => {
  const { username, password } = req.query as { username: string, password: string };

  const client = createNewClient();

  const bindDN = `uid=${username},ou=People,dc=test,dc=com`;

  client.bind(bindDN, password, (err: Error | null) => {
    if (err) {
      console.error(err);
      res.status(401).send('Authentication failed');
      return;
    }

    const searchOptions: SearchOptions = {
      scope: 'sub',
      filter: `(uid=${username})`,
      attributes: ['cn', 'mail', 'telephoneNumber'],
    };

    client.search('ou=People,dc=test,dc=com', searchOptions, (err: Error | null, result: ldap.SearchCallbackResponse) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving user info');
        return;
      }

      const userAttributes: SearchEntryObject[] = [];

      result.on('searchEntry', (entry) => {
        userAttributes.push(entry.object);
      });

      result.on('end', () => {
        res.status(200).send({
          message: 'Authentication successful',
          user: userAttributes[0],
        });
      });
    });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
