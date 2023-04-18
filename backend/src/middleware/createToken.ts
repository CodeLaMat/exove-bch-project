import * as jwt from 'jsonwebtoken';

interface Payload {
  [key: string]: any;
}
const createToken = (payload: Payload): Promise<string> => {
    
    const jwtse = 'WnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/';
    console.log("jwt: ", jwtse);
    console.log("jwt2: ", process.env.JWT_SECRET);

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtse!,
      { expiresIn: 3600 },
      (err: Error | null, token: string | undefined) => {
        if (err) reject(err);
        
        resolve(token!);
      }
    );
  });
};

export default createToken;