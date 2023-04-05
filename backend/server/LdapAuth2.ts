import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import ldap, { SearchOptions } from 'ldapjs';
import session from 'express-session';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
  session: session.Session & { user?: any };
}


const app = express();

let isAuthenticated = false;

app.use(cors());
app.use(express.json());

const client = ldap.createClient({
  url: 'ldap://192.168.100.36:389',
});

client.on('error', (err) => {
  console.error('LDAP connection failed:', err);
});


const authenticate = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    const searchOptions: SearchOptions = {
      filter: '(objectclass=*)',
      scope: 'sub',
    };
    
    client.search('dc=test,dc=com', searchOptions, (err, res) => {
      if (err) {
        return reject(err);
      }

      let user: any;

      res.on('searchEntry', (entry) => {
        user = entry.object;
      });

      res.on('error', (err) => {
        reject(err);
      });

      res.on('end', (result) => {
        if (!user) {
          reject(new Error(`User ${username} not found`));
        } else {
          client.bind(user.dn, password, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          });
        }
      });
    });
  });
};

// Add LDAP authentication middleware to '/login' route
app.post('/login', (req: AuthenticatedRequest, res) => {
  try {
    const { username, password } = req.body;

    const user = await authenticate(username, password);

    req.user = user;
    req.session.user = user;
    isAuthenticated = true;

    res.send('Login successful');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Add protected route that requires authentication
app.get('/dashboard', (req: Request, res: Response) => {
  if (isAuthenticated) {
    res.send('Welcome to the dashboard');
  } else {
    res.redirect('/login');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
