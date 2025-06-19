import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.util';
import { IRegisterUser } from '../interfaces/user.interface';
import userService from '../services/user.service';
import AppError from '../utils/appError.util';
import { STATUS_CODE } from '../consts/status.const';
import RETURN_MESSAGE from '../consts/return.message.const';
import emailSerivce from '../services/googleMail.service';
import { IMailOption } from '../interfaces/mail.interface';
import { getCodeRegisterEmailHtml } from '../assets/emailHtml/emailHtmlForm';
import config from '../config/config';
import { generateOTP } from '../utils/crypto.util';
import redisService from '../services/redis.service';
import { hashAPassword } from '../utils/bycript.util';

class AuthController {
  async login() {}
  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const registerData: IRegisterUser = req.body;

      //check user exist
      const foundUser = await userService.getUserByEmail(registerData.email);
      if (foundUser) {
        return next(
          new AppError(
            RETURN_MESSAGE.AUTH.EMAIL_CONFLICT,
            STATUS_CODE.CONFLICT,
          ),
        );
      }

      // gen otp code
      const code = generateOTP();

      const emailOption: IMailOption = {
        from: config.emailUser,
        to: registerData.email,
        subject: 'Ringing Register Code!',
        html: getCodeRegisterEmailHtml(code, registerData.name),
      };

      //set data for redis cache data
      const redisDataKey = `register-section-${code}`;
      const hashPassword = hashAPassword(registerData.password);

      const redisData = {
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        birthDay: registerData.birthDay,
        password: hashPassword,
      };

      await redisService.setData(redisDataKey, redisData, 60 * 5);
      await emailSerivce.sendMail(emailOption);
      return res
        .status(STATUS_CODE.OK)
        .json({ message: RETURN_MESSAGE.COMMON.SUCCESS });
    },
  );
  verifyCode = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { code } = req.body;
      const redisDataKey = `register-section-${code}`;
      const redisData = await redisService.getData(redisDataKey);
      if (Object.keys(redisData).length === 0) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: RETURN_MESSAGE.AUTH.VERIFY_CODE_FAIL });
      }
      const registerData: IRegisterUser = {
        name: redisData.name,
        email: redisData.email,
        phone: redisData.phone,
        birthDay: new Date(redisData.birthDay),
        password: redisData.password,
      };
      await userService.createNewUser(registerData);
      return res
        .status(STATUS_CODE.OK)
        .json({ message: RETURN_MESSAGE.AUTH.REGISTER_SUCCESS });
    },
  );
}

const authController = new AuthController();
export default authController;
