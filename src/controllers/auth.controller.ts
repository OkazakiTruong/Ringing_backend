import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.util';
import { IRegisterUser } from '../interfaces/user.interface';
import userService from '../services/user.service';
import AppError from '../utils/appError.util';
import STATUS_CODE from '../consts/status.const';
import RETURN_MESSAGE from '../consts/return.message.const';

class AuthController {
  async login() {}
  register = asyncHandler(async (req: Request, res: Response, next:NextFunction)=>{
    console.log(req.body)
    const registerData: IRegisterUser = req.body;

    const foundUser = await userService.getUserByEmail(registerData.email);
    if(foundUser){
      return next(new AppError(RETURN_MESSAGE.AUTH.EMAIL_CONFLICT,STATUS_CODE.CONFLICT))
    }
    await userService.createNewUser(registerData)
    return res.status(STATUS_CODE.CREATED).json({message: RETURN_MESSAGE.AUTH.REGISTER_SUCCESS});
  })
}

const authController = new AuthController();
export default authController;
