import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.util';
import { IRegisterUser } from '../interfaces/user.interface';
import userService from '../services/user.service';
import AppError from '../utils/appError.util';
import {STATUS_CODE} from '../consts/status.const';
import RETURN_MESSAGE from '../consts/return.message.const';
import emailSerivce from '../services/googleMail.service';
import { IMailOption } from '../interfaces/mail.interface';
import { getCodeRegisterEmailHtml } from '../assets/emailHtml/emailHtmlForm';
import config from '../config/config';
import redisService from '../services/redis.service';

class AuthController {
  async login() {
  }
  register = asyncHandler(async (req: Request, res: Response, next:NextFunction)=>{
    const registerData: IRegisterUser = req.body;

    // const foundUser = await userService.getUserByEmail(registerData.email);
    // if(foundUser){
    //   return next(new AppError(RETURN_MESSAGE.AUTH.EMAIL_CONFLICT,STATUS_CODE.CONFLICT))
    // }
    // await userService.createNewUser(registerData)
    // return res.status(STATUS_CODE.CREATED).json({message: RETURN_MESSAGE.AUTH.REGISTER_SUCCESS});
    const emailOption: IMailOption = {
      from: config.emailUser,
      to: "buiquangtruong1105@gmail.com",
      subject: "Ringing Register Code 😱",
      html: getCodeRegisterEmailHtml('12345',registerData.name)
    }

    await emailSerivce.sendMail(emailOption)
    await redisService.createRegisterSection(registerData);
    return res.status(STATUS_CODE.OK).json({message: RETURN_MESSAGE.COMMON.SUCCESS})
  })
  verifyCode = asyncHandler(async(req: Request, res: Response, next:NextFunction)=>{
    return res.status(STATUS_CODE.OK).json({message: RETURN_MESSAGE.AUTH.REGISTER_SUCCESS});
  })
}

const authController = new AuthController();
export default authController;

