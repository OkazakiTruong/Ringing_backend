import { IRegisterUser } from "../interfaces/user.interface";
import { createClient } from "redis";
import config from "../config/config";

class RedisService {
    redisClient:any
    constructor(){
        this.connectToServer()
    }
    async connectToServer(){
        this.redisClient = await createClient({
            username: config.redisUserName,
            password: config.redisPassword,
            socket: {
                host: config.redisEnpoint,
                port: config.redisPort
            }
        });
        
        this.redisClient.on('error', (err:any) => console.log('Redis Client Error', err))
    }

    async createRegisterSection (registerData: IRegisterUser, code: string) {
        const birthDate = new Date(registerData.birthDay); 
        await this.redisClient.hSet(`register-section:${code}`, {
            name: registerData.name,
            email: registerData.email,
            birthDay: birthDate.toISOString(),
            phone: registerData.phone,
            password: registerData.password,
        })
        await this.redisClient.expire(`register-section:${registerData.email}`,600)
        this.redisClient.destroy()
    }

    async getData (datakey: string) {
        const value = await this.redisClient.get(datakey);
        this.redisClient.destroy();
        return value;
    }
}

export default RedisService