import jwt from 'jsonwebtoken';
import env from '../config/env';

export const generateJwt = (payload = {}) => {
  return jwt.sign(payload, env.tokenSecret, { expiresIn: 3600 });
};

export default generateJwt;