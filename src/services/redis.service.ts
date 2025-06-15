import redisClient from "../config/redis";
import { IRegisterUser } from "../interfaces/user.interface";
import { generateOTP } from "../utils/crypto.util";

class RedisService {
    async createRegisterSection (registerData: IRegisterUser) {
        const code = generateOTP();
        const birthDate = new Date(registerData.birthDay); 
        await redisClient.hSet(`register-section:${registerData.email}`, {
            name: registerData.name,
            email: registerData.email,
            birthDay: birthDate.toISOString(),
            phone: registerData.phone,
            password: registerData.password,
            code: code.toString(),
        })
        await redisClient.expire(`register-section:${registerData.email}`,600)
    }
}

const redisService = new RedisService()
export default redisService