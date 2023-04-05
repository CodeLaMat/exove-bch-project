const express = require('express');
const app = express();

const ldap = require('ldapjs');


const createNewClient = () => {

  const client = ldap.createClient({
    url: 'ldap://192.168.100.36:389',
  });

  return client
}

app.get('/auth', (req, res) => {
    const { username, password } = req.query;
  
    const client = createNewClient();
  
    const bindDN = `uid=${username},ou=People,dc=test,dc=com`;
  
    client.bind(bindDN, password, (err) => {
      if (err) {
        console.error(err);
        res.status(401).send('Authentication failed');
        return;
      }
  
      res.status(200).send('Authentication successful');
    });
  });
  

app.get('/users', (req, res) => {

    const client =createNewClient();
    
      client.search('ou=People,dc=test,dc=com', {
          filter: '(objectClass=person)',
          scope: 'sub',
      }, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error searching for users');
          return;
        }
    
        const users = [];
    
        result.on('searchEntry', (entry) => {
          // Add the user object to the list of users
          users.push(entry.object);
        });
    
        result.on('error', (err) => {
          console.error(err);
          res.json(users);
          // res.status(500).send('Error searching for users');
        });
    
        result.on('end', () => {
          // Return the list of users
          res.json(users);
          client.unbind();
        });
      });
  
  });
  
    

  app.get('/groups/:groupName/users', (req, res) => {
    const groupName = req.params.groupName;
  
    const client = createNewClient();
  
    // Search for all users in the group
    client.search(`ou=Groups,dc=test,dc=com`, {
      filter: `(&(objectClass=groupOfNames)(cn=${groupName}))`,
      scope: 'sub',
    }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error searching for group');
        return;
      }
  
      const users = [];
  
      result.on('searchEntry', (entry) => {
        // Get the members of the group
        const memberDns = entry.object.member || [];
  
        // Get the user details for each member
        memberDns.forEach((memberDn) => {
          client.search(memberDn, {
            scope: 'base',
            attributes: ['uid', 'givenName', 'sn'],
          }, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error searching for user');
              return;
            }
  
            result.on('searchEntry', (entry) => {
              users.push(entry.object);
            });
  
            result.on('error', (err) => {
              console.error(err);
              res.status(500).send('Error getting user details');
            });
  
            result.on('end', () => {
              if (users.length === memberDns.length) {
                // Return the list of users in the group
                res.json(users);
              }
            });
          });
        });
      });
  
      result.on('error', (err) => {
        console.error(err);
        res.status(500).send('Error searching for group');
      });
  
      result.on('end', () => {
        if (users.length === 0) {
          // Return an empty list if the group has no members
          res.json(users);
        }
      });
    });
  });
    
    // Start the server
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
    

