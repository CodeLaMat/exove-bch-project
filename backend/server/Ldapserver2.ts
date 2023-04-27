import { Express } from 'express';
import * as express from 'express';
import * as ldap from 'ldapjs';
import * as cors from 'cors';
import { SearchEntryObject, SearchOptions} from 'ldapjs';

require('dotenv').config();

const app: Express = express();
app.use(cors());
app.use(express.json());

interface LoginRequest {
  username: string;
  password: string;
}

interface LdapUser {
    role: string;
    name: string;
    email: string;
    phoneNumber: string;
    groupId: string;
    imagePath: string;
  }

const createNewClient = () => {
  const client = ldap.createClient({
    url: 'ldap://localhost:389',
  });

  return client;
};

app.post('/auth', (req: express.Request<{}, {}, LoginRequest>, res) => {
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
        attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail', 'jpegPhoto', 'telephoneNumber' ],
      };

      client.search(`uid=${username},ou=People,dc=test,dc=com`, searchOptions, (err: Error | null, result: ldap.SearchCallbackResponse) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving user info');
          return;
        }
    
        const userAttributes: SearchEntryObject[] = [];
    
        result.on('searchEntry', (entry) => {
          const user: Record<string, any> = {};
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
    
          const payload = { 
            user: { 
              role: userData.description,
              name: userData.cn,
              email: userData.mail,
              phoneNumber: userData.telephoneNumber,
              groupId: userData.gidNumber,
              imagePath: userData.jpegPhoto,
            } as LdapUser,
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
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});