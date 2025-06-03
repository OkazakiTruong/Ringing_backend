import { Request, Response } from 'express';

class UserController {
  async getUserById(req: Request, res: Response): Promise<any> {
    return res.json({ message: 'User found' });
  }
}

const userController = new UserController();
export default userController;
