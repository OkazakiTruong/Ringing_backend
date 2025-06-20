import jwt from 'jsonwebtoken';

export const generateNewJwt = (
  data: any,
  secret: string,
  options: jwt.SignOptions = { expiresIn: '1h' },
): string => {
  const token = jwt.sign(data, secret, options);
  return token;
};

export const verifyJwt = (jwtCode: string, secret: string) => {
  const decoded = jwt.verify(jwtCode, secret);
  return decoded;
};
