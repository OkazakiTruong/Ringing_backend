import { Request, Response } from 'express';

class AuthController {
  async login() {}
  async register(req: Request, res: Response): Promise<any> {
    console.log('request haha cc', req.body);
    return res.send('helloworld');
  }
}

const authController = new AuthController();
export default authController;
