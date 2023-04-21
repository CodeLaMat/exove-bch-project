const express = require('express');
import * as ldap from 'ldapjs';
import * as cors from 'cors';
import { SearchEntryObject, SearchOptions } from 'ldapjs';
import createToken from '../src/middleware/createToken'

require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());


const createNewClient = () => {
  const client = ldap.createClient({
    url: 'ldap://localhost:389',
  });

  return client;
};

const ldapClient = ldap.createClient({
  url: 'ldap://localhost:389', // Replace with your LDAP server URL
});


const generateToken = async (userData) => {
  console.log("userData", userData);
  const payload = { 
    user: { 
      role: userData.description,
      name: userData.cn,
      email: userData.mail,
    } 
  };
  console.log("payload: ", payload);
  const token = await createToken({payload});
  return token;
}
// Middleware to authenticate with LDAP server
const authenticate = (req, res, next) => {
  ldapClient.bind('cn=admin,dc=test,dc=com', 'myadminpassword', (err) => {
    if (err) {
      res.status(500).send('Error authenticating with LDAP server');
      return;
    }
    next();
  });
};

app.get('/users', authenticate, (req, res) => {
  const options: SearchOptions = {
    scope: 'sub',
    filter: '(objectClass=inetOrgPerson)',
    attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail', ],
  };
 


  ldapClient.search('ou=People,dc=test,dc=com', options, (err, result) => {
    if (err) {
      res.status(500).send('Error searching LDAP server');
      return;
    }

    const users: SearchEntryObject[] = [];

    result.on('searchEntry', (entry) => {
      const user = {};
      entry.attributes.forEach((attribute) => {
        const key = attribute.type;
        const value = attribute.vals;
        user[key] = value;
      });
      users.push(user as SearchEntryObject);
    });
    result.on('end', () => {
      res.send(users);
    });
  });
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body as { username: string, password: string };
 console.log(`${username} is trying to login with ${password} as a pwd`);
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
      filter: `(&(uid=${username})(objectClass=posixAccount))`, // add objectClass filter
      attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail', ],
    };

    client.search(`uid=${username},ou=People,dc=test,dc=com`, searchOptions, (err: Error | null, result: ldap.SearchCallbackResponse) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving user info');
        return;
      }

      const userAttributes: SearchEntryObject[] = [];

      // result.on('searchEntry', (entry) => {
      //   userAttributes.push(entry.object);
      // });

      result.on('searchEntry', (entry) => {
        const user = {};
        entry.attributes.forEach((attribute) => {
          const key = attribute.type;
          const value = attribute.vals;
          user[key] = value;
        });
        userAttributes.push(user as SearchEntryObject);
      });

      result.on('end', () => {
        console.log("authentication successfull");
        const userData = userAttributes[0];
        const userToken = generateToken(userData).then(token => {
          res.status(200).send({
            message: 'Authentication successful',
            user: userAttributes[0],
            groups: userAttributes[0].memberOf, // get groups the user is a member of
            token: token,
          });
        })
        .catch(error => {
          console.log(error);
        });;
      });
    });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});