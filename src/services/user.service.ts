import { IRegisterUser, IUserData } from '../interfaces/user.interface';
import { UserModel } from '../db/models';

class UserService {
  constructor() {}
  async getUserByEmail(
    email: string,
    select: string = '',
  ): Promise<IUserData | null> {
    const user: IUserData | null = await UserModel.findOne({
      email: email,
    }).select(select);
    return user;
  }

  async getUserById(id: string) {
    const user = await UserModel.findOne({
      _id: id,
    });
  }
  async createNewUser(userData: IRegisterUser) {
    await UserModel.create(userData);
  }
}

const userService = new UserService();
export default userService;
