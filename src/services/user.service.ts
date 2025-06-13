import { IRegisterUser } from "../interfaces/user.interface";
import {UserModel} from "../db/models"

class UserService {
  constructor() {}
    async getUserByEmail(email:string) {
     const user = await UserModel.findOne({
        email: email
      });
     return user;
    }
    async getUserById(id:string) {
      const user = await UserModel.findOne({
          _id: id
      });
    }
    async createNewUser(userData: IRegisterUser){
      await UserModel.create(userData)
    }
}

const userService = new UserService()
export default userService