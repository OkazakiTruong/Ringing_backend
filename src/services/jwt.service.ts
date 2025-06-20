import jwt from 'jsonwebtoken';
import { generateNewJwt, verifyJwt } from '../utils/jwt.util';
import config from '../config/config';

class JwtService {
  generateToken(
    data: any,
    option: jwt.SignOptions = { expiresIn: 60 * 15 },
  ): string {
    const token = generateNewJwt(data, config.jwtSecret, option);
    return token;
  }

  generateRefeshToken(
    data: any,
    option: jwt.SignOptions = { expiresIn: '15d' },
  ): string {
    const refeshToken = generateNewJwt(data, config.jwtRefreshSecret, option);
    return refeshToken;
  }

  verifyToken(token: string): any {
    const decoded = verifyJwt(token, config.jwtSecret);
    return decoded;
  }

  verifyRefeshToken(refreshToken: string): any {
    const decoded = verifyJwt(refreshToken, config.jwtRefreshSecret);
    return decoded;
  }
}

const jwtService = new JwtService();
export default jwtService;
